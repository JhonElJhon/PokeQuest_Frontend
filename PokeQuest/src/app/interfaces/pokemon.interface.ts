import { INameAndUrl } from "./name_and_url.interface"
import { ISprite } from "./sprite.interface"
import { IGenderedSprite } from "./gendered_sprite.interface"
import { IShortGenderedSprite } from "./gendered_sprite_short.interface"
import { IStats } from "./stats.interface"

export interface IPokemon {
    abilities: { ability: INameAndUrl, is_hidden: boolean, slot: number }[];
    base_experience: number;
    forms: INameAndUrl[];
    game_indices: { game_index: number, version: INameAndUrl }[];
    height: number;
    held_items: { item: INameAndUrl, version_details: { rarity: number, version: INameAndUrl }[] }[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: { move: INameAndUrl, version_group_details: { level_learned_at: number, move_learned_method: INameAndUrl, version_group: INameAndUrl }[] }[];
    name: string;
    order: number;
    past_types: any[];
    species: INameAndUrl;
    sprites: ISprite;
    stats: IStats[];
    types: {slot: number, type: INameAndUrl}[];
    weight: number;
}