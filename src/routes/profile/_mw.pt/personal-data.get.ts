import { Request, Response } from 'express';
import UserModel, { User } from '../../../models/User.model';

export = async (req: Request, res: Response) => {

    // @ts-ignore
    let userData: User = await UserModel.findOne({ _id: req.user._id });

    if(!userData) {
        return res.send({
            error: {
                error: 'database_error',
                error_message: 'An error occurred while getting the informations',
            },
            data: null
        });
    }

    return res.send({
        error: null,
        data: {
            message: 'successfully fetched user data',
            data: userData
        }
    });

};