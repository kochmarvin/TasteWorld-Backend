import { NextFunction, Request, Response } from 'express';
import jwt = require('jsonwebtoken');

export = (req: Request, res: Response, next: NextFunction) => {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.send({
            error: {
                error: 'authentication_error',
                error_message: 'You are not logged in',
            },
            data: null,
        });
    } 

    jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
        if (err) {
            console.log(err)
            return res.status(401).send({
                error: {
                    error: 'verification_error',
                    error_message: 'There was an error verifying your token',    
                },
                data: null,
            });
        }
        // @ts-ignore
        req.user = user;
        next();
    });

}
    