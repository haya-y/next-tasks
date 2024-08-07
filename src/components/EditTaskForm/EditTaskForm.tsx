'use client';

import { NewTaskField, Date } from '../NewTaskForm/Constants';
import { TwNewTaskForm, TwLabelStyles, TwInputStyles, TwButtonStyles } from '../NewTaskForm/TailwindStyles';
import { TaskDocument } from '../../models/task';
import { ChangeEvent, useState } from 'react';
import { FormState, updateTask } from '@/actions/task';
import { useFormState, useFormStatus } from 'react-dom';

interface EditTaskFormProps {
  task: TaskDocument;
}

const EditTaskForm: React.FC<EditTaskFormProps> = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);
  const [isCompleted, setIsCompleted] = useState(task.isCompleted);

  const getState = (id: string) => {
    switch (id) {
      case 'title':
        return title;
      case 'description':
        return description;
      case 'dueDate':
        return dueDate;
      default:
        return '';
    }
  };

  const onChangeValue = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    switch (id) {
      case 'title':
        setTitle(e.target.value);
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'dueDate':
        setDueDate(e.target.value);
        break;
      default:
        break;
    }
  };

  const updateTaskWithId = updateTask.bind(null, task._id);
  const initialState: FormState = { error: '' };
  const [state, formAction] = useFormState(updateTaskWithId, initialState);
  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <button type='submit' className={`${TwButtonStyles} disabled: bg-gray-400`} disabled={pending}>
        Edit
      </button>
    );
  };
  return (
    <div className={TwNewTaskForm}>
      <form action={formAction}>
        {NewTaskField.map(({ id, inputType, labelContent, required }) => {
          return (
            <div key={id}>
              <label htmlFor={id} className={TwLabelStyles}>
                {labelContent}
              </label>
              <input
                type={inputType}
                name={id}
                value={getState(id)}
                onChange={(e) => onChangeValue(e, id)}
                id={id}
                required={required}
                className={TwInputStyles}
                min={inputType === 'date' ? Date.min : ''}
                max={inputType === 'date' ? Date.max : ''}
              />
            </div>
          );
        })}
        <div className='mt-6 flex items-center'>
          <input
            type='checkbox'
            name='isCompleted'
            id='isCompleted'
            className='mr-2 w-4 h-4'
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
          />
          <label htmlFor='isCompleted' className='text-sm'>
            タスクを完了する
          </label>
        </div>
        <SubmitButton />
        {state.error !== '' && <p className='mt-2 text-red-500 text-sm'>{state.error}</p>}
      </form>
    </div>
  );
};

export default EditTaskForm;
