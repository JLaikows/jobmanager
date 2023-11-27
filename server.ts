import express, { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Successful reponse.");
});

const port = process.env.PORT;

app.listen(port, () =>
  console.log(`Job Manager ran successfully on port ${port}`)
);
