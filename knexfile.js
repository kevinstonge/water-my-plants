// Update with your config settings.

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
    ssl: true,
    rejectUnauthorized: false,
    pool: {
      min: 2,
      max: 10
    },
    migrations: { directory: "./data/migrations" },
  },
};
