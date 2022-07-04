const UNORDERED_TASKS = [
  {
    id: 1,
    name: 'Tarefa 1',
    status: 'pendente',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 2,
    name: 'Minha tarefa 2',
    status: 'pronto',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const ORDERED_TASKS_BY_NAME_ASC = [
  {
    id: 2,
    name: 'Minha tarefa 2',
    status: 'pronto',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 1,
    name: 'Tarefa 1',
    status: 'pendente',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const ORDERED_TASKS_BY_STATUS_ASC = [
  {
    id: 1,
    name: 'Tarefa 1',
    status: 'pendente',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 2,
    name: 'Minha tarefa 2',
    status: 'pronto',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const ORDERED_TASKS_BY_DATE_DESC = [
  {
    id: 2,
    name: 'Minha tarefa 2',
    status: 'pronto',
    createdAt: '2022-07-04T04:09:32.000Z',
  },
  {
    id: 1,
    name: 'Tarefa 1',
    status: 'pendente',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const FIFTH_TASK = {
  id: 5,
  name: 'Minha tarefa 5',
  status: 'em andamento',
  createdAt: '2022-07-04T04:09:32.000Z',
};

const UPDATED_FIFTH_TASK = {
  id: 5,
  name: 'Minha tarefa 5',
  status: 'pronto',
  createdAt: '2022-07-04T04:09:32.000Z',
};

module.exports = {
  UNORDERED_TASKS,
  ORDERED_TASKS_BY_NAME_ASC,
  ORDERED_TASKS_BY_STATUS_ASC,
  ORDERED_TASKS_BY_DATE_DESC,
  FIFTH_TASK,
  UPDATED_FIFTH_TASK,
};
