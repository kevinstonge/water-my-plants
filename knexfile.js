// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./data/water-my-plants.db3",
    },
    migrations: {
      directory: "./data/migrations",
    },
    useNullAsDefault: true,
  },
  testing: {
    client: "sqlite3",
    connection: {
      filename: "./data/water-my-plants.test.db3",
    },
    migrations: {
      directory: "./data/migrations",
    },
    useNullAsDefault: true,
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: { directory: "./data/migrations" },
  },
};
