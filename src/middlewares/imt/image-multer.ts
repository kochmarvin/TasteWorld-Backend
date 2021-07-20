import { NextFunction, Request, Response } from 'express';
import Str = require('@supercharge/strings');
import multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req: Request, file, next) {
        next(null, 'images/');
    },
    filename: function (req, file, next) {
        next(null, Str.random(50) + file.originalname);
    }
});

const upload = multer({ storage: storage });

export = upload.single('image');
