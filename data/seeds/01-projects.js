
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        {id: 1, name: 'Project 1'},
        {id: 2, name: 'Project 2'},
        {id: 3, name: 'Project 3', description: 'Dummy Description'}
      ]);
    });
};
