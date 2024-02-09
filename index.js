import express from 'express'
import multer from 'multer'
import mongoose from 'mongoose'

import cors from 'cors'


import { registerValidation, loginValidation, postCreateValidation, GoogleLoginValidation } from './validations.js'

import { chechAuth, handleValidationErrors } from './utils/index.js'

import { UserController, PostController } from './Controllers/index.js'

mongoose.set("strictQuery", true);
mongoose.connect('mongodb+srv://shopAdministratorMongoDB:8!-ZMQr2QeYazF4@cluster0.roykehe.mongodb.net/?retryWrites=true&w=majority')
// 'mongodb+srv://shopAdministratorMongoDB:8!-ZMQr2QeYazF4@cluster0.wx3v7i4.mongodb.net/test?retryWrites=true&w=majority'
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('Db error', err))

const app = express()
const port = 4444

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage })

app.use(express.json());
app.use(cors())
app.use('/uploads', express.static('uploads'));

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.post('/auth/GoogleLogin', GoogleLoginValidation, UserController.GoogleLogin);
app.get('/auth/me', chechAuth, UserController.getme);

app.post('/upload', chechAuth, upload.single('image'), (req, res) => { res.json({ url: `/uploads/${req.file.originalname}` }) })

app.get('/posts', PostController.getAll)
app.get('/posts/:id', PostController.getOne)
app.post('/posts', chechAuth, postCreateValidation, handleValidationErrors, PostController.create)
app.delete('/posts/:id', chechAuth, PostController.remove)
app.patch('/posts/:id', chechAuth, postCreateValidation, handleValidationErrors, PostController.update)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})