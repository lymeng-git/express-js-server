import { Router } from "express";
import { delete1Salary, getMonthlySalary, newStaffSalary, update1Salary } from "../handlers/salary";


const router = Router();

router.get('/', getMonthlySalary);
router.post('/new', newStaffSalary);
router.delete('/delete/:staffid', delete1Salary);
router.put('/:staffid', update1Salary);
// router.post('/',staffValidationSchemaPrePost, postStaff);

// router.get('/:id', getUserById);
// router.post('/',createUser);

export default router;