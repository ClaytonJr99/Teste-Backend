import * as mongoose from 'mongoose';

export const UniversitySchema = new mongoose.Schema({
    alpha_two_code: String,
    web_pages: Array,
    name: String,
    country: String,
    domains: Array,
    stateProvince: String,
}, { collection: 'universities'})

export const ConfigSchema = new mongoose.Schema({
    database_loaded: Boolean,
}, { collection: 'config' })