import fs from "fs/promises";
const filePath = "./hello.txt";

fs.writeFile(filePath, "Hello, Node.js beginner!")
  .then(() => {
    return fs.readFile(filePath , "utf8");
  })
  .then((data) => {
    console.log("file content", data)
  });