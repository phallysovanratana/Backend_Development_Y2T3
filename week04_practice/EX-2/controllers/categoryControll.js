import { categories } from "../models/data.js";
import express from "express";

export const getAllCategory = (req , res) =>{
  res.json(categories);
}

export const getCategoryById = (req, res) => {
  const id = parseInt(req.params.id);
  let category = null;

  for (let i = 0 ; i < categories.length ; i++){
    if(categories[i].id == id){
      categories[i] = category
      break
    }
  }

  if(category == null){
    return res.status(404).json({
      error : "category not found!!"
    })
  }

  res.status(200).json(category)
}

export const createNewCategory = (req , res) => {
  const {name} = req.body

  if(!name){
    return res.status(400).json({
      error : "name are required!!"
    })
  }

  const newId = categories[categories.length - 1].id + 1
  const newCategory = {
    id : newId,
    name : name
  }

  categories.push(newCategory)
  res.status(200).json(newCategory);
}

export const updateCategory = (req , res) => {
  const id = parseInt(req.params.id)
  let category = null;

  for(let i = 0 ; i < categories.length ; i++){
    if(categories[i].id == id){
      categories[i] = category
    }
  }

  if(category == null){
    return res.status(404).json({
      error : "category not found!!"
    })
  }

  const {name } = req.body

  if(name){
    category.name = name
  }

  res.status(200).json(category)
}

export const deleteCategory = (req , res) => {
  const id = parseInt(req.params.id)
  let index = -1

  for (let i = 0 ;i < categories.length ; i++){
    if(categories[i].id == id) {
      index = i
      break
    }
  }

  if(index == -1 ){
    return res.status(404).json({
      error : "category not found!!"
    })
  }

  categories.splice(index , 1)
  res.status(204).send(success)
}
