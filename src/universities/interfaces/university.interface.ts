import { Document } from "mongoose";

export interface University extends Document {
    readonly _id: String;
    alpha_two_code: String,
    web_pages: Array<string>,
    name: String,
    country: String,
    domains: Array<string>,
    stateProvince: String,
}