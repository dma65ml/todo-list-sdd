import React from 'react';
import TaskItem from './TaskItem';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskListProps {
  tasks: Task[];
}

/**
 * Composant affichant une liste de tâches ou un message si la liste est vide.
 */
const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 text-lg italic">Aucune tâche pour le moment</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
      {tasks.map((task) => (
        <TaskItem key={task.id} title={task.title} completed={task.completed} />
      ))}
    </div>
  );
};

export default TaskList;
