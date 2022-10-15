
export class UniversityDocument {

    alphaTwoCode: string;

    webPages: Array<string>;

    name: string;

    country: string;

    domains: Array<string>;

    stateProvince: string;
}

export class UniversityDto{

    alpha_two_code: string;

    web_pages: Array<string>;

    name: string;

    country: string;

    domains: Array<string>;

    "state-province": string;

    toDocument(): UniversityDocument{
        return {
            alphaTwoCode: this.alpha_two_code,

            webPages: this.web_pages,
        
            name: this.name,
        
            country: this.country,
        
            domains: this.domains,

            stateProvince: this["state-province"]
        }
    }
}