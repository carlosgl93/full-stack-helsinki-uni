import React, { FC, useContext, useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql';
import { Book as BookType, Genres } from '../types';
import { BookForm } from '../components';
import { Context } from '../state/Context';

export const Books: FC = () => {
  const { user } = useContext(Context);
  const [genreFilter, setGenreFilter] = useState<Genres | null>(null);
  const [showForm, setShowForm] = useState(false);
  const { data, loading, error } = useQuery(ALL_BOOKS);
  const genresArray: Genres[] = Object.values(Genres);

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGenreFilter(e.target.value as Genres);
  };
  
  console.log(user)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops something went wrong</p>;
  }

  if (data.allBooks) {
    const filterByGenre = data.allBooks.filter((book: BookType) => {
      if (genreFilter === null) {
        return true;
      }
      return book.genres?.includes(genreFilter);
    });

    return (
      <>
        <header>
          <h1>Books</h1>
        </header>
        {user && <button onClick={() => setShowForm(!showForm)}>{showForm ? 'Close' : 'Add a book'}</button>}

        {showForm && <BookForm setShowForm={setShowForm} />}

        <section>
          <h4>Filter by genre:</h4>
          <select value={genreFilter ? genreFilter : ''} onChange={handleSelectGenre}>
            {genresArray.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </section>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Born</th>
              <th>Genres</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {data && !genreFilter
              ? data.allBooks.map((b: BookType) => (
                  <tr key={b.id + b.title}>
                    <td
                      style={{
                        textAlign: 'start',
                      }}
                    >
                      {b.title}
                    </td>
                    <td>{b.author.name}</td>
                    <td>
                      {b.genres?.map((g) => (
                        <p key={g}>{g}</p>
                      ))}
                    </td>

                    <td>{b.published}</td>
                  </tr>
                ))
              : filterByGenre.map((b: BookType) => (
                  <tr key={b.id + b.title}>
                    <td
                      style={{
                        textAlign: 'start',
                      }}
                    >
                      {b.title}
                    </td>
                    <td>{b.author.name}</td>
                    <td>
                      {b.genres?.map((g) => (
                        <p key={g}>{g}</p>
                      ))}
                    </td>

                    <td>{b.published}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </>
    );
  }

  return <div></div>;
};
