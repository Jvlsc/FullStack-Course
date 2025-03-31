// Blog Form Component:
const BlogForm = ({ newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl, handleCreate }) => (
  <div>
    <h3>Create New:</h3>
    <form onSubmit={handleCreate}>
        <div>
            Title: &nbsp;
            <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
            />
        </div>
        <div>
            Author: &nbsp;
            <input
                type="text"
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
            />
        </div>
        <div>
            URL: &nbsp;
            <input
                type="text"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
            />
        </div>
        <button type="submit">Create</button>
    </form>
  </div>
)

// Export Blog Form Component:
export default BlogForm
