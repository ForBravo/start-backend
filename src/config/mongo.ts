import * as mongoose from 'mongoose';

export function setupMongoose() {
    const mongodbUrl = process.env.MONGODB_URI||'localhost:27017/start_backend';

    mongoose.connection.on('error', (err: any) => {
        console.error('MongoDB connection error: \n');
        console.error(err);
        process.exit();
    });

    mongoose.connect(mongodbUrl, {useNewUrlParser: true});
}