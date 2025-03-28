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
  // If the list of blogs is empty, return null:
  if (blogs.length === 0) return null

  // Find the blog with the most likes
  // In case of a tie, return the last one:
  const favorite = blogs.reduce((favorite, blog) => {
    return favorite.likes > blog.likes ? favorite : blog
  })

  // Return the favorite blog:
  return favorite
}

// Most Blogs Function:
const mostBlogs = (blogs) => {
  // If the list of blogs is empty, return null:
  if (blogs.length === 0) return null

  // Find the number of blogs by author:
  const blogsByAuthor = {}
  blogs.forEach((blog) => {
    blogsByAuthor[blog.author] = (blogsByAuthor[blog.author] || 0) + 1
  })

  // Find the author with the most blogs:
  const authorWithMostBlogs = Object.keys(blogsByAuthor).reduce((a, b) => {
    return blogsByAuthor[a] > blogsByAuthor[b] ? a : b
  })

  return { author: authorWithMostBlogs, blogs: blogsByAuthor[authorWithMostBlogs] }
}

// Export Functions:
module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }