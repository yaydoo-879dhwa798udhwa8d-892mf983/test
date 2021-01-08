import Koa from "koa";

import {
    AuthFailureResponse,
    AccessTokenErrorResponse,
    InternalErrorResponse,
    BadRequestResponse,
    ForbiddenResponse,
} from "./ApiResponse";

enum ErrorType {
    BAD_TOKEN = "BadTokenError",
    TOKEN_EXPIRED = "TokenExpiredError",
    UNAUTHORIZED = "AuthFailureError",
    ACCESS_TOKEN = "AccessTokenError",
    INTERNAL = "InternalError",
    NOT_FOUND = "NotFoundError",
    NO_ENTRY = "NoEntryError",
    NO_DATA = "NoDataError",
    BAD_REQUEST = "BadRequestError",
    FORBIDDEN = "ForbiddenError",
}
enum ErrorMsg {
    UNAUTHORIZED = "Invalid Credentials",
    INTERNAL = "Internal error",
    BAD_REQUEST = "Bad Request",
    NOT_FOUND = "Not Found",
    FORBIDDEN = "Permission denied",
    NO_ENTRY = "Entry don't exists",
    BAD_TOKEN = "Token is not valid",
    TOKEN_EXPIRED = "Token is expired",
    NO_DATA = "No data available",
    ACCESS_TOKEN = "Invalid access token",
}

export abstract class ApiError extends Error {
    constructor(
        public type: ErrorType,
        public message: ErrorMsg | string = "error"
    ) {
        super(type);
    }

    public static handle(err: ApiError, res: Koa.Context): any {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new AuthFailureResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new InternalErrorResponse(err.message).send(res);
            /*   case ErrorType.ACCESS_TOKEN:
              return new AccessTokenErrorResponse(err.message).send(res,next);
          
          case ErrorType.NOT_FOUND:
          case ErrorType.NO_ENTRY:
          case ErrorType.BAD_REQUEST:
              return new BadRequestResponse(err.message).send(res,next);
          case ErrorType.FORBIDDEN:
              return new ForbiddenResponse(err.message).send(res,next); */
            default: {
                let message = err.message;
                /* // Do not send failure message in production as it may send sensitive data
              if (environment === "production")
                  message = "Something wrong happened."; */
                return new InternalErrorResponse(message).send(res);
            }
        }
    }
}
export class TokenExpiredError extends ApiError {
    constructor(message = <string>ErrorMsg.TOKEN_EXPIRED) {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}

export class BadTokenError extends ApiError {
    constructor(message = <string>ErrorMsg.BAD_TOKEN) {
        super(ErrorType.BAD_TOKEN, message);
    }
}

export class AuthFailureError extends ApiError {
    constructor(message = <string>ErrorMsg.UNAUTHORIZED) {
        super(ErrorType.UNAUTHORIZED, message);
    }
}

export class InternalError extends ApiError {
    constructor(message = <string>ErrorMsg.INTERNAL) {
        super(ErrorType.INTERNAL, message);
    }
}
