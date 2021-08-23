import { Request, Response } from 'express';
import RecipeModel, { Recipe } from '../../../models/Recipe.model';
import mongoose = require('mongoose');


export = async (req: Request, res: Response) => {

    if(req.body.data == undefined) {
        return res.send({
            error: {
                error: 'missing_data',
                error_message: 'Data is missing to create a new recipe',
            },
            data: null,
        });
    }

    let body = JSON.parse(JSON.stringify(req.body.data));
    body = JSON.parse(body);

    if(req.file) {
        body.picturePath = req.file.filename;
    }

    console.log(body);

    let newRecipe : Recipe = new RecipeModel({
        _id: mongoose.Types.ObjectId(),
        name: body.name,
        preperation: body.preperation,
        ingredients: body.ingredients,
        persons: body.persons,
        duration: body.duration,
        picturePath: body.picturePath,
        // @ts-ignore
        creatorId: req.user._id,
    });

    newRecipe.save().then(result => {
        return res.send({
            error: null,
            data: {
                message: 'Successfully created new recipe',
            }
        });
    }).catch(err => {
        console.log(err);
        return res.send({
            error: {
                error: 'database_error',
                error_message: 'An error occured while creating a new recipe'
            },
            data: null,
        });
    });
};