import { ALL_BOOKS } from "../queries";
import { useQuery } from "@apollo/client";

const Books = props => {
  if (!props.show) {
    return null;
  }

  const { data, isLoading } = useQuery(ALL_BOOKS);
  console.log(data);
  const { allBooks } = data || {};

  if (isLoading) return <p>Loading, please wait</p>;

  const books = [];

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {allBooks?.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
