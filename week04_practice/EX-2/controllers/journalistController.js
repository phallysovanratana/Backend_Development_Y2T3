import { journalists , articles , categories } from "../models/data.js";
import express from "express"

export const getAllJournalist = (req , res) => {
  res.status(200).json(journalists)
}

export const getJournalistById = (req , res) => {
  const id = parseInt(req.params.id)
  let journalist = null
  for(let i = 0 ; i < journalists.length ; i++){
    if(journalists[i].id == id){
      journalists[i].id = journalist
      break
    }
  }

  if (journalist == null){
    return res.status(404).json({
      error : "Journalist not found!!"
    })
  }

  res.status(200).json(journalist)
}

export const createJournalist = (req ,res) => { 
  const {name , email} =  req.body
  if(!name || !email){
    return res.status(400).json({
      error : "name and email are required"
    })
  }

  newId = journalists[journalists.length - 1].id + 1
  const newJournalist = {
    id : newId,
    name : name,
    email : email
  }

  journalists.push(newJournalist)
  res.status(201).json(newJournalist)
}

export const updateJounalist = (req , res) => {
  const id = parseInt(req.params.id)
  let journalist = null
  
  for(let i = 0 ; i < journalists.length ; i++){
    if(journalists[i].id == id){
      journalist = journalists[i].id
      break
    }
  }

  if(journalist == null){
    return res.status(404).json({
      error : "journalist not found!!"
    })
  }

  const {name , email } = req.body
  if(name) journalist.name = name
  if(email) journalist.email = email

  res.status(200).json(journalist)
}

export const deleteJournalist =(req , res) =>{
  const id  = parseInt(req.params.id)
  let index = -1

  for (let i = 0 ;  i < journalists.length  ; i++){
    if(journalists[i].id == id) {
      index = i
      break
    } 
  }

  if(index == -1 ){
    return res.status(404).json({
      error : "Journalist not found!!"
    })
  }

  journalists.splice(index , 1)
  res.status(204).send()
}