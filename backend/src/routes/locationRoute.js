import { Router } from "express";
const router = Router();
import { createLocation, getLocations, getLocationById, updateLocation, deleteLocation } from "../controller/locationController.js";

router.post("/", createLocation);
router.get("/", getLocations);
router.get("/:id", getLocationById);
router.put("/:id", updateLocation);
router.delete("/:id", deleteLocation);

export default router;
