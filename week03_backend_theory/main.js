import express from 'express';
const PORT = 3000;


const app = express();

app.get("/" , (req , res) => {
  res.send("abcdefghijklmnopqrstuvwxyz");
});

app.listen(PORT , ()=> {
  console.log("server running on port http://localhost:${PORT}");
});