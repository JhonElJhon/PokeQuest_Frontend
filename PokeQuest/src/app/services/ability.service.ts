import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, startWith } from 'rxjs/operators'
import { IBerry } from '../interfaces/berry.interface';
import { IAbilitiy } from '../interfaces/ability.interface';
import { IHomeAbility } from '../interfaces/ability.home.interface';

@Injectable({
    providedIn: 'root'
})
export class AbilityService {
    private pokeApiUrl: string = 'https://pokeapi.co/api/v2';
    private jhonElJhonApiUrl: string = 'https://localhost:5001';

    constructor(
        private httpClient: HttpClient
    ) { }

    searchAbilityByName(name: string): Observable<IAbilitiy> {
        return this.httpClient.get(`${this.pokeApiUrl}/ability/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IAbilitiy>res));
    }

    getResourceByUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    getAbilitiesByFilter(term: string): Observable<IHomeAbility[]> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/ability/getAbilitiesByFilter/${term}`).pipe(map(res => <IHomeAbility[]>res));
    }
}