import express from 'express';
import {AppDataSource} from "./src/data-source";

import cors from 'cors';
import {router} from "./src/router/router";

const app = express();
AppDataSource.initialize().then(() => {
    console.log('Connect Database Success!')
});
app.use(express.json());
app.use(cors());
app.use('', router);

app.listen(3000, () => {
    console.log('Server is running !')
});