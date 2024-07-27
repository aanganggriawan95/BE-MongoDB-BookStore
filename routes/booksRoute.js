import express from "express";
import { Books } from "../models/booksModel.js";

const routes = express.Router();

// Route for save a new book
routes.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }
    const newBooks = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Books.create(newBooks);
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get all books
routes.get("/", async (request, response) => {
  try {
    const books = await Books.find();

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(5000).send({ message: error.message });
  }
});

// Route for get all books
routes.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Books.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(5000).send({ message: error.message });
  }
});

// Route for update a book
routes.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields: title, author, publishYear",
      });
    }

    const { id } = request.params;
    const result = await Books.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(5000).send({ message: error.message });
  }
});

// Route for delete a book
routes.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Books.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).json({
        message: "Book not found",
      });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(5000).send({ message: error.message });
  }
});

export default routes;
