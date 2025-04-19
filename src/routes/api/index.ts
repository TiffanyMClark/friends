// routes/api/index.ts
import { Router } from "express";
import userRoutes from "./userRouter";
import thoughtRoutes from "./thoughtRouter";

const router = Router();

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export default router;
