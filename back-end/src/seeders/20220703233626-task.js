module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          id: 1,
          name: 'Call to the manager',
          status: 'Pending',
          created_at: new Date(),
        },
        {
          id: 2,
          name: 'Meeting with the Marketing team',
          status: 'Done',
          created_at: new Date(),
        },
        {
          id: 3,
          name: 'Write performance report of the semester',
          status: 'In progress',
          created_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tasks', null, {});
  },
};
