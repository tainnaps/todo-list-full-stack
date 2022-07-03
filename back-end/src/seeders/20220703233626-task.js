module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'Tasks',
      [
        {
          id: 1,
          name: 'Ligar para gerente da matriz',
          status: 'pendente',
          created_at: new Date(),
        },
        {
          id: 2,
          name: 'Reunião com o time de Marketing',
          status: 'pronto',
          created_at: new Date(),
        },
        {
          id: 3,
          name: 'Relatório de desempenho do semestre',
          status: 'em andamento',
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
