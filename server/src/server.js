import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// Define __dirname to be the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serves static files in the entire client's dist folder
const clientDistPath = path.resolve(__dirname, '../../client/dist');
console.log("Serving static files from:", clientDistPath);
app.use(express.static(clientDistPath)); 

app.use(express.json());
app.use(routes);

// Serves the index.html file for any unknown routes
app.get('*', (req,res) =>{
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
