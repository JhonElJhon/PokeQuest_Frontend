import { INameAndUrl } from "./name_and_url.interface"

export interface Iitem {
    attributes: { name: string, url: string }[];
    baby_trigger_for: string;
    category: INameAndUrl;
    cost: number;
    effect_entries: { effect: string, language: INameAndUrl, short_effect: string }[];
    flavor_text_entries: { language: INameAndUrl, text: string, version_group: INameAndUrl }[];
    fling_effect: { name: string, url: string }[];
    fling_power: number;
    game_indices: { game_index: number, generation: INameAndUrl }[];
    held_by_pokemon: { pokemon: INameAndUrl, version_details: { rarity: number, version: INameAndUrl }[] }[];
    id: number;
    machines: [];
    name: string;
    names: { language: INameAndUrl, name: string }[];
    sprites: { default: string };
}