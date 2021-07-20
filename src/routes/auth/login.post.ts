import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');
import UserModel, { User } from '../../models/User.model';
import * as bcrypt from 'bcrypt';

export = async (req: Request, res: Response) => {
    let userData: User = await UserModel.findOne({ email: req.body.email });

    if(userData) {
        if(bcrypt.compareSync(req.body.password, userData.password)) {
            return res.send({
                error: null,
                data: {
                    message: 'Login successful',
                    token: jwt.sign({ _id: userData._id }, process.env.TOKEN_SECRET),
                }
            });
        }
    }

    return res.send({ 
        error: {
            error: 'invalid_user',
            error_message: 'either the email or the password is wrong',
        },
        data: null
    });
};