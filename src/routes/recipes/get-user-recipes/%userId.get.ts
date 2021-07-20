import { Request, Response } from 'express';
import RecipeModel, { Recipe } from '../../../models/Recipe.model';

export = async (req: Request, res: Response) => {
    
    let recipes : Recipe[] = await RecipeModel.find({ creatorId: req.params.userId }).populate('creatorId');

    if(!recipes) {
        return res.send({
            error: {
                error: 'database_error',
                error_message: 'There was an error fetching the data',
            },
            data: null,
        });
    }

    return res.send({
        error: null,
        data: {
            message: 'successfully fetched recipes',
            recipes: recipes,
        }
    });
}