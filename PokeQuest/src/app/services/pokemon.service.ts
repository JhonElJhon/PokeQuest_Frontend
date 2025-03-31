import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, startWith } from 'rxjs/operators'
import { IBerry } from '../interfaces/berry.interface';

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

    getResourceByUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    getFilteredPokemonNames(term: string): Observable<string[]> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/pokemon/getFilteredPokemonNames/${term}`).pipe(map(res => <string[]>res));
    }
}