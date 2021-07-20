import { Request, Response } from 'express';
import UserModel, { User } from '../../../models/User.model';

export = async (req: Request, res: Response) => {

    // @ts-ignore
    UserModel.updateOne({ _id: req.user._id }, { cart: [] }).then(result => {
        return res.send({
            error: null,
            data: {
                message: 'successfully cleared cart',
            }
        });
    }).catch(err => {
        return res.send({
            error: {
                error: 'database_error',
                erroor_message: 'An error occured while clearing the cart',
            },
            data: null
        });
    });
};