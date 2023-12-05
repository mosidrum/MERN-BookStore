import express from "express";
import { PORT, mongoUrl } from "./config.js";
import mongoose from "mongoose";

const app = express();

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