import {body, param} from 'express-validator';
export const staffValidationSchemaPrePost = [
    body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({min:3,max:32})
    .withMessage('Name must be at least 3 characters')
    .isString()
    .withMessage('Invalid name'),

    body('sex')
    .notEmpty()
    .withMessage('Sex cannot be empty')
    .isLength({max:1})
    .withMessage('Sex must only be 1 characters')
    .isIn(['m','f'])
    .isString()
    .withMessage('Sex must be either "m" or "f"'),

    body('position')
    .notEmpty()
    .withMessage('Position cannot be empty')
    .isLength({min:2,max:32})
    .withMessage('Position must be between 2 - 32 characters')
    .isString()
    .withMessage('Invalid position'),

    body('jointdate')
    .notEmpty()
    .withMessage('Jointdate cannot be empty')
    .isLength({min:10,max:10})
    .withMessage('Jointdate must be in YYYY-MM-DD format')
    .isDate({format:'YYYY-MM-DD', strictMode:true})
    .withMessage('Invalid date'),

    body('salary')
    .notEmpty()
    .withMessage('Salary cannot be empty')
    .isNumeric()
    .withMessage('Invalid salary'),

    body('staffid')
    .notEmpty()
    .withMessage('Staffid cannot be empty')
    .isLength({min:5,max:5})
    .withMessage('Staffid must be exactly 5 characters')
    .isString()
    .withMessage('Invalid staffid'),
];
export const staffValidationSchemaPreDelete = [
    param('id')
    .notEmpty()
    .withMessage('Staffid cannot be empty')
    .isLength({min:5,max:5})
    .withMessage('Staffid must be exactly 5 characters')
    .isString()
    .withMessage('Invalid staffid'),
];