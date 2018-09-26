import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    age: number;
    birthday: string;
}