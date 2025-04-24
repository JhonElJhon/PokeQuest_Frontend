import { INameAndUrl } from "./name_and_url.interface"

export interface IMove {
    accuracy: number;
    //contest_combos: { normal: { use_after: INameAndUrl[], use_before: INameAndUrl[]}, super: { use_after: INameAndUrl[], use_before: INameAndUrl[]}}
    id: number;
    name: string;
    names: { name: string, language: INameAndUrl }[];
}