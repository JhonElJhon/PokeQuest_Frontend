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
    sprites: { back_default: string, back_female: string, back_shiny: string, back_shiny_female: string, front_default: string, front_female: string, front_shiny: string, front_shiny_female: string, other: { dream_world: { front_default: string, front_female: string }[], "official-artwork": { front_default: string }[] }[], versions: { "generation-i": { "red-blue": ISprite, yellow: ISprite }[], "generation-ii": { crystal: ISprite, gold: ISprite, silver: ISprite }[], "generation-iii": { "emerald": { "front_default": string, "front_shiny": string }[], "firered-leafgreen": ISprite, "ruby-sapphire": ISprite }[], "generation-iv": { "diamond-pearl": IGenderedSprite, "heartgold-soulsilver": IGenderedSprite, "platinum": IGenderedSprite }[], "generation-v": { "black-white": { "animated": IGenderedSprite, "back_default": string, "back_female": string, "back_shiny": string, "back_shiny_female": string, "front_default": string, "front_female": string, "front_shiny": string, "front_shiny_female": string }[] }[], "generation-vi": { "omegaruby-alphasapphire": IShortGenderedSprite, "x-y": IShortGenderedSprite }[], "generation-vii": { icons: { front_default: string, front_female: string }[], "ultra-sun-ultra-moon": IShortGenderedSprite }[], "generation-viii": { icons: { front_default: string, front_female: string }[] }[] }[] }[];
    stats: IStats[];
    types: [ slot: number, type: INameAndUrl ];
    weight: number;
}