import { Request, Response } from 'express';
import UserModel, { User } from '../../../models/User.model';

export = async (req: Request, res: Response) => {

    // @ts-ignore
    let userData: User = await UserModel.findOne({ _id: req.user._id });

    return res.send({
        error: null,
        data: {
            message: 'successfully fetched cart',
            cart: userData.cart,
        }
    });
};