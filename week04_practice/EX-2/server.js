import express from "express";
import { articles, categories, journalists } from "./models/data.js";
import  articlesRouter  from "./routes/articleRoutes.js";
import journalistsRouter from "./routes/journalistRoutes.js";
import categoriesRouter from "./routes/categoryRoutes.js";

const app = express();
app.use(express.json());

const PORT = 3000;

app.use("/articles" , articlesRouter);
app.use("/journalists", journalistsRouter);
app.use("/categories" , categoriesRouter );
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});
 console.log("Articles loaded:", articles.length); 
  console.log("Journalists loaded:", journalists.length); 
  console.log("Categories loaded:", categories.length); 
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  
});
