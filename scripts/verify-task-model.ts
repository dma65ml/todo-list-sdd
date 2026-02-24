import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('--- Vérification du modèle Task ---');

  // 1. Test création valide
  console.log('Test 1: Création d\'une tâche valide...');
  const task = await prisma.task.create({
    data: { title: 'Ma première tâche' },
  });
  console.log('✓ Tâche créée:', task.id, 'Statut:', task.completed);

  // 2. Test statut par défaut (doit être false)
  console.log('Test 2: Vérification du statut par défaut...');
  if (task.completed === false) {
    console.log('✓ Statut par défaut correct (false)');
  } else {
    throw new Error('✗ Statut par défaut incorrect');
  }

  // 3. Test horodatages
  console.log('Test 3: Vérification des horodatages...');
  if (task.createdAt && task.updatedAt) {
    console.log('✓ Horodatages présents');
  } else {
    throw new Error('✗ Horodatages manquants');
  }

  // 4. Test titre vide (validation applicative nécessaire car Prisma ne le fait pas par défaut)
  console.log('Test 4: Tentative de création avec titre vide (simulation validation)...');
  const validateTitle = (title: string) => {
    if (!title || title.trim().length === 0) throw new Error('Titre obligatoire et non vide');
    if (title.length > 200) throw new Error('Titre trop long (max 200)');
  };

  try {
    const invalidTitle = '   ';
    validateTitle(invalidTitle);
    await prisma.task.create({ data: { title: invalidTitle } });
    console.log('✗ Erreur: La création avec titre vide a réussi');
  } catch (e: any) {
    console.log('✓ Échec attendu pour titre vide:', e.message);
  }

  // 5. Test titre trop long
  console.log('Test 5: Tentative de création avec titre trop long...');
  try {
    const longTitle = 'a'.repeat(201);
    validateTitle(longTitle);
    await prisma.task.create({ data: { title: longTitle } });
    console.log('✗ Erreur: La création avec titre trop long a réussi');
  } catch (e: any) {
    console.log('✓ Échec attendu pour titre trop long:', e.message);
  }

  console.log('\n--- Toutes les vérifications sont terminées ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
