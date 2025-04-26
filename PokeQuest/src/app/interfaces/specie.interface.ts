import { INameAndUrl } from "./name_and_url.interface"

export interface ISpecie {
    id: number;
    name: string;
    evolution_chain: { url: string };
}