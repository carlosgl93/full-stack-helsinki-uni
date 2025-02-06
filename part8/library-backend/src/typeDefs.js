const typeDefs = `

  type Subscription {
    bookAdded: Book!
  }

  enum Genre {
    refactoring
    design
    classic
    crime
    revolution
    patterns
    agile
    database
    nosql
  }

  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String]
    id: ID
  }
    
  type Author {
    name: String!
    id: ID
    born: Int
    bookCount: Int
  }
    
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
    
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: Genre): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
    
  type Mutation {
    addBook(title: String! published: Int genres: [Genre] author: String!): Book
    editAuthor(name: String setBornTo: Int): Author
    createUser(username: String! favoriteGenre: String!): User
    login(username: String! password: String!): Token
  }
`;

module.exports = typeDefs;
