import express from "express";
import {getAllArticle , getArticleById , createNewArticle , updateArticle , deleteArticle} from "../controllers/articleController.js"

const articlesRouter = express.Router();
articlesRouter.get("/" , getAllArticle);
articlesRouter.get("/:id" , getArticleById);
articlesRouter.post("/" , createNewArticle);
articlesRouter.put("/:id" , updateArticle);
articlesRouter.delete("/:id" , deleteArticle);

export default articlesRouter;