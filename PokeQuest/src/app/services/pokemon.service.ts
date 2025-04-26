import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, startWith } from 'rxjs/operators'
import { IBerry } from '../interfaces/berry.interface';
import { IAbilitiy } from '../interfaces/ability.interface';
import { IHomePokemon } from '../interfaces/pokemon.home.interface';
import { IMove } from '../interfaces/move.interface';
import { IEvolutionChain } from '../interfaces/evolution_chain.interface';
import { ISpecie } from '../interfaces/specie.interface';

@Injectable({
    providedIn: 'root'
})
export class PokemonService {
    private pokeApiUrl: string = 'https://pokeapi.co/api/v2';
    private jhonElJhonApiUrl: string = 'https://localhost:5001';

    constructor(
        private httpClient: HttpClient
    ) { }

    searchByName(name: string): Observable<IPokemon> {
        return this.httpClient.get(`${this.pokeApiUrl}/pokemon/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IPokemon>res));
    }

    searchSpecieByName(name: string): Observable<ISpecie> {
        return this.httpClient.get(`${this.pokeApiUrl}/pokemon-species/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <ISpecie>res));
    }
    searchEvolutionChainByURL(URL: string): Observable<IEvolutionChain> {
        return this.httpClient.get(URL).pipe(map(res => <IEvolutionChain>res));
    }

    //Cambiar para el berry.service
    searchBerryByName(name: string): Observable<IBerry> {
        return this.httpClient.get(`${this.pokeApiUrl}/berry/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IBerry>res));
    }

    //Cambiar para el ability.service
    searchAbilityByName(name: string): Observable<IAbilitiy> {
        return this.httpClient.get(`${this.pokeApiUrl}/ability/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IAbilitiy>res));
    }
    //Cambiar para el move.service
    searchMoveByName(name: string): Observable<IMove> {
        return this.httpClient.get(`${this.pokeApiUrl}/move/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IMove>res));
    }

    getResourceByUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    getPokemonsByFilter(term: string, type: string): Observable<IHomePokemon[]> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/pokemon/getPokemonsByFilter/${term}/${type}`).pipe(map(res => <IHomePokemon[]>res));
    }
}