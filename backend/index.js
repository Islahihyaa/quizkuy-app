import { app } from "./src/server.js";

app.listen(process.env.PORT, () => {
  console.info(`Server running at ${process.env.PORT}`);
});
