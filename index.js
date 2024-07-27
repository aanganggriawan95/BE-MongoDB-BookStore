import express, { request, response } from "express";
import { PORT, mongoDB } from "./config.js";
import mongoose from "mongoose";
import { Books } from "./models/booksModel.js";
import routes from "./routes/booksRoute.js";
import cors from "cors";

const app = express();
app.use(express.json());

// Option 1 : Allow All Origin with Default of cors (*)
app.use(cors());

// Option 2 : Allow Custom Origin
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (request, response) => {
  console.log(response);
  return response.status(234).send("Welcome to Meren Books Store");
});

app.use("/books", routes);

mongoose
  .connect(mongoDB)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));
