import { Request, Response } from "express-serve-static-core";
import pool from "../db/db";
import { Salary, SalaryResponse, Staff } from '../types/response';
import { error } from "node:console";

export const getMonthlySalary = async (req: Request, res: Response) => {
    const { month, year } = req.query;
    try {
        const result_salary = await pool.query(`
            SELECT *,
            COALESCE(salary,0) + COALESCE(bonus,0) + COALESCE(save_upl,0) - COALESCE(loan,0) AS total_salary
            FROM salary_table
            INNER JOIN ubet24_staff
            ON ubet24_staff.staffid = salary_table.staffid
            WHERE year=${year} AND month=${month}
        `);
        if (result_salary.rowCount === 0) {
            res.status(404).json({ error: "Data not found in Database." });
        } else {
            res.status(200).json(result_salary.rows);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}
export const update1Salary = async (req: Request, res: Response) => {
    const { staffid } = req.params;
    const { bonus, save_upl, loan, salary, lastday } = req.body;
    try {
        const result = await pool.query(`
            UPDATE salary_table
            SET salary = $1,
                bonus = $2,
                save_upl = $3,
                loan = $4,
                lastday = $5
            WHERE staffid = $6
            RETURNING *;`,
            [salary, bonus, save_upl, loan, lastday, staffid])
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'ERROR 404: Staff ID is not found in database.' })
        };
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    };
}