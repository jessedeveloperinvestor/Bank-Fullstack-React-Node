import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Users = sequelize.define(
  "users",
  {
    login: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
  }
);
