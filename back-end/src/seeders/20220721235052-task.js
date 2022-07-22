module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'tasks',
      [
        {
          id: 1,
          name: 'Call to the manager',
          status: 'Pending',
          user_id: 1,
          created_at: new Date(),
        },
        {
          id: 2,
          name: 'Meeting with the Marketing team',
          status: 'Done',
          user_id: 2,
          created_at: new Date(),
        },
        {
          id: 3,
          name: 'Write performance report of the semester',
          status: 'In progress',
          user_id: 1,
          created_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('tasks', null, {});
  },
};
