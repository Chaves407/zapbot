import wwebjs from "whatsapp-web.js";
import { MongoStore } from "wwebjs-mongo";
import mongoose from "mongoose";

const { Client, RemoteAuth, LocalAuth } = wwebjs;
const ffmpegPath = getFfmpegPath();
let client;
const wwebVersion = '2.2407.3';

function getFfmpegPath() {
	return process.platform === "win32" ? "../../ffmpeg.exe" : "ffmpeg";
}

export const initClient = async () => {
	await mongoose.connect(process.env.MONGODB_URI).catch((error) => {
		console.error("Error connecting to MongoDB: ", error);
	});
	client = new Client({
		ffmpeg: ffmpegPath,
		puppeteer: {
			headless: true,
			args: ["--no-sandbox", "--disable-setuid-sandbox"],
		},
		authStrategy: new LocalAuth({ clientId: "client" }),
		webVersionCache: {
			type: "remote",
			remotePath: `https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/${wwebVersion}.html`,
		},
	});
	return client;
};

export const getClient = () => {
	if (!client) throw new Error("Client not initialized");
	return client;
};
