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
    connection: {
      database: process.env.DATABASE_URL,
      ssl: true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: { directory: "./data/migrations" },
  },
};

/*

heroku run knex migrate:latest --env production -a water-my-plants-lambda

git add . | git commit -m "..." | git push

*/