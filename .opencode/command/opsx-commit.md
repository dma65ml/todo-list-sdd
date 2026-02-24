---
description: Finalizes a feature by archiving the OpenSpec change, packing the repo with repomix, and committing the changes.
---

# /opsx-commit

Finalizes a feature by automatically chaining:
1. Archiving the OpenSpec change (via the logic of `/opsx-archive`)
2. Running `repomix` to prepare the repository context
3. Git commit with a standardized message

**Input**: Optionally specify a change name after `/opsx-commit` (e.g., `/opsx-commit add-auth`). If omitted, the conversation context is analyzed to infer it. In case of ambiguity, the agent prompts the user to choose from active changes.

---

## Detailed Steps

1. **Determine the change name**

   If no name is provided:
   - Run `openspec list --json` to get the list of active (non‑archived) changes.
   - Use the **AskUserQuestion** tool to let the user select the change to finalize.
   - For each change, display its name and the schema used (if available).

   **Rule**: Never guess or auto‑select a change. Always let the user choose.

2. **Pre-flight checks**

   Before starting the chain, verify that the required tools are available:

   - Check that `repomix` is installed and accessible in `$PATH`:
     ```bash
     repomix --version
     ```
     If the command is not found, stop immediately and display:
     ```
     ✗ repomix not found. Install it with: npm install -g repomix
     ```

   - Check that the current directory is a Git repository:
     ```bash
     git rev-parse --is-inside-work-tree
     ```
     If it fails, stop immediately and display:
     ```
     ✗ Not a Git repository. Run git init or navigate to an existing repo.
     ```

3. **Archive the change (logic of `/opsx-archive`)**

   Apply the complete procedure of the `/opsx-archive` command for the selected change. This includes:

   **Check artifact completion status**
   - Run `openspec status --change "<name>" --json`
   - Parse the JSON to extract `schemaName` and the status of `artifacts`.
   - If any artifacts are not marked `done`:
     - Display a warning listing the incomplete artifacts.
     - Ask the user for confirmation to continue.
     - Proceed only after explicit confirmation.

   **Check incomplete tasks**
   - Read the change's tasks file at `openspec/changes/<name>/tasks.md`.
   - Count incomplete tasks (`- [ ]`) vs. complete tasks (`- [x]`).
   - If incomplete tasks exist:
     - Display a warning with the number of remaining tasks.
     - Ask for confirmation to archive anyway.
   - If the `tasks.md` file does not exist, skip this step without warning.

   **Assess delta spec sync state**

   Check for delta specs at `openspec/changes/<name>/specs/`. If none exist, proceed directly to archiving without a sync prompt.

   If delta specs exist, always run the sync assessment and show a combined summary before prompting:
   - Compare each delta spec with its corresponding main spec at `openspec/specs/<capability>/spec.md`.
   - Produce a combined summary of the changes (additions, modifications, deletions, renames).
   - Then prompt the user:

     **If changes are needed:**
     - "Sync now (recommended)"
     - "Archive without syncing"

     **If specs are already in sync:**
     - "Archive now"
     - "Sync anyway"
     - "Cancel"

   If the user chooses to sync, execute the logic of `/opsx-sync` to apply the deltas to the main specs. Proceed to archive regardless of the choice made.

   **Perform the archive move**
   - Create the archive directory if it doesn't exist:
     ```bash
     mkdir -p openspec/changes/archive
     ```
   - Generate the target name using the current date: `YYYY-MM-DD-<change-name>`
   - Check if the target already exists:
     - If yes: fail with the **Archive Exists** error output (see below).
     - If no: move the change directory to the archive:
       ```bash
       mv openspec/changes/<name> openspec/changes/archive/YYYY-MM-DD-<name>
       ```
   - The `.openspec.yaml` file is automatically moved with the directory.

