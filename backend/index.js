import express from "express";
import { PORT, mongoUrl } from "./config.js";
import mongoose from "mongoose";
import BookRoutes from "./routes/BookRoutes.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  console.log(req);
  return res.status(234).send('Welcome to MERN stack bookstore');
});

app.use('/books', BookRoutes)

mongoose.connect(mongoUrl).then(() => {
  console.log('App connected to database');
  app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  });
  
}).catch((err) => {
  console.log(err);
})
