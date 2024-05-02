import express from "express";
import { qrCodeDataURL } from "./services/QRCodeService.js";

const app = express();

app.get("/", (_req, res) => {
	res.send(`<img src="${qrCodeDataURL}" alt="QR Code" />`);
});

export default app;
