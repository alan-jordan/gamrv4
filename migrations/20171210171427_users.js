exports.up = function(knex, Promise) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("user_email");
    table.unique("user_email");
    table.string("user_username");
    table.unique("user_username");
    table.string("user_first_name");
    table.string("user_surname");
    table.string("user_password");
    table.date("user_date_registered").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
