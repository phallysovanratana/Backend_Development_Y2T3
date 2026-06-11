import { getAllCategory , getCategoryById , createNewCategory , updateCategory , deleteCategory } from "../controllers/categoryControll.js";
import express from "express";

const categoriesRouter = express.Router();

categoriesRouter.get("/" , getAllCategory);
categoriesRouter.get("/:id" , getCategoryById);
categoriesRouter.post("/" , createNewCategory);
categoriesRouter.put("/:id" , updateCategory);
categoriesRouter.delete("/:id" , deleteCategory);

export default categoriesRouter;