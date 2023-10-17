import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router";
import blogService from "../services/blogs";
import React, { useState } from "react";

export const BlogView = () => {
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => blogService.getOne(id),
  });

  const likeBlogMutation = useMutation({
    mutationFn: () => likeBlog(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog", id],
      });
    },
  });

  const commentMutation = useMutation({
    mutationFn: blogService.commentBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["blog", id],
      });
      setComment("");
    },
  });

  const { likeBlog } = blogService;
  const handleComment = (e: React.SyntheticEvent) => {
    e.preventDefault();
    commentMutation.mutate({ id, comment });
  };

  if (!data) return <>No blogs found</>;

  const { title, url, likes, author, comments } = data;
  console.log(comments);
  const handleLikeBlog = (blog: any) => likeBlogMutation.mutate(blog);

  return (
    <>
      <article>
        <header>
          <h1>{title}</h1>
        </header>
        <div>
          <strong>Link: </strong>
          <a href={url} target="_blank" rel="noreferrer">
            {url}
          </a>
          <p>{likes} likes</p>{" "}
          <button onClick={() => handleLikeBlog(data)}>Like</button>
          <p>Author: {author}</p>
        </div>
      </article>
      <section>
        <h3>Comments</h3>
        <ul>
          {comments.map((c: any) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
        <form onSubmit={handleComment}>
          <input
            name="comment"
            onChange={({ target }) => setComment(target.value)}
            value={comment}
          />
          <button type="submit" disabled={!comment}>
            Comment
          </button>
        </form>
      </section>
    </>
  );
};
