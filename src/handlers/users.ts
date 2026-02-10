import { Request,Response } from "express-serve-static-core";
import { CreateUserDto } from "../dtos/CreateUser.dto";
import { CreateUserQueryParam } from "../types/query-params";
import { User } from "../types/response";

export function getUsers(req:Request,res:Response){
    res.send([]);
}
export function getUserById(req:Request,res:Response){
    res.send({});
}
export function createUser(
    req:Request<{},{},CreateUserDto,CreateUserQueryParam>,
    res:Response<User>)
{
    res.status(201).send({
        id:1,
        username:'anson',
        email:'anon@ansothedev.com'
    })
}