require('dotenv').config();

module.exports = {
  development: {
    username: "esloctaru",
    password: "#H0864#@",
    database: "smart",
    host: "45.174.40.217",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  },
  local: {
    username: "esloctaru",
    password: "#H0864#@",
    database: "smart",
    host: "45.174.40.217",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  },
  production: {
    username: "3conn",
    password: "$2a$12$fDM90eiqN5gXQfJAAecPFOzplJnPnp5I9TgI174r2Rh3LYsoyJ4Hm",
    database: "smart",
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  },
  test: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  }
}