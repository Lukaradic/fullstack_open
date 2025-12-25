import { Book } from "./mongoose/Book.js";
import { Author } from "./mongoose/Author.js";
import { User } from "./mongoose/User.js";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";

export const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find({});
      return books.length;
    },
    authorCount: async () => {
      const books = await Book.find({});
      return [...new Set(books.map((book) => book.author))].length;
    },
    allBooks: async (_, args) => {
      const { author, genre } = args;
      console.log(author, genre);
      const mongooseFilter = {};
      if (author) {
        mongooseFilter.author = author;
      }
      if (genre) {
        mongooseFilter.genres = genre;
      }
      const books = await Book.find(mongooseFilter).populate("author");
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({});
      const books = await Book.find({});
      return authors.map((author) => {
        const authorsBooks = books.filter(
          (book) => book.author === author.name
        );
        return {
          name: author.name,
          bookCount: authorsBooks.length,
          born: author.born,
        };
      });
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (_, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("Unauthenticated, please log in ");
      }
      const { title, author: authorName, published, genres } = args;

      if (title?.length < 5) {
        throw new GraphQLError("Title to short");
      }
      const author = await Author.find({ name: authorName });

      if (!author) {
        throw new GraphQLError("Author doesn't exist");
      }
      const newBook = new Book({
        title,
        author: author[0]._id,
        published,
        genres,
      });

      await newBook.save();
      await newBook.populate("author");
      return newBook;
    },
    editAuthor: async (_, args) => {
      if (!context.currentUser) {
        throw new GraphQLError("Unauthenticated, please log in ");
      }
      const { author, setBornTo } = args;
      const updatedAuthor = await Author.findOneAndUpdate(
        { name: author },
        { bord: setBornTo },
        { new: true }
      );

      return updatedAuthor;
    },
    addAuthor: async (_, args) => {
      const { name, born } = args;

      if (name?.length < 4) {
        throw new GraphQLError("Invalid name length, minimum length must be 4");
      }
      const author = new Author({
        name: name,
        born: born,
      });

      const response = await author.save();
      return response;
    },
    createUser: async (_, args) => {
      const { username, favoriteGenre } = args;
      const newUser = new User({
        username,
        favoriteGenre,
        password: "12345",
      });

      const res = await newUser.save();
      return res;
    },
    login: async (_, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username });
      if (!user || !password) {
        throw new GraphQLError("Wrong username or password");
      }

      const tokenData = {
        username: user.username,
        id: user.id,
      };

      return { token: jwt.sign(tokenData, process.env.JWT_SECRET) };
    },
  },
};
