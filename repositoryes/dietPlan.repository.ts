import { Inject, Service } from "typedi";
import Repository from "./index.repository";
import mysql from 'mysql2/promise'
import DietplanDTO from "../dto/response/dietPlan";

@Service()
export default class DietPlanRepository extends Repository{
    constructor( @Inject('pool') pool : mysql.Pool){
        super(pool);
    }
    //[ ] 조회 삭제
    async findDietPlanByDateAndUid( { date, u_id} : { date : string, u_id : number }) : Promise<DietplanDTO[]> {
        const query : string = "SELECT * FROM userDietplan WHERE DATE(date) = ? AND user_id = ? ORDER BY mealTime ASC";
        const result : DietplanDTO[]  = await this.executeQuery(query, [date, u_id]);
        
        return result;
    }

    async deleteDietPlanById( { id } : { id : number }) {
        const query : string = 'DELETE FROM userDietplan WHERE id = ?'
        await this.executeQuery(query, [id]);
    }   
}