const UNORDERED_TASKS = [
  {
    id: 1,
    name: 'First task',
    status: 'Pending',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 2,
    name: 'Second task',
    status: 'Done',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const ORDERED_TASKS_BY_NAME_ASC = [
  {
    id: 2,
    name: 'Second task',
    status: 'Done',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 1,
    name: 'First task',
    status: 'Pending',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const ORDERED_TASKS_BY_STATUS_ASC = [
  {
    id: 1,
    name: 'First task',
    status: 'Pending',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 2,
    name: 'Second task',
    status: 'Done',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const ORDERED_TASKS_BY_DATE_DESC = [
  {
    id: 2,
    name: 'Second task',
    status: 'Done',
    createdAt: '2022-07-04T04:09:32.000Z',
  },
  {
    id: 1,
    name: 'First task',
    status: 'Pending',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const FIFTH_TASK = {
  id: 5,
  name: 'Fifth task',
  status: 'In progress',
  createdAt: '2022-07-04T04:09:32.000Z',
};

const UPDATED_FIFTH_TASK = {
  id: 5,
  name: 'Fifth task',
  status: 'Done',
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
