import express from 'express';
import errorHandler from './middlewares/errorHandler.js'
import connection from './config/dbConnect.js';
import routes from './routes/routesIndex.js';

connection.on("error", (err) => { console.error(`Erro de conexão: ${err.message}`); });
connection.once("open", () => { console.log("Conexão com o banco de dados estabelecida com sucesso."); });

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
