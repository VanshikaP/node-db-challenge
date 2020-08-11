
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.string('name', 128)
                .notNullable()
                .unique();
            tbl.string('description', 128);
            tbl.boolean('status')
                .defaultTo('false');
        })
        .createTable('tasks', tbl => {
            tbl.increments();
            tbl.string('description', 128)
                .notNullable()
                .unique();
            tbl.string('notes', 128);
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.boolean('status')
                .defaultTo(false);
        })
        .createTable('resources', tbl => {
            tbl.increments();
            tbl.string('name', 128)
                .notNullable()
                .unique();
            tbl.string('description', 128);
        })
        .createTable('project-resources', tbl => {
            tbl.increments();
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
            tbl.integer('resource_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('resources')
                .onDelete('CASCADE')
                .onUpdate('CASCADE');
        });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('project-resources')
    .dropTableIfExists('resources')
    .dropTableIfExists('tasks')
    .dropTableIfExists('projects');
};
