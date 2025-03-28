// Dummy Function:
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

// Total Likes Function:
const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

// Export Functions:
module.exports = { dummy, totalLikes }