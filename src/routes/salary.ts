import { Router } from "express";
import { delete1Salary, getMonthlySalary, newStaffSalary, update1Salary } from "../handlers/salary";


const router = Router();

// router.get('/', getMonthlySalary);
router.get('/get/:department', getMonthlySalary);
router.delete('/delete/:staffid', delete1Salary);
router.put('/put/:staffid', update1Salary);
router.post('/post', newStaffSalary);
// router.post('/',staffValidationSchemaPrePost, postStaff);

// router.get('/:id', getUserById);
// router.post('/',createUser);

export default router;