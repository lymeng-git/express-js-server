import { Router } from "express";
import {getMonthlySalary} from "../handlers/salary";


const router  = Router();

router.get('/', getMonthlySalary);
// router.post('/',staffValidationSchemaPrePost, postStaff);

// router.get('/:id', getUserById);
// router.post('/',createUser);

export default router;