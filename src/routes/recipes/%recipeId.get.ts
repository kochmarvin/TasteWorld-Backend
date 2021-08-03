import { Request, Response } from 'express';
import RecipeModel, { Recipe } from '../../models/Recipe.model';

export = async (req: Request, res: Response) => {

    let recipe : Recipe = await RecipeModel.findOne({ _id: req.params.recipeId }).populate('creatorId');

    if(!recipe) {
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
            message: 'successfully fetched recipe',
            recipe: recipe,
        }
    });
};