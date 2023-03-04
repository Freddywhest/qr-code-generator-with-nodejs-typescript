import { NextFunction, Request, Response } from 'express';
import isURL from 'validator/lib/isURL';
import { reqBody } from '../@types/reqBody';

export default function validateInput(req: Request, res: Response, next: NextFunction): object | void {
    const { url, size }: reqBody = req.body;
    if(!url) return res.send({ status: false, message: "Url shouldn't be empty! "+ url });
    if(!size) return res.send({ status: false, message: "Size shouldn't be empty!" });
    if(!isURL(url)) return res.send({ status: false, message: "Url is invalid!" });
    next();
}