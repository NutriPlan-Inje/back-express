import { Router } from "express"
import Container from "typedi";
import { FoodInfoController } from "../controllers/foodInfo.controller";

export default ({ app } : { app : Router }) => {
    const route = Router();

    app.use('/foodInfo', route);

    route.get("/:f_id", Container.get(FoodInfoController).findFoodInfoById.bind(FoodInfoController));
    route.delete("/", Container.get(FoodInfoController).deleteFoodInfoById.bind(FoodInfoController));
}