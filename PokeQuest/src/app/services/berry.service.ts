import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, startWith } from 'rxjs/operators'
import { IBerry } from '../interfaces/berry.interface';
import { IAbilitiy } from '../interfaces/ability.interface';
import { IHomeBerry } from '../interfaces/berry.home.interface';

@Injectable({
    providedIn: 'root'
})
export class BerryService {
    private pokeApiUrl: string = 'https://pokeapi.co/api/v2';
    //private jhonElJhonApiUrl: string = 'https://localhost:5001';
    private jhonElJhonApiUrl: string = 'https://pokequestapi.onrender.com';

    constructor(
        private httpClient: HttpClient
    ) { }

    searchBerryByName(name: string): Observable<IBerry> {
        return this.httpClient.get(`${this.pokeApiUrl}/berry/${name.toLocaleLowerCase().replace(/\s/g, "-")}`).pipe(map(res => <IBerry>res));
    }

    getResourceByUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    getBerriesByFilter(term: string, type: string): Observable<IHomeBerry[]> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/berry/getBerriesByFilter/${term}/${type}`).pipe(map(res => <IHomeBerry[]>res));
    }
}