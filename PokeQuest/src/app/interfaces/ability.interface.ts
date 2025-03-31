import { INameAndUrl } from "./name_and_url.interface"

export interface IAbilitiy {
    id: number;
    name: string;
    is_main_series: boolean;
    generation: INameAndUrl;
    names: { name: string, language: INameAndUrl }[];
    effect_entries: { effect: string, short_effect: string, language: INameAndUrl }[];
    effect_changes: { version_group: INameAndUrl, effect_entries: { effect: string, language: INameAndUrl }[] }[];
    flavor_text_entries: { flavor_text: string, language: INameAndUrl, version_group: INameAndUrl }[];
    pokemon: { is_hidden: boolean, slot: number, pokemon: INameAndUrl }[];
}