const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)



let loggedUserToken 
beforeEach( async () =>{

  const response = await api
  .post('/api/login')
  .send( { username: "Thunder",
  password: "admin"})
  .expect(200)
  .expect('Content-Type', /application\/json/)

  loggedUserToken= response.body.token



} )



test('GET JSON blogs', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      
  })

  test('GET right amount of blogs', async () => {
    const response = await api.get('/api/blogs')
  
      expect(response.body).toHaveLength(2)
      
      
  })

  test('find blog with ID ', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()

  })


  test('expect 401 auth error with wrong login token', async () => {
    const newBlog = {
      "title": "best blog",
      "author": "test author",
      "url": "www.blogi.fi/kp",
      "likes": 1
    }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
    .expect('Content-Type', /application\/json/)
    })


  test('Create a new blog & check that total +1', async () => {
    const newBlog = {
      "title": "koodaus blogi",
      "author": "Ada L",
      "url": "www.blogi.fi/kp",
      "likes": 6
    }
  


    const blogsBegin = await helper.blogsInDb()
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set({"Authorization":`bearer ${loggedUserToken} `})
      .expect('Content-Type', /application\/json/)
      .expect(201)
      
      

    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsBegin.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain(
      'koodaus blogi'
    )
  })


  test('Create a new blog without likes, expect it to be 0', async () => {
    const newBlog = {
      "title": "zero likes blog",
      "author": "John Doe",
      "url": "www.blogi.fi/" 
    }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({"Authorization":`bearer ${loggedUserToken} `})
    .expect(201)
    .expect('Content-Type', /application\/json/)
   
    expect(response.body.likes).toBe(0)

 
  })

  test('if no title or url return 400', async () => {
    const newBlog = {
      
      "author": "Ada L",
      "likes": 6
    }

    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .set({"Authorization":`bearer ${loggedUserToken} `})
    .expect(400)
    .expect('Content-Type', /application\/json/)
   
    

 
  })

  afterAll(() => {
    mongoose.connection.close()
  })
