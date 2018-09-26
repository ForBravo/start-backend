import { Service } from 'typedi';
import { User } from '../model/user';
import { CreateUserDto } from '../dto/CreateUserDto';

@Service()
export class UserRepository {

    constructor() {
    }

    async findAll() {
        return User.find().lean();
    }

    async findById(id: string) {
        return User.findById(id).lean();
    }

    async deleteById(id: string) {
        return User.deleteOne({_id: id});
    }

    async createUser(dto: CreateUserDto) {
        const user = new User({name: dto.name, age: dto.age, birthday: dto.birthday});
        return user.save();
    }
}