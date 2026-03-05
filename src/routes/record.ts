import { Router } from "express";
import { getRecord } from "../handlers/record";


const router = Router();

// router.get('/', getMonthlySalary);
// router.get('/get/:department', getMonthlySalary);
// router.delete('/delete/:staffid', delete1Salary);
// router.put('/put/:staffid', update1Salary);
// router.post('/post/nextmonth', newMonthSalary);
// router.post('/post/newstaff',newStaffSalary);
// router.post('/',staffValidationSchemaPrePost, postStaff);
router.get('/get',getRecord);
router.post('/post/new',Newre)

// router.get('/:id', getUserById);
// router.post('/',createUser);

export default router;