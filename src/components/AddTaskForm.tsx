'use client';

import React, { useState } from 'react';
import { addTask } from '@/lib/actions';

/**
 * Composant de formulaire pour l'ajout d'une tâche.
 * Gère l'état de saisie, les messages d'erreur et l'appel à l'action serveur.
 */
const AddTaskForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation basique côté client
    if (!title || title.trim().length === 0) {
      setError('Le titre ne peut pas être vide');
      return;
    }

    if (title.length > 200) {
      setError('Le titre ne doit pas dépasser 200 caractères');
      return;
    }

    setIsPending(true);
    const formData = new FormData();
    formData.append('title', title);

    const result = await addTask(formData);

    if (result?.error) {
      setError(result.error);
    } else {
      setTitle(''); // Vide le champ après succès
    }
    setIsPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ajouter une tâche..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
            disabled={isPending}
            maxLength={201}
          />
          <button
            type="submit"
            disabled={isPending}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300 transition-colors"
          >
            {isPending ? 'Ajout...' : 'Ajouter'}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    </form>
  );
};

export default AddTaskForm;
