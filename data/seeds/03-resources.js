
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').del()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        {id: 1, name: 'computer', description: 'Check specifications'},
        {id: 2, name: 'conference-room'},
        {id: 3, name: 'microphone'},
        {id: 4, name: 'webcam'},
        {id: 5, name: 'phone', description: 'smartphone'}
      ]);
    });
};
