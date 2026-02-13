export interface User {
    id: number;
    email: string;
    username: string;
}
export interface Staff {
    id: number,
    name: string,
    sex: string,
    position: string,
    jointdate: string,
    salary: number,
    staffid: string,
}
export interface Salary {
    id: number,
    staffid: string,
    base_salary:number,
    bonus: number,
    save_upl: number,
    loan: number,
    year: number,
    month: number,
    total_salary: number,
}
export interface SalaryResponse {
    // id: number,
    staff: Staff,
    bonus: number,
    save_upl: number,
    loan: number,
    year: number,
    month: number,
    total_salary: number,
}