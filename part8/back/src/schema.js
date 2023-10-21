let typeDefs = `
  type Query {
    dummy: Int
    bookCount: Int
    authorCount: Int
    allBooks(author: String, genres: [GENRES]): [Book]
    allAuthors: [Author]
    findAuthorByName(name: String!): AuthorWithBooks
  }
  
  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int
        genres: [GENRES]
    ): Book
    editAuthor(name: String! year: Int): Author
    
    
  }
  
  enum GENRES {
    classic
    revolution
    crime
    refactoring
    design
    agile
    patterns
    Mystery
    Fantasy
    Romance
    Thriller
    Horror
    Biography
    SelfHelp
    Fiction
    Science
    Travel
    Poetry
    Drama
    Young Adult
    Literature
    Crime
    Children
    Adventure
    ScienceFiction
    NonFiction
    Philosophy
  }
  
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [GENRES]
  }
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int
  }
  type AuthorWithBooks {
    author: Author
    books: [Book]
  }
`;

module.exports = {
  typeDefs,
};
