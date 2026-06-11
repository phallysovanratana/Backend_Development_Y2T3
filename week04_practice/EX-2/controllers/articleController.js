import { articles , journalists , categories } from "../models/data.js";
import express from "express";



export const getAllArticle = (req , res) => {
  res.json(articles)
}

export const getArticleById = (req, res) => {
  const id = req.params.id;
  let article = null;
  for (let i = 0 ; i < articles.length ; i ++){
    if (articles[i].id == id){
      article = articles[i];
      break;
    }
  }

  if(article == null){
    return res.status(404).json({
      error : "User not found!!"
    })
  }

  res.json(article)
}

export const createNewArticle = (req , res) => {
  const {title , content , journalistId , categoryId} = req.body

  if(!title || !content || !journalistId || !categoryId){
    return res.status(400).json({
      error : "Please input all fields!!"
    })
  }

  const existJournalistId = journalists.find(j => j.id ==journalistId)
  const existCategoryId = categories.find(c => c.id == categoryId)

  if(!existCategoryId || !existJournalistId){
    return res.status(400).json({
      error : "journalistId or categoryId need to be valid!!"
    })
  }

  const newId = articles[articles.length - 1].id + 1
  const newArticle = {
    id : newId,
    title : title,
    content : content,
    journalistId : journalistId,
    categoryId : categoryId,
  };

  articles.push(newArticle)
  res.status(201).json(newArticle)
}

export const updateArticle = (req , res) => {
  const id = parseInt(req.params.id)
  let article = null

  for (let i = 0;i < articles.length ; i++){
    if(articles[i].id == id){
      article = articles[i]
    }
  }

  if(article == null){
    return res.status(404).json({
      error : "articles not found!!"
    })
  }

  const {title , content , journalistId , categoryId} = req.body
  const existJournalistId = journalists.find(j => j.id ==journalistId)
  const existCategoryId = categories.find(c => c.id == categoryId)

  if(!existCategoryId || !existJournalistId){
    return res.status(400).json({
      error : "journalistId or categoryId need to be valid!!"
    })
  }

  if(title){
    article.title = title;
  }
  if(content){
    article.content = content;
  }
  if(journalistId){
    article.journalistId = journalistId;
  }
  if(categoryId){
    article.categoryId = categoryId;
  }
  res.status(200).json(article)
}

export const deleteArticle = (req , res) => {
  let index = -1;
  const id = parseInt(req.params.id);
  for (let i = 0 ; i < articles.length ; i++){
    if (articles[i].id == id){
      index = i
      break
    }
  }

  if(index == -1){
    return res.status(400).json({
      error : "User not found!!"
    })
  }

  articles.splice(index , 1)
  res.status(202).json(articles)
}