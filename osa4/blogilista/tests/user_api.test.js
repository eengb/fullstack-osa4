const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')


test('test username', async () => {
    const newUser = {
        "username": "z",
        "name": "Rob",
        "password": "admin"  
  }

     await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    
   
    

 
  })

  test('test password', async () => {
    const newUser = {
        "username": "Zorro",
        "name": "Rob",
        "password": "ad"  
  }

     await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
    
   
    

 
  })

  afterAll(() => {
    mongoose.connection.close()
  })