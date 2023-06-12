import { Deal } from "../interfaces/model";
import { DB } from "../../database";
import { getTaskById } from "./task-repository";
import { calculatePoints } from "./progress-repository";

async function getAllDeals():Promise<Deal[]> {
    const db = await DB.createDBConnection();
    const deals: Deal[] = await db.all<Deal[]>("SELECT * FROM deal");
    await db.close();
    return deals;
}

export async function getAllDealsByUser(userId: number):Promise<Deal[] | undefined> {
    const deals = await getAllDeals();

    let userDeals: Deal[] = [];
    for (const deal of deals) {
        const curTask = await getTaskById(deal.taskId);
        if(curTask!.userId === userId) {
            userDeals.push(deal);
        }
    }
    
    return userDeals;
}

export async function getDealByTaskId(taskId: number):Promise<Deal | undefined> {
    const db = await DB.createDBConnection();
    const stmt = await db.prepare('select * from Deal where taskId = ?1');
    await stmt.bind({1: taskId });
    const deal = await stmt.get<Deal>();
    await stmt.finalize();
    await db.close();
    return deal;
}

export async function addDeal(taskId: number):Promise<void> {
    const task = await getTaskById(taskId);
    if(task === undefined) {
        throw new Error("task doesn't exist - couldn't create deal for it.");
    }

    const db = await DB.createDBConnection();
    const stmt = await db.prepare('insert into Deal (taskId, points) values (?1, ?2)');
    const points = await calculatePoints(task.userId);
    
    //console.log(points);
    await stmt.bind({1: taskId, 2: points});
    await stmt.run();
    await stmt.finalize(); 
    await db.close();
}