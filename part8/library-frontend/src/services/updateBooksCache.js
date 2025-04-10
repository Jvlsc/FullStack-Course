// function that takes care of manipulating cache
export const updateBooksCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, (data) => {
    if (!data) return { allBooks: [addedBook] }
    return { allBooks: uniqByTitle(data.allBooks.concat(addedBook)) }
  })
}

// export the function
export default updateBooksCache
