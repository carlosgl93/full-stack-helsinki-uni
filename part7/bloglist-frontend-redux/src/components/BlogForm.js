import { BlogFormController } from "./BlogFormController";

export const BlogForm = () => {
  const { title, setTitle, url, setUrl, handleCreateBlog } =
    BlogFormController();

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={(e) => handleCreateBlog(e, title, url)}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            id="titleInput"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">Url:</label>
          <input
            id="urlInput"
            type="text"
            name="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <div>
          <button type="submit" id="submitButton" disabled={!title || !url}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};
