'use client';

import React, { useTransition } from 'react';
import { toggleTaskStatus, deleteTask } from '@/lib/actions';

interface TaskItemProps {
  id: string;
  title: string;
  completed: boolean;
}

/**
 * Composant représentant un élément de la liste de tâches.
 * Gère le basculement du statut et la suppression via des Server Actions.
 */
const TaskItem: React.FC<TaskItemProps> = ({ id, title, completed }) => {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      await toggleTaskStatus(id, !completed);
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteTask(id);
    });
  };

  return (
    <div className={`flex items-center justify-between p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${isPending ? 'opacity-50' : ''}`}>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={completed}
          onChange={handleToggle}
          disabled={isPending}
          className="w-5 h-5 cursor-pointer accent-blue-600 disabled:cursor-not-allowed"
        />
        <span className={`text-lg ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
          {title}
        </span>
      </div>
      <button
        onClick={handleDelete}
        disabled={isPending}
        className="text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded transition-colors disabled:text-red-300"
        title="Supprimer la tâche"
      >
        Supprimer
      </button>
    </div>
  );
};

export default TaskItem;
