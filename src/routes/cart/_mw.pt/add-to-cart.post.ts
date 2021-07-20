import { Request, Response } from 'express';
import UserModel, { User } from '../../../models/User.model';

export = async (req: Request, res: Response) => {

    // @ts-ignore
    let userData: User = await UserModel.findOne({ _id: req.user._id });

    let cart = userData.cart.concat(req.body.items);

    // @ts-ignore
    UserModel.updateOne({ _id: req.user._id }, { cart: cart }).then(result => {
        return res.send({
            error: null,
            data: {
                message: 'successfully updated cart',
            }
        });
    }).catch(err => {
        return res.send({
            error: {
                error: 'database_error',
                erroor_message: 'An error occured while updating the cart',
            },
            data: null
        });
    });
};