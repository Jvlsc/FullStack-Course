// Dummy Function:
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

// Total Likes Function:
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// Favorite Blog Function:
const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  // Find the blog with the most likes
  // In case of a tie, return the last one:
  const favorite = blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  })

  return favorite
}

// Most Blogs Function:
const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Find the number of blogs by author:
  const blogsByAuthor = {}
  blogs.forEach((blog) => {
    blogsByAuthor[blog.author] = (blogsByAuthor[blog.author] || 0) + 1
  })

  // Find the author with the most blogs
  // In case of a tie, return the last one:
  const authorWithMostBlogs = Object.keys(blogsByAuthor).reduce((a, b) => {
    return blogsByAuthor[a] > blogsByAuthor[b] ? a : b
  })

  return { author: authorWithMostBlogs, blogs: blogsByAuthor[authorWithMostBlogs] }
}

// Most Likes Function:
const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // Find the number of likes by author:
  const likesByAuthor = {}
  blogs.forEach((blog) => {
    likesByAuthor[blog.author] = (likesByAuthor[blog.author] || 0) + blog.likes
  })

  // Find the author with the most likes:
  // In case of a tie, return the last one:
  const authorWithMostLikes = Object.keys(likesByAuthor).reduce((a, b) => {
    return likesByAuthor[a] > likesByAuthor[b] ? a : b
  })

  return { author: authorWithMostLikes, likes: likesByAuthor[authorWithMostLikes] }
}

// Export Functions:
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }