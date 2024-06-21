import mongoose from 'mongoose';

mongoose.connect(process.env.DB_CONNECTION_STRING);

let connection = mongoose.connection;

export default connection;
