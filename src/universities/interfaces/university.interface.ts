import { Document } from "mongoose";

export interface University extends Document {
    readonly _id: String;
    alphaTwoCode: String,
    webPages: Array<string>,
    name: String,
    country: String,
    domains: Array<string>,
    stateProvince: String,
}

export interface Config extends Document {
    readonly _id: String;
    database_loaded: Boolean;
}