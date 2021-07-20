import { Request, Response } from 'express';
import UserModel, { User } from '../../../models/User.model';
import * as fs from 'fs';

export = async (req: Request, res: Response) => {
    
    let body;
    
    try {
        body = JSON.parse(req.body.data);
    }catch(err) {
        body = {};
    }
    
    if (req.file) {
        body.picturePath = req.file.filename;

        // @ts-ignore
        let user : User = await UserModel.findOne({ _id: req.user._id });

        if(user.picturePath != 'placeholder.jpg') {
            fs.unlink('uploads/' + user.picturePath, err => {
                console.log(err);
            });
        }
    }

    // @ts-ignore
    UserModel.updateOne({ _id: req.user._id }, body).then(data => {
        return res.send({
            error: null,
            data: {
                message: 'Successfully updated User',
            }
        });
    }).catch(err => {
        console.log(err);
        return res.send({
            error: {
                error: 'database_error',
                message: 'there was an error updating the user'
            },
            data: null
        });
    });
};