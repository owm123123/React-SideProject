import React from 'react';
import NewTask from './NewTask';

export default function Tasks({ onAdd, onDelete, tasks }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-stone-700 mb-4">Tasks</h2>
      <NewTask onAdd={onAdd} />
      <p className="text-stone-800 mb-4">
        This project does not have any tasks yet.
      </p>
      <ul className="flex flex-col gap-4">
        {tasks.map((task) => (
          <li key={task.id} className="flex justify-between">
            <p className="text-stone-900">{task.taskData}</p>
            <button onClick={() => onDelete(task.id)} className="text-red-600">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
