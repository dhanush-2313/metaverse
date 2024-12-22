import { Router } from "express";
import client from "@repo/db/client";
import { CreateSpaceSchema } from "../../types";

export const spaceRouter = Router();

spaceRouter.post("/",async(req,res)=>{
    const parsedData = CreateSpaceSchema.safeParse(req.body);
    if(!parsedData.success){
        res.status(400).json({
            message:"Validation error"
        })
        return;
    }

    if(!parsedData.data.mapId){
        await client.space.create({
            data:{
                name:parsedData.data.name,
                width:Number(parsedData.data.dimensions.split("x")[0]),
                height:Number(parsedData.data.dimensions.split("x")[1]),
                creatorId:req.userId
            }
        })
    }
})

spaceRouter.delete("/:spaceId",(req,res)=>{
    
})

spaceRouter.get("/all",(req,res)=>{
    
})

spaceRouter.post("/element",(req,res)=>{

})

spaceRouter.delete("/element",(req,res)=>{
    
})

spaceRouter.get("/:space",(req,res)=>{
    
})
