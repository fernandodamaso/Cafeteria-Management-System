import { ApiNucleo } from "../nucleos/api.model";

export class ApiUser {
    id: number;
    name: string;
    mobileNumber: string;
    degree: ApiDegree;
    nucleo: ApiNucleo;
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

export class ApiCreateUserDto {
    name: string
    mobileNumber: string;
    degreeCode: string;
    nucleoId: number;
}