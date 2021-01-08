import { Request } from "express";


declare interface PublicRequest extends Request {
    apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
    currentRoleCode: string;
}

interface Role {
    code: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface User {
    name: string;
    email?: string;
    password?: string;
    profilePicUrl?: string;
    roles: Role[];
    verified?: boolean;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

interface Keystore {
    client: User;
    primaryKey: string;
    secondaryKey: string;
    status?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

declare interface ProtectedRequest extends RoleRequest {
    user: User;
    accessToken: string;
    keystore: Keystore;
}

declare interface Tokens {
    accessToken: string;
    refreshToken: string;
}
