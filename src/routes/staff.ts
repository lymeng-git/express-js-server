import { Router } from "express";
import { deleteStaff, getStaff, postStaff } from "../handlers/staff";
import { staffValidationSchemaPrePost,staffValidationSchemaPreDelete } from "../validation/validation";


const router  = Router();

router.get('/', getStaff);
router.post('/',staffValidationSchemaPrePost, postStaff);
router.delete('/:id',staffValidationSchemaPreDelete, deleteStaff);

// router.get('/:id', getUserById);
// router.post('/',createUser);

export default router;