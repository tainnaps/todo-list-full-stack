const UNORDERED_TASKS = [
  {
    id: 1,
    userId: 1,
    name: 'First task',
    status: 'Pending',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
  {
    id: 2,
    userId: 1,
    name: 'Second task',
    status: 'Done',
    createdAt: '2022-07-04T02:01:17.000Z',
  },
];

const FIFTH_TASK = {
  id: 5,
  userId: 1,
  name: 'Fifth task',
  status: 'In progress',
  createdAt: '2022-07-04T04:09:32.000Z',
};

const UPDATED_FIFTH_TASK = {
  ...FIFTH_TASK,
  status: 'Done',
};

module.exports = {
  UNORDERED_TASKS,
  FIFTH_TASK,
  UPDATED_FIFTH_TASK,
};
