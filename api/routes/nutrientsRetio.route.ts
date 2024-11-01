import { Router } from "express"
import Container from "typedi";
import NutrientsRetioController from "../controllers/nutrientsRatio.controller";

export default ({ app } : { app : Router }) => {
    const route = Router();

    app.use('/macronutrientRatio', route);

    route.get("/day/:u_id/:date", Container.get(NutrientsRetioController).calculateMacronutrientRatioForDay.bind(NutrientsRetioController));
    route.get("/week/:u_id/:date", Container.get(NutrientsRetioController).evaluateMacronutrientIntakeForWeek.bind(NutrientsRetioController));
    route.get("/evaluate/:u_id/:date", Container.get(NutrientsRetioController).evaluateMacronutrientIntakeForDay.bind(NutrientsRetioController));
}
