export class ApiNucleo {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}

export class ApiCreateNucleoDto {
    name: string;
}