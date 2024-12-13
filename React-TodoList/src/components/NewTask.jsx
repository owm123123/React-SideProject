import React, { useState } from 'react';

export default function NewTask({ onAdd }) {
  const [taskData, setTaskData] = useState('');

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        onChange={(e) => setTaskData(e.target.value)}
        value={taskData}
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
      />
      <button
        onClick={() => onAdd(taskData)}
        className="text-stone-700 hover:text-stone-950"
      >
        Create
      </button>
    </div>
  );
}
