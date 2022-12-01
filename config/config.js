require('dotenv').config();

module.exports = {
  production: {
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
  development: {
    username: "esloctaru",
    password: "#H0864#@",
    database: "smart_dev",
    host: "192.168.0.102",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  },
  local: {
    username: "3conn",
    password: "$2a$12$fDM90eiqN5gXQfJAAecPFOzplJnPnp5I9TgI174r2Rh3LYsoyJ4Hm",
    database: "smart_local",
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  },
  test: {
    username: "3conn",
    password: "$2a$12$fDM90eiqN5gXQfJAAecPFOzplJnPnp5I9TgI174r2Rh3LYsoyJ4Hm",
    database: "smart_test",
    host: "localhost",
    dialect: "mysql",
    define: {
      timestamps: true,
      underscored: false
    }
  }
}
