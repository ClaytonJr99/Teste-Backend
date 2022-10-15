import * as mongoose from 'mongoose';

export const UniversitySchema = new mongoose.Schema({
    alphaTwoCode: String,
    webPages: Array,
    name: String,
    country: String,
    domains: Array,
    stateProvince: String,
}, { collection: 'universities'})

export const ConfigSchema = new mongoose.Schema({
    database_loaded: Boolean,
}, { collection: 'config' })