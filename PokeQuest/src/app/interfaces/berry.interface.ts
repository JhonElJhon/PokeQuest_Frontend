import { INameAndUrl } from "./name_and_url.interface";

export interface IBerry {
    firmness: INameAndUrl;
    flavors: { flavor: INameAndUrl, potency: number }[];
    growth_time: number;
    id: number;
    item: INameAndUrl;
    max_harvest: number;
    name: string;
    natural_gift_power: number;
    natural_gift_type: INameAndUrl;
    size: number;
    smoothness: number;
    soil_dryness: number;
}