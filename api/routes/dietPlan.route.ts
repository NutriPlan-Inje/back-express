import { Router } from "express";
import Container from "typedi";
import { DietPlanController } from "../controllers/dietPlan.controller";

export default ({ app } : { app : Router}) => {
    const route = Router();

    app.use('/dietPlan', route);

    route.get('/:u_id/:date', Container.get(DietPlanController).findDietPlanByDate.bind(DietPlanController));
    route.delete('/:dietPlan_id',Container.get(DietPlanController).deleteDietPlanById.bind(DietPlanController))
}
