import { ALL_BOOKS, ME } from "../queries";
import { useQuery } from "@apollo/client";

const RecommendedBooks = props => {
  const { data, loading: isLoading } = useQuery(ME);
  const { data: dataBooks, loading: isLoadingBooks } = useQuery(ALL_BOOKS);
  const { me } = data || {};
  const { favoriteGenre } = me || {};

  if (isLoading || isLoadingBooks) return <p>Loading, please wait</p>;

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

      <div>
        <p>We recommend this books to you.</p>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {dataBooks?.allBooks
            ?.filter(b => {
              return b.genres.includes(favoriteGenre);
            })
            .map(a => (
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

export default RecommendedBooks;
