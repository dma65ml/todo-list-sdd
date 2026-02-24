import React from 'react';

interface TaskItemProps {
  title: string;
  completed: boolean;
}

/**
 * Composant représentant un élément de la liste de tâches.
 */
const TaskItem: React.FC<TaskItemProps> = ({ title, completed }) => {
  return (
    <div className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <input
        type="checkbox"
        checked={completed}
        readOnly
        className="w-5 h-5 cursor-default accent-blue-600"
      />
      <span className={`text-lg ${completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
        {title}
      </span>
    </div>
  );
};

export default TaskItem;
