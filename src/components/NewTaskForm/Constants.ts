export const NewTaskField = [
  { id: 'title', inputType: 'type', labelContent: 'タイトル', required: false },
  { id: 'description', inputType: 'type', labelContent: '説明', required: false },
  { id: 'dueDate', inputType: 'date', labelContent: '期限', required: false },
];

export const Date = { min: '2020-01-01', max: '2999-12-31' } as const;
