import express = require('express');
import { initCore } from '@grafe/grafe-core';
import * as database from './utils/db_connection';
import * as path from 'path';
import * as dotenv from 'dotenv';
import cors = require('cors');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

initCore(path.join(__dirname, '../grafe.json'), app);

// app.use(express.static('images'));

database.configureDatabase();

// get the port the server should use
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});
