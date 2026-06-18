import { DataTypes } from "sequelize";
import sequelize from "../db/database.js";


// TODO - Create the model User  (attributes name and age)
const User = sequelize.define("User" , {
    name: DataTypes.STRING,
    age: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
// 2- Synchronise with database 
let result = await sequelize.sync({ alter: true }); 
// 3 – Create an instance 
const ronan = await User.build({ name: "Ronan", age: 30 }); 
// 4 - Validates the instance , persists it to the database 
result = await  ronan.save();

const jane = await User.create({ name: 'Jane', age : 30 });
await jane.save();
// TODO - Export the model User
export default User;
