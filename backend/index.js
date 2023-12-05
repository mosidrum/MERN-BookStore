import express from "express";
import { PORT, mongoUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/BookModel.js";

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN stack bookstore');
});

mongoose.connect(mongoUrl).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
  
}).catch((err) => {
  console.log(err);
})

// add a book

app.post('/books', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({ message: 'please send all provided fields' });
    }

    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear
    }

    const book = await Book.create(newBook);
    return response.status(200).send(book);

  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
})

// get all books from database

app.get('/books', async (request, response) => {
  try {
    const books = await Book.find({})
    if (books) {
      return response.status(200).json({
        count: books.length,
        books: books
      })
    }
    return response.status(500).send({ message: 'No book found' })
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ error: error.message });
  }
})

//Get a book by id

app.get('/books/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);
  
    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ error: error.message });
  }
});

// update a book by id 

app.put('/books/:id', async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: 'Invalid parameters'
      });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }
    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ error: error.message });
  }
})

// delete a book from database 

app.delete('/books/:id', async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findByIdAndDelete(id);
    if (book) {
      return response.status(200).send('Book deleted successfully');
    }
    return response.status(404).send('Book not found');
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ error: error.message });
  }
})