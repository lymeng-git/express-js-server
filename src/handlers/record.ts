import { Request, Response } from "express-serve-static-core";
import poolUbet from "../db/dbUbet";

type TableContentType = {
    id: string,
    useraccount: string,
    timestamp: Date | string,
    service: number,
    bonus: number,
    wing: number,
    aba: number,
    acleda: number
}

export const getRecord = async (req: Request, res: Response) => {
    const { month, year } = req.query;
    const thisMonth = formatedDate(+year!, +month!);
    const nextMonth = formatedDate(+year!, +month! + 1);
    const result_record = await poolUbet.query(`
        SELECT * FROM ubet24_logs
        WHERE timestamp AT TIME ZONE 'Asia/Phnom_Penh' >= '${thisMonth}'::timestamp
        AND timestamp AT TIME ZONE 'Asia/Phnom_Penh' < '${nextMonth}'::timestamp
        ORDER BY id DESC;`);
    if (result_record.rowCount === 0) {
        res.status(404).json({ message: 'Error: failed to get Record' });
    }
    // res.status(200).json(result_record.rows);
    const json = UTC2PhnomPenh(result_record.rows);
    res.status(200).json(json);
    // res.status(200).json({ now: thisMonth, next: nextMonth });
}
// function formattingDate(year: number, month: number) {
//     const d = new Date(year, month, 1);
//     d = d.
//     const formatted = new Intl.DateTimeFormat("en-CA", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         second: "2-digit",
//         hour12: false
//     }).format(d).replace(",", "");
//     return formatted;
// }
function formatedDate(year: number, month: number) {
    const TwoDigitsMonth = String(month).padStart(2, '0')
    const d = `${year}-${TwoDigitsMonth}-01 00:00:00`;
    return d
}
function UTC2PhnomPenh(data: TableContentType[]) {
    const jsonMain: TableContentType[] = [];
    data.map((item, i) => {

        const date = item.timestamp;
        const p = date.toLocaleString("en-CA", {
            timeZone: "Asia/Phnom_Penh",
            dateStyle: "short",
            timeStyle: "short",
            hour12: false,
        });
        jsonMain.push({ ...item, timestamp: p })
    })
    return jsonMain;
}