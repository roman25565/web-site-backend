import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'problem with email').isEmail(),
    body('password', 'problem with password').isLength({min: 5}),
]

export const registerValidation = [
    body('email', 'problem with email').isEmail(),
    body('password', 'problem with password').isLength({min: 5}),
    body('fullName', 'problem with fullName').isLength({min: 3}),
]
export const GoogleLoginValidation = [
    body('email', 'problem with email').isEmail(),
    body('password', 'problem with password').isLength({min: 3}),
    body('fullName', 'problem with fullName').isLength({min: 3}),
    body('avatarUrl', 'problem with avatarUrl').isString(),
]


export const postCreateValidation = [
    body('title', 'problem with title').isString(),
    body('imageUrl', 'problem with imageUrl').optional().isString(),
    body('text', 'problem with text').isString(),
]   