const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "Mustinblogi",
        author: "Musti",
        url: "www.blogi.fi/m",
        likes: 22
      },
      {
        title: "SpiderDog",
        author: "Peter Barker",
        url: "www.blogi.fi/sd",
        likes: 1
      }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: "WonderDog",
    author: "Alias Dog",
    url: "www.blogi.fi/sa",
    likes: 3
  })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}