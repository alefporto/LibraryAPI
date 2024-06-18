import express from 'express';
import dbConnect from './config/dbConnect.js';
import routes from './routes/routesIndex.js'

const connection = await dbConnect();
connection.on("error", (err) => { console.error(`Erro de conexão: ${err.message}`); });
connection.once("open", () => { console.log("Conexão estabelecida com sucesso."); });

const app = express();
app.use(express.json())
app.use(routes);

export default app;
