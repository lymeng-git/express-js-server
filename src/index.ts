import express,{Request,Response} from 'express';
import usersRouter from './routes/users';
import staffRouter from './routes/staff';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

const app = express();
app.use(
    cors({
        origin:"http://127.0.0.1:5173",
        methods:["GET","POST","PUT","DELETE"],
        credentials:true,
    })
);
app.use(express.json());
app.disable("x-powered-by");
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(compression());


app.use('/api/user',usersRouter);
app.use('/staff',staffRouter);

app.get("/test",(req:Request,res:Response)=>{
    res.send({"OK":true});
})

// REQUESTS go here


///

const PORT = 3000;

app.listen(PORT,()=>{
    console.log(`Running on Port ${PORT}`);
});