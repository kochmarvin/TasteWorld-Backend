import { Request, Response } from 'express';
import UserModel, { User } from '../../models/User.model';
import * as bcrypt from 'bcrypt';
import mongoose = require('mongoose');

export = async (req: Request, res: Response) => {

    if(req.body.email == undefined || req.body.password == undefined
        || req.body.firstName == undefined || req.body.lastName == undefined) {
        return res.send({
            error: {
                error: 'missing_data',
                error_message: 'There is a data missing to create a new user'
            },
            data: null,
        });
    }

    let newUser : User = new UserModel({
        _id: mongoose.Types.ObjectId(),
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    newUser.save().then(result => {
        return res.send({
            error: null,
            data: {
                message: 'successfully created new user'
            }
        });
    }).catch(err => {
        return res.send({
            error: {
                error: 'database_error',
                error_message: 'There was an error creatign a new user'
            },
            data: null,
        });
    });
};