import { INameAndUrl } from "./name_and_url.interface"

export interface IChain {
    evolves_to: IChain[];
    species: INameAndUrl;
}