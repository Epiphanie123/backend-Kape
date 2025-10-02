import { Router } from "express";
import userRouter from "./userpath";
import productrouter from "./productrouter";
import contactRouter from "./contactRouter";



const mainRouter=Router();

mainRouter.use("/product",productrouter)
mainRouter.use("/user",userRouter)
mainRouter.use("/contact",userRouter)
mainRouter.use("/OTP",userRouter)

export default mainRouter;