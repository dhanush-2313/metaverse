import { Router } from "express";
import { UpdateMetadataSchema } from "../../types";

export const userRouter = Router();

userRouter.post("/metadata",(req,res)=>{
    const parsedData = UpdateMetadataSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({
            message:"Invalid data"
        })
        return;
    }

})

userRouter.get("/metadata/bulk",(req,res)=>{
})