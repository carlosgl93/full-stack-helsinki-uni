import React, { useContext, useState } from 'react';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../graphql';
import { Context } from '../state/Context';
import { Book, Genres } from '../types';
import { SET_FAVORITE_GENRE } from '../graphql/mutations/setFavoriteGenre';
import { RECOMMENDED_BOOKS } from '../graphql/queries/recommendedBooks';
import '../styles/recommended.css';

export const Recommended = () => {
  const client = useApolloClient();
  const { user, setUserFavoriteGenre } = useContext(Context);
  const [displayChangeGenre, setDisplayChangeGenre] = useState(false);
  const [setFavoriteGenre] = useMutation(SET_FAVORITE_GENRE, {});

  const recommendedBooks = useQuery(RECOMMENDED_BOOKS, {
    variables: {
      genre: user?.favoriteGenre,
    },
  });
  const books = client.cache.readQuery<{
    allBooks: Book[];
  }>({
    query: ALL_BOOKS,
  });
  const genresArray: Genres[] = Object.values(Genres);

  const handleSelectGenre = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFavoriteGenre({
      variables: {
        genre: e.target.value,
      },
    });
    setUserFavoriteGenre(e.target.value);
  };

  /* 
    1. check if user already has a favorite genre
        a. trigger query for recommendedBooks
        b. render recommendedBooks
        c. render option to change fav genre
    2. else: 
        a. render books
        b. render option to set  favorite genre
        c. 
    */

  if (user?.favoriteGenre && recommendedBooks.data) {
    return (
      <div>
        <section>
          <p>Do you want to change your favorite genre?</p>
          <button type="button" onClick={() => setDisplayChangeGenre(!displayChangeGenre)}>
            Yes!
          </button>
          <br />
          <select onChange={handleSelectGenre} value={user.favoriteGenre}>
            {genresArray.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </section>
        <div>
          <header>
            <h2>Because you like {user.favoriteGenre} books</h2>
          </header>
          {recommendedBooks?.data?.recommendedBooks.map((b: Book) => (
            <article key={b.id}>
              <header>
                <h3>{b.title}</h3>
              </header>
              <p>By: {b.author.name}</p>
            </article>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <section>
          <p>Set your favorite genre in order to get personalized recommendations</p>
          <br />
          <select onChange={handleSelectGenre}>
            {genresArray.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </section>
        {books?.allBooks.map((b) => (
          <article key={b.id}>
            <header>{b.title}</header>
            <p>{b.author.name}</p>
          </article>
        ))}
      </div>
    );
  }
};
