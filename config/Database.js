import {
    Sequelize
} from "sequelize";

const db = new Sequelize('db_carapi', 'root', '', {
    host: "localhost",
    dialect: "mysql"
});

export default db;