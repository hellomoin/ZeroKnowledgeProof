import { IsNumber } from 'class-validator';

export class CreateProverDataDto {
    @IsNumber()
    public userId: number;

    @IsNumber()
    public q: number;
    
    @IsNumber()  
    public g: number;
    
    @IsNumber()
    public a: number;
    
    @IsNumber()
    public b: number;
}

export class CreateCommitmentDto {
    @IsNumber()
    public userId: number;

    @IsNumber()
    public x: number;
}

export class CreateComputeDto {
    @IsNumber()
    public userId: number;

    @IsNumber()
    public c: number;
}

