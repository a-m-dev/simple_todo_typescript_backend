import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import { json, urlencoded } from "body-parser";
import todoRoutes from "./routes";

interface MongoConnectOpts {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
}

const app: Express = express();

const PORT: string | number = process.env.PORT || 3000;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(todoRoutes);

const uri: string = `mongodb://localhost:27017/test_todo`;
const options: MongoConnectOpts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("useFindAndModify", false);

mongoose
  .connect(uri, options)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is listening on port ", PORT);
    });
  })
  .catch((error) => {
    throw new Error(error);
  });
