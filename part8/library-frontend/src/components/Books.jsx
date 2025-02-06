import { useState } from "react";
import { ALL_BOOKS, BOOKS_BY_GENRE } from "../queries";
import { useQuery } from "@apollo/client";

export const allGenres = [
  "refactoring",
  "design",
  "classic",
  "crime",
  "revolution",
  "patterns",
  "agile",
  "database",
  "nosql"
];
const Books = props => {
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { data, loading: isLoading } = useQuery(BOOKS_BY_GENRE, {
    variables: {
      genre: selectedGenre
    }
  });

  const { allBooks } = data || {};
  const handleSelectGenre = e => {
    setSelectedGenre(e.target.value);
  };

  if (isLoading) return <p>Loading, please wait</p>;

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        Filter by genre:
        <select onChange={handleSelectGenre} name="genreSelector" id="genreSelector">
          <option>Select a genre</option>
          {allGenres.map((o, i) => (
            <option key={i} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
