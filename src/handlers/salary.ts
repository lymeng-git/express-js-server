import { Request, Response } from "express-serve-static-core";
import pool from "../db/db";
import { Salary, SalaryResponse, Staff } from '../types/response';
import { error } from "node:console";

export const getMonthlySalary = async (req: Request, res: Response) => {
    const { month, year } = req.query;
    try {
        const result_salary = await pool.query(`
            SELECT *
            FROM salary_table
            INNER JOIN ubet24_staff
            ON ubet24_staff.staffid = salary_table.staffid
            WHERE year=${year} AND month=${month}
        `);
        if (result_salary.rowCount === 0) {
            res.status(404).json({error:"Data not found in Database."});
        } else {
            res.status(200).json(result_salary.rows);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}