4. **Run Repomix**

   Once archiving is complete, execute `repomix` to produce a packaged context of the repository.

   **Default command:**
   ```bash
   repomix
   ```
   This generates `repomix-output.xml` in the project root using the project's `repomix.config.json` if present, or sensible defaults otherwise.

   **Customization via environment variable:**
   If `REPOMIX_OPTIONS` is defined, append its value to the command:
   ```bash
   repomix $REPOMIX_OPTIONS
   ```
   Example: `REPOMIX_OPTIONS="--style markdown -o repomix-output.md"`

   Common options for reference:
   | Option | Effect |
   |--------|--------|
   | `-o <file>` | Custom output file path |
   | `--style xml\|markdown\|plain` | Output format (default: `xml`) |
   | `--compress` | Reduce output size |
   | `--include "src/**/*.ts"` | Restrict included files |
   | `--quiet` | Suppress console output except errors |

   **On failure:** Display the error output and stop the process. The archive has already been performed and will not be rolled back — see the note in Guardrails. The user must resolve the issue and re-run `/opsx-commit` (the archive step will report a "target already exists" error confirming the archive is intact).

5. **Git Commit**

   Add all changes — including those generated by Repomix and the archived files — and create a commit with a standardized message:

   ```bash
   git add .
   git commit -m "feat: <change-name>"
   ```

   - If a remote is configured, optionally offer to push immediately (with user confirmation).
   - If `git commit` reports nothing to commit, treat it as a partial success: note it in the summary but do not consider the command failed.

6. **Display summary**

---

## Output Templates

**On Success**
```
## /opsx-commit completed successfully

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** ✓ Synced to main specs

**Repomix:** ✓ Ran successfully (repomix-output.xml)
**Commit:** ✓ Created (feat: <change-name>)

All artifacts complete. All tasks complete.
```

**On Success — No Delta Specs**
```
## /opsx-commit completed successfully

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** No delta specs

**Repomix:** ✓ Ran successfully (repomix-output.xml)
**Commit:** ✓ Created (feat: <change-name>)

All artifacts complete. All tasks complete.
```

**On Success with Warnings**
```
## /opsx-commit completed (with warnings)

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** Sync skipped (user chose to skip)

**Repomix:** ✓ Ran successfully (repomix-output.xml)
**Commit:** ✓ Created (feat: <change-name>)

**Warnings:**
- Archived with 2 incomplete artifacts
- Archived with 3 incomplete tasks
- Delta spec sync was skipped

Review the archive if this was not intentional.
```

**On Partial Success — Nothing to Commit**
```
## /opsx-commit completed (partial)

**Change:** <change-name>
**Schema:** <schema-name>
**Archived to:** openspec/changes/archive/YYYY-MM-DD-<name>/
**Specs:** ✓ Synced to main specs

**Repomix:** ✓ Ran successfully (repomix-output.xml)
**Commit:** ⚠ Skipped — nothing to commit

The archive and repomix steps completed successfully.
The working tree had no staged changes to commit.
```

**On Error — Archive Already Exists**
```
## /opsx-commit failed

**Change:** <change-name>
**Problem:** Target archive directory already exists:
openspec/changes/archive/YYYY-MM-DD-<name>/

**Options:**
1. Rename the existing archive manually
2. Delete the existing archive if it's obsolete
3. Wait until a different date to run the command
```

---

## Guardrails

- **Always prompt for change selection** if the name is not provided or cannot be reliably inferred from context. Never auto-select.
- **Run pre-flight checks first.** Verify that `repomix` is in `$PATH` and that the current directory is a Git repository before starting the archive step.
- **Never block archiving on warnings.** Incomplete artifacts, incomplete tasks, and unsynced delta specs are warnings that require user confirmation — not blockers.
- **Always run the sync assessment when delta specs exist**, and show the combined summary before prompting the user. Do not skip this step even if specs appear to already be in sync.
- **Preserve `.openspec.yaml`** when moving the change directory — it moves with the directory automatically.
- **Do not roll back a completed archive.** If Repomix or Git fails after a successful archive, the archive is not reversed. Report the state clearly, identify which step failed, and let the user re-run `/opsx-commit` (the archive step will detect the existing target and surface the appropriate error).
- **Use the `/opsx-sync` approach for delta spec sync** — apply changes to main specs and update the files in place.
- **Display a clear summary** of every step, including any warnings, skipped steps, and partial successes.
