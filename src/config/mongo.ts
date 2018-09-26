import * as mongoose from 'mongoose';

export function setupMongoose() {
    const mongodbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/start_backend';

    mongoose.connect(mongodbUrl, {useNewUrlParser: true})
        .then(db => {
            console.log('MongoDB connection success');
            return db;
        })
        .catch(err => {
            console.error('MongoDB connection error: \n');
            console.error(err);
            process.exit();
        });
}