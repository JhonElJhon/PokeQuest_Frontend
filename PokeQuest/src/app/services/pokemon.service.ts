import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, startWith } from 'rxjs/operators'
import { IBerry } from '../interfaces/berry.interface';
import { IAbilitiy } from '../interfaces/ability.interface';

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

    //Cambiar para el berry.service
    searchBerryByName(name: string): Observable<IBerry> {
        return this.httpClient.get(`${this.pokeApiUrl}/berry/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IBerry>res));
    }

    //Cambiar para el ability.service
    searchAbilityByName(name: string): Observable<IAbilitiy> {
        return this.httpClient.get(`${this.pokeApiUrl}/ability/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IAbilitiy>res));
    }

    getResourceByUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    getFilteredPokemonNames(term: string): Observable<string[]> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/pokemon/getFilteredPokemonNames/${term}`).pipe(map(res => <string[]>res));
    }
}