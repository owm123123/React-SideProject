import React, { useRef } from 'react';
import Input from './Input';
import DiaLog from './DiaLog';

export default function NewProject({ onAdd }) {
  const title = useRef();
  const description = useRef();
  const dueDate = useRef();

  const dialog = useRef();

  // const project = {
  //   title: title.current.value,
  //   description: description.current.value,
  //   dueDate: dueDate.current.value,
  // };

  function handleAddProject() {
    const titleValue = title.current.value;
    const descriptionValue = description.current.value;
    const dueDateValue = dueDate.current.value;

    if (
      titleValue.trim() === '' ||
      descriptionValue.trim() === '' ||
      dueDateValue.trim() === ''
    ) {
      dialog.current.open();
      return;
    }

    onAdd({
      title: titleValue,
      description: descriptionValue,
      dueDate: dueDateValue,
    });
  }

  return (
    <>
      <DiaLog ref={dialog}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid input</h2>
        <p className="text-stone-600 mb-4">
          Oops... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid valiue for every input field.
        </p>
      </DiaLog>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button className="text-stone-800 hover:text-stone-950">
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleAddProject}
              className="px-6 py-2 rounded-md bg-stone-800 text-slate-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input type="text" ref={title} label="title" />
          <Input ref={description} label="description" isTextarea={true} />
          <Input type="date" ref={dueDate} label="due date" />
        </div>
      </div>
    </>
  );
}
