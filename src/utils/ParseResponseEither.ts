import { Either, isLeft } from "fp-ts/lib/Either";
import ErrorEntity from "../entities/ErrorEntity";
import { Response } from "express";

const ParseResponseEither = (res: Response, response: Either<ErrorEntity, any>) => {
    if(isLeft(response)){
        return res.status(400).json(response.left);
    }else{
        return res.status(201).json(response.right);
    }
}

export default ParseResponseEither;