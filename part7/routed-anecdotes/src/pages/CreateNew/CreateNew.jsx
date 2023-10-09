import { Controller } from "./Controller";

export const CreateNew = ({ addNew }) => {
  const { content, author, info, handleReset, handleSubmit } =
    Controller(addNew);

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
      </form>
      <button onClick={handleReset}>reset</button>
    </div>
  );
};
