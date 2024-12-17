import { Router } from "express";
import { userRouter } from "./user";
import { spaceRouter } from "./space";
import { adminRouter } from "./admin";
import { SigninSchema, SignupSchema } from "../../types";
import bcrypt from "bcryptjs";
import client from "@repo/db/client"
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../../config";

export const router = Router();


router.post("/signup", async (req, res) => {
    const parsedData = SignupSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }

    const hashedPassword = await bcrypt.hash(parsedData.data.password, 10);

    try {
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password: hashedPassword,
                role: parsedData.data.type === "admin" ? "Admin" : "User"
            }
        })
        res.status(200).json({
            userId: user.id
        })

    } catch (error) {
        res.status(400).json({ message: "User already exists" })
    }

})

router.post("/signin", async (req, res) => {
    const parsedData = SigninSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Invalid data"
        })
        return;
    }

    try {
        const user = await client.user.findUnique({
            where: {
                username: parsedData.data.username
            }
        })
        if (!user) {
            res.status(403).json({ message: "User not found" })
            return;
        }
        const isValid = await bcrypt.compare(parsedData.data.password, user.password);
        if (!isValid) {
            res.status(403).json({ message: "Invalid credentials" })
            return;
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_PASSWORD);
        res.status(200).json({
            token
        })
    } catch (error) {
        res.status(400).json({ message: "Invalid credentials" })
    }


})

router.get("elements", (req, res) => {

})

router.get("avatars", (req, res) => {

})

router.use("/user", userRouter);
router.use("/space", spaceRouter);
router.use("/admin", adminRouter);



