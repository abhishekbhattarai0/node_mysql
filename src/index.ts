import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response , NextFunction} from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import * as morgan from "morgan"
import * as cors from 'cors'


import studentRoutes from './routes/studentRoutes'

import { AppError } from "./utils/AppError"



AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(morgan("dev")) //morgan is http request logger middleware for node

    app.use(cors({origin:'*'}))
    
    // register express routes from defined application routes
    app.get("/",(req: Request, res: Response, next: NextFunction) => {
        res.json({message: "Abhishek"})
    })
    app.use('/student', studentRoutes)


    // all handle route
    app.all("*", (req: Request, res: Response, next: NextFunction ) => {
        next(new AppError(404, `route ${req.originalUrl} Not Found`))
    })

    // global error handeling
    app.use((error:AppError, req: Request, res: Response, next: NextFunction) => {
        error.status = error.status || "error";
        error.StatusCode = error.StatusCode || 500;
        res.status(error.StatusCode).json({
            status: error.status,
            message: error.message
        })
    })
    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    

    console.log("Express server has started on port 3000. Open http://localhost:3000/ to see results")

}).catch(error => console.log(error))