import * as mongoose from 'mongoose';

export type UserModel = mongoose.Document & {
    name: string;
    age: number;
    birthday: Date;
};

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    birthday: Date,
}, {timestamps: true, strict: true});

export const User = mongoose.model<UserModel>('users', userSchema);