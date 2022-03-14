import { IsNumber } from 'class-validator';

export class CreateVerifierDataDto {
    @IsNumber()
    public userId: number;
}

export class CreateChallengeDataDto {
    @IsNumber()
    public userId: number;

    @IsNumber()
    public r1: number;

    @IsNumber()
    public r2: number;   
}

export class CreateResponseDataDto {
    @IsNumber()
    public userId: number;

    @IsNumber()
    public S: number;    
}