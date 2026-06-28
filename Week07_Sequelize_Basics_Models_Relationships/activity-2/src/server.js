import { DataTypes } from "sequelize";
import sequelize from "./db/database.js";

// Define the Student model
const Student = sequelize.define("Student", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  major: {
    type: DataTypes.STRING,
  },
});

async function run() {
  await sequelize.sync({ force: true });

  // 🟢 1. Add 3 students
  console.log("📌 Adding 3 students...");
  // 👉 TODO: Use Student.create() to add Alice, Bob, and Chenda
  // Example:   await Student.create({ name: 'Alice', age: 20, major: 'Computer Science' });
  
  await Student.create({ name: 'Alice', age: 20, major: 'Computer Science' });
  await Student.create({ name: 'Bob', age: 22, major: 'Mathematics' });
  await Student.create({ name: 'Chenda', age: 21, major: 'Biology' });
  
  console.log("✅ 3 students added successfully!");

  // 🟡 2. Update Bob's major to "Statistics"
  console.log("📌 Updating Bob's major...");
  // 👉 TODO: Find Bob by name, then update his major
  
  const bob = await Student.findOne({ where: { name: 'Bob' } });
  if (bob) {
    bob.major = 'Statistics';
    await bob.save();
    console.log("✅ Bob's major updated to Statistics!");
  } else {
    console.log("❌ Bob not found!");
  }

  // 🔴 3. Delete Chenda
  console.log("📌 Deleting Chenda...");
  // 👉 TODO: Find Chenda by name, then delete her
  
  const chenda = await Student.findOne({ where: { name: 'Chenda' } });
  if (chenda) {
    await chenda.destroy();
    console.log("✅ Chenda deleted successfully!");
  } else {
    console.log("❌ Chenda not found!");
  }

  // 🔍 4. List all students
  console.log("\n📋 Remaining students:");
  // 👉 TODO: Use findAll() and log all students (name - age - major)
  
  const students = await Student.findAll();
  students.forEach(student => {
    console.log(`👤 ${student.name} - Age: ${student.age} - Major: ${student.major || 'Undecided'}`);
  });
  console.log(`\n📊 Total students: ${students.length}`);

  await sequelize.close(); // not strictly required, but it's good practice for short-lived scripts
}

run();