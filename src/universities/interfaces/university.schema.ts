import * as mongoose from 'mongoose';

export const UniversitySchema = new mongoose.Schema({
    alpha_two_code: String,
    web_pages: Array,
    name: String,
    country: String,
    domains: Array,
    stateProvince: String,
}, {timestamps: true, collection: 'universities'})
