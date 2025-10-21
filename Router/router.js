import express from "express"
import { login, register } from "../Controller/Controller.js"

 const router =express.Router()

router.post("/api",register)
router.post("/login",login)

export default router;
