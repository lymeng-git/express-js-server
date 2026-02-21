import { Request, Response } from "express-serve-static-core";
import pool from "../db/db";

export const getMonthlySalary = async (req: Request, res: Response) => {
    const { month, year } = req.query;
    const { department } = req.params;
    console.log(`year: ${year}, month: ${month}`);
    console.log(`department: ${department}`);
    try {
        const result_salary = await pool.query(`
            SELECT *,
            COALESCE(salary,0) + COALESCE(bonus,0) + COALESCE(save_upl,0) - COALESCE(loan,0) AS total_salary
            FROM salary_table
            INNER JOIN ubet24_staff
            ON ubet24_staff.staffid = salary_table.staffid
            WHERE department='${department}' AND year=${year} AND month=${month}
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
        res.status(200).json({ "ID": staffid, "Status": "UPDATED" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    };
}
export const newStaffSalary = async (req: Request, res: Response) => {
    const { staffid, name, sex, position, salary, jointdate, department } = req.body;
    const requestedDate = req.requestTime;
    const year = requestedDate.getFullYear();
    const month = requestedDate.getMonth() + 1;
    const lastday = new Date(Date.UTC(year, month, 0));
    // res.status(200);
    // console.log(req.body);
    try {
        const staffResult = await pool.query(`
            INSERT INTO ubet24_staff (name,sex,position,jointdate,staffid,department,status)
            VALUES ($1,$2,$3,$4,$5,$6,'active')
            RETURNING *;`,
            [name, sex, position, jointdate, staffid, department])
        if (staffResult.rowCount === 0) {
            return res.status(500).json({ message: 'ERROR: failed to add staff salary.' })
        };
        const salaryResult = await pool.query(`
            INSERT INTO salary_table (staffid,salary,bonus,save_upl,loan,year,month,lastday)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *;`,
            [staffid, salary, 0, 0, 0, year, month, lastday])
        if (salaryResult.rowCount === 0) {
            return res.status(500).json({ message: 'ERROR: failed to add staff salary.' })
        };
        res.status(201).json({ "ID": staffid, "Status": "ADDED" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    };
}
export const delete1Salary = async (req: Request, res: Response) => {
    const { staffid } = req.params;
    try {
        const salaryResult = await pool.query(`
            DELETE FROM salary_table
            WHERE staffid = $1
            RETURNING *;`,
            [staffid])
        if (salaryResult.rowCount === 0) {
            return res.status(500).json({ message: 'ERROR: failed to add staff salary.' })
        };
        const staffResult = await pool.query(`
            DELETE FROM ubet24_staff
            WHERE staffid = $1
            RETURNING *;`,
            [staffid])
        if (staffResult.rowCount === 0) {
            return res.status(500).json({ message: 'ERROR: failed to add staff salary.' })
        };
        res.status(200).json({ "ID": staffid, "Status": "DELETED" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    };
}