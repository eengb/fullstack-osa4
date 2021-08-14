const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs)=> {


  const sum = blogs.reduce((sum,blog) => sum + blog.likes, 0)
  return blogs.length === 0 ? 0 : sum
}
const FavoriteBlog = (blogs)=> {

  let favBlog = blogs[0]

  for (let i = 0; i< blogs.length; i++){
    if (blogs[i].likes >favBlog.likes ){
      favBlog = blogs[i]
    }
  }
  return blogs.length === 0 ? null : favBlog
}

const mostBlogs = (blogs)=>{

  if (blogs.length===0){
    return null
  } else{

const listGroup =_.groupBy( blogs, 'author' )

const listCount =_.mapValues(listGroup, o =>  o.length)
const lista=[]
for (const [key, value] of Object.entries(listCount)) {
  lista.push({'author' : key, 'blogs' : value})
}

let mBlogs = lista[0]

  for (let i = 0; i< lista.length; i++){
    if (lista[i].blogs >mBlogs.blogs ){
      mBlogs = lista[i]
    }
  }

return mBlogs
  }

}

const mostLikes = (blogs)=>{

if (blogs.length===0){
  return null
} else{



const listGroup =_.groupBy( blogs, 'author' )

const listCount =_.mapValues(listGroup, totalLikes)

const AuthorMostL = Object.entries(listCount ).reduce((a,b) => a[1] > b[1] ?  a:b)

const mLikes = {'author' : AuthorMostL[0], 'likes' : AuthorMostL[1] }

return mLikes
}

}
  


  module.exports = {
    dummy,
    totalLikes,
    FavoriteBlog,
    mostBlogs,
    mostLikes

  }