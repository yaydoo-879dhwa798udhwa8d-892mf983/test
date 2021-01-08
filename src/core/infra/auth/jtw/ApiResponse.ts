import Koa from "koa";

// Helper code for the API consumer to understand the error and handle is accordingly
enum StatusCode {
    SUCCESS = "10000",
    FAILURE = "10001",
    RETRY = "10002",
    INVALID_ACCESS_TOKEN = "10003",
}

enum ResponseStatus {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_ERROR = 500,
}

enum ResponseMsg {
    INVALID_ACCESS_TOKEN = "Invalid Access token",
    BAD_REQUEST = "Bad Parameters",
    UNAUTHORIZED = "Authentication Failure",
    FORBIDDEN = "Forbidden",
    NOT_FOUND = "Not Found",
    INTERNAL_ERROR = "Internal Error",
}

abstract class ApiResponse {
    constructor(
        protected statusCode: StatusCode,
        protected status: ResponseStatus,
        protected message: string | ResponseMsg
    ) {}

    protected prepare<T extends ApiResponse>(
        res: Koa.Context,
        response: T
    ): any {
        res.throw(this.status, String(ApiResponse.sanitize(response).message));
    }

    public send(res: Koa.Context): any {
        return this.prepare<ApiResponse>(res, this);
    }

    private static sanitize<T extends ApiResponse>(response: T): T {
        const clone: T = {} as T;
        Object.assign(clone, response);
        // delete {some_field};
        delete clone.status;
        for (const i in clone)
            if (typeof clone[i] === "undefined") delete clone[i];
        return clone;
    }
}

export class AuthFailureResponse extends ApiResponse {
    constructor(message = <string>ResponseMsg.UNAUTHORIZED) {
        super(StatusCode.FAILURE, ResponseStatus.UNAUTHORIZED, message);
    }
}

export class ForbiddenResponse extends ApiResponse {
    constructor(message = <string>ResponseMsg.FORBIDDEN) {
        super(StatusCode.FAILURE, ResponseStatus.FORBIDDEN, message);
    }
}

export class BadRequestResponse extends ApiResponse {
    constructor(message = <string>ResponseMsg.BAD_REQUEST) {
        super(StatusCode.FAILURE, ResponseStatus.BAD_REQUEST, message);
    }
}

export class InternalErrorResponse extends ApiResponse {
    constructor(message = <string>ResponseMsg.INTERNAL_ERROR) {
        super(StatusCode.FAILURE, ResponseStatus.INTERNAL_ERROR, message);
    }
}

export class SuccessMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }
}

export class FailureMsgResponse extends ApiResponse {
    constructor(message: string) {
        super(StatusCode.FAILURE, ResponseStatus.SUCCESS, message);
    }
}

/* export class SuccessResponse<T> extends ApiResponse {
    constructor(message: string, private data: T) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }

    send(res: Koa.Context): any {
        return super.prepare<SuccessResponse<T>>(res, this);
    }
} */

export class AccessTokenErrorResponse extends ApiResponse {
    private instruction = "refresh_token";

    constructor(message = <string>ResponseMsg.INVALID_ACCESS_TOKEN) {
        super(
            StatusCode.INVALID_ACCESS_TOKEN,
            ResponseStatus.UNAUTHORIZED,
            message
        );
    }

    send(res: Koa.Context): any {
        res.header["instruction"] = this.instruction;
        super.prepare<AccessTokenErrorResponse>(res, this);
    }
}

export class TokenRefreshResponse extends ApiResponse {
    constructor(
        message: string,
        private accessToken: string,
        private refreshToken: string
    ) {
        super(StatusCode.SUCCESS, ResponseStatus.SUCCESS, message);
    }

    send(res: Koa.Context): any {
        super.prepare<TokenRefreshResponse>(res, this);
    }
}
