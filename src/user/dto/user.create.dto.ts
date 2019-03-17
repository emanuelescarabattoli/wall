import { IsString, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;

    @IsNotEmpty()
    @IsString()
    readonly password: string;
}
