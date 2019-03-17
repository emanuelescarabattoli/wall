import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class UserUpdateDto {
    @IsNotEmpty()
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly username: string;

    @IsString()
    readonly password: string;
}
