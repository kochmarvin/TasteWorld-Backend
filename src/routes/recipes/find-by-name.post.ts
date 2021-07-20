import { Request, Response } from 'express';
import RecipeModel, { Recipe } from '../../models/Recipe.model';

export = async (req: Request, res: Response) => {
    let recipes : Recipe[] = await RecipeModel.find({ name: { $regex: req.body.name } }).populate('creatorId');

    if(!recipes) {
        return res.send({
            error: {
                error: 'database_error',
                error_message: 'An error occurred while fetching the data'
            }
        });
    }

    return res.send({
        error: null,
        data: {
            message: 'successfully fetched recipes',
            recipes: recipes,
        }
    });
};