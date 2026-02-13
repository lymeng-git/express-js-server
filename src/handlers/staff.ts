import { Request, Response } from "express-serve-static-core";
import pool from "../db/db";
import { Staff } from "../types/response";
import { matchedData, validationResult } from "express-validator";

export async function getStaff(req: Request, res: Response) {
    try {
        const result = await pool.query('SELECT * FROM ubet24_staff;');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}
export async function postStaff(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send({ error: result.array() });
    }
    const data: Staff = matchedData(req);
    console.log(data);
    try {
        const final = await pool.query(
            `
            INSERT INTO ubet24_staff (name,sex,position,jointdate,salary,staffid)
            VALUES ($1, $2, $3, $4, $5,$6)
            RETURNING *
            `, [data.name, data.sex, data.position, data.jointdate, data.salary, data.staffid]
        );
        res.status(201).json(final.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}
export async function deleteStaff(req: Request, res: Response) {
    // Validation
    const result = validationResult(req);
    if (!result.isEmpty()) return res.status(400).send({ error: result.array() });

    // Request Body
    const data = matchedData(req);
    res.status(200);

    try {
        const final = await pool.query(
            `
            DELETE FROM ubet24_staff
            WHERE staffid = $1
            `, [data.id]
        );
        if (final.rowCount === 0) {
            return res.status(404).json({ error: 'ID not found' });
        } else {
            res.status(201).json(final.rows);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}