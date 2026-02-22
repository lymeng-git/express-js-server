import express from 'express';
import usersRouter from './routes/users';
import staffRouter from './routes/staff';
import salaryRouter from './routes/salary';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import { requestedTime } from './middleware/middleware';

const app = express();
// app.use(
//     cors({
//         origin: [
//             "http://127.0.0.1:5173",
//             "http://localhost:5173",
//             "http://192.168.11.223:5173",
//         ],
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         credentials: true,
//     })
// );
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(compression());
app.use(requestedTime);


app.use('/api/user', usersRouter);
app.use('/api/staff', staffRouter);
app.use('/api/salary', salaryRouter);
// app.get('/salary',(req:Request,res:Response)=>{
//     res.status(200).json({result:true});
// })

// REQUESTS go here


///

const PORT = 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Running on Port ${PORT}`);
});