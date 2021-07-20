import { Request, Response } from 'express';
import RecipeModel, { Ingredient, Recipe } from '../../models/Recipe.model';

export = async (req: Request, res: Response) => {
    let recipes : Recipe[] = await RecipeModel.find({ }).populate('creatorId');

    if(!recipes) {
        return res.send({
            error: {
                error: 'database_error',
                error_message: 'an error occured',
            },
            data: null,
        });
    }

    let recipesToSend : any[] = [];
    let skip = false;
    for(let recipe of recipes) {
        skip = false;
        for(let ingredient of recipe.ingredients) {
            for(let have of req.body.ingredients) {
                if(have.name.toUpperCase().localeCompare(ingredient.name.toUpperCase()) == 0) {
                    recipesToSend.push(recipe);
                    skip = true;
                    break;  
                }
            }

            if(skip) {
                break;
            }
        }
    }

    let finalRecipes = [];
    for(let i = 0; i < recipesToSend.length; i++) {
        let recipePercentage = 0;
        let missingIngredients = [];
        for(let ingredient of recipesToSend[i].ingredients) {
            let percentage = 1 / recipesToSend[i].ingredients.length;

            let have = req.body.ingredients.find((ing : Ingredient) => ing.name.toUpperCase().localeCompare(ingredient.name.toUpperCase()) == 0);
            
            if(have === undefined) {
                recipePercentage += percentage * 0;
                missingIngredients.push(ingredient);
                continue;
            }

            if(have.amount >= ingredient.amount) {
                recipePercentage += percentage;
                continue;
            }

            recipePercentage += (have.amount * percentage) / ingredient.amount;

            missingIngredients.push({
                name: ingredient.name,
                amount: ingredient.amount - have.amount, 
                unit: ingredient.unit,
            });
        }
        
        let copy = JSON.parse(JSON.stringify(recipesToSend[i]));
        copy["percentage"] = recipePercentage * 100;
        copy["missing"] = missingIngredients;

        finalRecipes.push(copy);
    }

    return res.send({
        error: null,
        data: {
            message: 'Successfully fetched recipies',
            recipes: finalRecipes,
        }
    });
};