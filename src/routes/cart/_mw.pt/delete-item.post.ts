import { Request, Response } from 'express';
import UserModel, { User } from '../../../models/User.model';
import { Ingredient } from '../../../models/Recipe.model';

export = async (req: Request, res: Response) => {

    // @ts-ignore
    let userData: User = await UserModel.findOne({ _id: req.user._id });

    let cart : Ingredient[] = userData.cart;
    for(let item of req.body.items) {
        for(let i = 0; i < cart.length; i++) {
            // @ts-ignore
            if(cart[i].name.toUpperCase().localeCompare(item.name.toUpperCase()) == 0) {
                cart.splice(i, 1);
                i--;
            }
        }
    }

    // @ts-ignore
    UserModel.updateOne({ _id: req.user._id }, { cart: cart }).then(result => {
        return res.send({
            error: null,
            data: {
                message: 'successfully deleted items from cart',
            }
        });
    }).catch(err => {
        return res.send({
            error: {
                error: 'database_error',
                erroor_message: 'An error occured',
            },
            data: null
        });
    });
};