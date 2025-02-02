import { useState } from "react";
import { ADD_BIRTH_DAY, ALL_AUTHORS } from "../queries";
import { useQuery, useMutation } from "@apollo/client";

const Authors = props => {
  const [authorName, setAuthorName] = useState("");
  const [authorBirthday, setAuthorBirthday] = useState();

  if (!props.show) {
    return null;
  }

  const { data, isLoading } = useQuery(ALL_AUTHORS);

  const [addBirthDay] = useMutation(ADD_BIRTH_DAY, {});

  const { allAuthors } = data || {};

  if (isLoading) return <p>Loading, please wait</p>;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {allAuthors?.map(a => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <form
        onSubmit={async e => {
          e.preventDefault();

          console.log(authorName, authorBirthday);
          await addBirthDay({
            variables: {
              name: authorName,
              setBornTo: parseInt(authorBirthday)
            }
          });
        }}
      >
        <label htmlFor="authorName">Author name:</label>
        <select onChange={e => setAuthorName(e.target.value)}>
          {allAuthors.map(a => (
            <option key={a.id} value={a.name}>
              {a.name}
            </option>
          ))}
        </select>
        {/* <input type="text" name="authorName" id="authorName" onChange={e => setAuthorName(e.target.value)} /> */}
        <label htmlFor="born">Birth date:</label>
        <input type="number" name="born" id="born" onChange={e => setAuthorBirthday(e.target.value)} />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Authors;
