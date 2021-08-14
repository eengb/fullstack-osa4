

const blogsRouter = require("express").Router()
const userExtractor= require('../utils/middleware').userExtractor


const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const blog = require("../models/blog")





blogsRouter.get('/', async (request, response) => {
    
  const blogs = await Blog.find({}).populate("user",{username:1,name:1})
  
  
   return response.json(blogs)
    
  })


  blogsRouter.delete('/:id', userExtractor, async (request, response) => {
    

    
    const blogId = request.params.id
    const duser = request.user
    const tbDblog = await Blog.findById(blogId)

    if (tbDblog.user.toString() === duser.id.toString()){

    await Blog.findByIdAndRemove(blogId)
    response.status(204).end()


    } else {

     return response.status(401).json({ error: 'Delete not allowed' })
    }
    
    
    
    
    
    
    

  })

  blogsRouter.put('/:id', async (request, response) => {
    
    const body= request.body

    const uBlog = {
      "title": body.title,
      "author": body.author,
      "url": body.url,
      "likes": body.likes

    }
    
    
    const result = await Blog.findByIdAndUpdate(request.params.id,uBlog, {new:true})
    response.json(result)
    

  })
  
  blogsRouter.post('/', userExtractor, async (request, response) => {
   


    
    const user = request.user

    const blog = new Blog(request.body)

    if (!blog.likes){
      blog.likes = 0
    }

    if (!blog.title || !blog.url){
      return response.status(400).json({error: 'no title or url'})
    }

    

    blog.user= user._id

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    
        response.status(201).json(savedBlog)
      
  })

  module.exports = blogsRouter