import express,{Request,Response} from 'express';
import usersRouter from './routes/users';
import staffRouter from './routes/staff';

const app = express();
app.use(express.json());

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