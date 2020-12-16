exports.up = function (knex) {
  return knex.schema
    .createTable("users", (users) => {
      users.increments();
      users.text("username", 32).notNullable();
      users.text("phone", 16).notNullable();
      users.text("password", 128).notNullable();
      users.unique("username");
    })
    .createTable("plants", (plants) => {
      plants.increments();
      plants.text("nickname", 32).notNullable();
      plants.text("binomial", 32);
      plants.float("water_frequency").notNullable();
      plants.text("image", 128);
      plants
        .integer("owner_id")
        .references("id")
        .inTable("users")
        .notNullable();
    })
    .createTable("waterings", (waterings) => {
      waterings
        .integer("user_id")
        .references("id")
        .inTable("users")
        .onDelete("cascade")
        .notNullable();
      waterings
        .integer("plant_id")
        .references("id")
        .inTable("plants")
        .onDelete("cascade")
        .notNullable();
      waterings.integer("time").notNullable();
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("waterings")
    .dropTableIfExists("plants")
    .dropTableIfExists("users");
};
