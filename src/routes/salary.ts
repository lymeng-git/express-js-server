import { Router } from "express";
import { getMonthlySalary, update1Salary } from "../handlers/salary";


const router = Router();

router.get('/', getMonthlySalary);
router.put('/:staffid', update1Salary);
// router.post('/',staffValidationSchemaPrePost, postStaff);

// router.get('/:id', getUserById);
// router.post('/',createUser);

export default router;