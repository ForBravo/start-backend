import { Service } from 'typedi';
import { Body, Delete, Get, JsonController, OnUndefined, Param, Post } from 'routing-controllers';
import { UserRepository } from '../repository/userRepository';
import { CreateUserDto } from '../dto/CreateUserDto';

@Service()
@JsonController('/users')
export class UserController {

    constructor(private userRepo: UserRepository) {

    }

    @Get()
    async getUsers() {
        return await this.userRepo.findAll();
    }

    @Get('/:id')
    async getUserDetail(@Param('id')id: string) {
        return await this.userRepo.findById(id);
    }

    @Delete('/:id')
    @OnUndefined(204)
    async deleteUser(@Param('id')id: string) {
        await this.userRepo.deleteById(id);
        return;
    }

    @Post()
    async createUser(@Body()dto: CreateUserDto) {
        return await this.userRepo.createUser(dto);
    }

}