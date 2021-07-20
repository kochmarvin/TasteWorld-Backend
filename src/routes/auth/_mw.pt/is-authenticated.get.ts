import { Request, Response } from 'express';

export = async (req: Request, res: Response) => {
    return res.send({
        error: null,
        data: {
            message: 'User authenticated',
        }
    });
};