import { Router } from "express";
import { getAllArticles, getArticleById, createArticle, updateArticle, deleteArticle , getArticlesByJournalist} from "../controllers/articleController.js";

const articleRouter = Router();
articleRouter.get("/", getAllArticles);
articleRouter.get("/journalists/:id/articles", getArticlesByJournalist);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", createArticle);
articleRouter.put("/:id", updateArticle);
articleRouter.delete("/:id", deleteArticle);


export default articleRouter;
