import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Login } from "../entity/Login";
import { AppError } from "../utils/AppError";
import * as bcrypt from 'bcryptjs'

const LoginRepo = AppDataSource.getRepository(Login)

export const getOneBy = async (req: Request, res: Response, next: NextFunction) =>{
    
    try {
        await LoginRepo.findOneBy( {id:req.params.firstName}).then( result => {
            res.status(200).json({
                message: "Student data has been fetched successfully",
                data: result
            })
        }).catch( error => {
            next(new AppError(400, error.message))
        })
    }catch (error) {
        next(new AppError(400, error.message))
    }
}

export const postDataRegister = async ( req: Request, res: Response, next: NextFunction) => {
   try {
     bcrypt.hash(req.body.password, 10, function (err, hash) {
         req.body.password = hash;
         LoginRepo.save(req.body).then( result => {
             res.status(200).json({
                 message: "Email id and password has been saved",
                 data: result
             })
         }).catch( (error)=> {
            next(new AppError(400, error.message))
         })
     })
   } catch (error) {
    next(new AppError(400, error.message))
   }
}

export const postDataLogin = async ( req: Request, res: Response, next: NextFunction) => {
    try {
        let data= LoginRepo.findOneBy( {email: req.body.email});
        bcrypt.compare( req.body.password,(await data).password , function(err, data){
            if(err){
        next(new AppError(400, err.message))
            }
           if(data){
            res.status(200).json({
                message:" Login sucessfull"
            })
           }else{
        next(new AppError(400, 'email or password doesnt match'))
            
           }
        })
    } catch (error) {
        next(new AppError(400, error.message))
    }
}