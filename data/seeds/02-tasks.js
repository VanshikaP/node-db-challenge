
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {id: 1, description: 'Task 1_1', notes: 'No notes', project_id: '1', status: false},
        {id: 2, description: 'Task 1_2', project_id: '1', status: false},
        {id: 3, description: 'Task 1_3', project_id: '1', status: false},
        {id: 4, description: 'Task 2_1', notes: 'No notes', project_id: '2', status: false},
        {id: 5, description: 'Task 2_2', project_id: '2', status: false},
        {id: 6, description: 'Task 3_1', notes: 'No notes', project_id: '3', status: false},
        {id: 7, description: 'Task 3_2', notes: 'No notes', project_id: '3', status: false}
      ]);
    });
};
