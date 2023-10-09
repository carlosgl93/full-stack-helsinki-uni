import { useNavigate } from "react-router-dom";
import { useField } from "../../hooks";

export const Controller = (addNew) => {
  const navigate = useNavigate();
  const content = useField();
  const author = useField();
  const info = useField();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAnec = addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    console.log(newAnec);
    navigate(`/anecdotes/${newAnec.id}`);
  };
  const handleReset = (e) => {
    e.preventDefault();
    content.onReset();
    author.onReset();
    info.onReset();
  };

  return {
    content,
    author,
    info,
    handleReset,
    handleSubmit,
  };
};
