import { ApiNucleo } from "../nucleos/api.model";

export class ApiUser {
    id: number;
    name: string;
    mobileNumber: string;
    degree: ApiDegree;
    nucleo: ApiNucleo;
    account: ApiAccount;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class ApiDegree {
    id: number;
    name: string;
    users: ApiUser[];
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

export class ApiAccount {
    id: number;
    ownerId: number;
    users: ApiUser[];
    balance: number;
}

export class ApiCreateUserDto {
    name: string
    mobileNumber: string;
    degreeCode: string;
    nucleoId: number;
}