import express from 'express';
var methodOverride = require('method-override')
import {AppDataSource} from "./src/data-source";

import cors from 'cors';
import {router} from "./src/router/router";
const PORT = 8080
const app = express();
app.use(methodOverride('_method'));
AppDataSource.initialize().then(() => {
    console.log('Connect Database Success!')
});
app.use(express.json());
app.use(cors());
app.use('', router);

app.listen(PORT, () => {
    console.log(`Server is running with port ${PORT} !`)
});