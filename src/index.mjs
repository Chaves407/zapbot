import dotenv from "dotenv";
import startClient from "./controllers/whatsappController.js";
import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

startClient();
