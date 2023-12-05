import express from 'express';
import { Book } from '../models/BookModel.js';

const router = express.Router();

// add a book

router.post('/', async (request, response) => {
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

router.get('/', async (request, response) => {
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

router.get('/:id', async (request, response) => {
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

router.put('/:id', async (request, response) => {
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

router.delete('/:id', async (request, response) => {
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

export default router;