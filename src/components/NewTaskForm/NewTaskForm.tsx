'use client';

import { Date, NewTaskField } from './Constants';
import { TwButtonStyles, TwInputStyles, TwLabelStyles, TwNewTaskForm } from './TailwindStyles';
import { FormState, createTask } from '../../actions/task';
import { useFormState, useFormStatus } from 'react-dom';

const NewTaskForm = () => {
  const initialState: FormState = { error: '' };
  const [state, formAction] = useFormState(createTask, initialState);

  const SubmitButton = () => {
    const { pending } = useFormStatus();

    return (
      <button type='submit' className={TwButtonStyles} disabled={pending}>
        Create
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
                id={id}
                required={required}
                className={TwInputStyles}
                min={inputType === 'date' ? Date.min : ''}
                max={inputType === 'date' ? Date.max : ''}
              />
            </div>
          );
        })}
        <SubmitButton />
        {state.error && <p className='mt-2 text-red-500 text-sm'>{state.error}</p>}
      </form>
    </div>
  );
};

export default NewTaskForm;
