import { Request, Response ,NextFunction } from "express";
import { Inject, Service } from "typedi";
import DietPlanRequestDTO from "../../dto/request/dietPlan";
import { DeleteDietPlanResponseDTO, DietPlanResponseDTO } from "../../dto/response/dietPlan";
import DietPlanService from "../../services/dietPlan.service";

@Service()
export class DietPlanController {
    constructor(
        @Inject( () => DietPlanService ) private readonly dietPlanService : DietPlanService
    ){}

    findDietPlanByDate = async (req: Request, res : Response, next : NextFunction) => {
        try {
            const date : string = req.params.date;
            const u_id : number = parseInt(req.params.u_id);
            const dietPlanResponseDTO : DietPlanResponseDTO = await this.dietPlanService.findDietPlanByDateAndUid({ date, u_id  });
            return res.status(200).json(dietPlanResponseDTO);
        } catch (error) {
            return next(error);
        } 
    }

    deleteDietPlanById = async (req : Request, res : Response, next : NextFunction) => {
        try {
            const id : number = parseInt(req.params.id);
            const deleteDietPlanResponseDTO : DeleteDietPlanResponseDTO = await this.dietPlanService.deleteDietPlanById({ id });
            return res.status(200).json(deleteDietPlanResponseDTO);
        } catch (error) {
            return next(error);
        }
    }
}