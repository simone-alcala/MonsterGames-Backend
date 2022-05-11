import express,{json} from 'express';
import chalk from 'chalk';
import cors from 'cors';
import dotenv from 'dotenv';

import authRouter from '../routers/authRouter.js';
import productsRouter from '../routers/productsRouter.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);
app.use(productsRouter);

app.listen(process.env.PORT, () => 
  console.log(chalk.bold.green('Server running on port ' + process.env.PORT))
);