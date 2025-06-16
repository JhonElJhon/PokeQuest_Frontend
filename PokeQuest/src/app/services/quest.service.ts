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
import { ITrivia } from '../interfaces/trivia.interface';

@Injectable({
    providedIn: 'root'
})
export class QuestService {
    //private jhonElJhonApiUrl: string = 'https://localhost:5001';
    private jhonElJhonApiUrl: string = 'https://pokequestapi.onrender.com';

    constructor(
        private httpClient: HttpClient
    ) { }

    createQuest(questData: { retador: string; desafiado: string; puntajeASuperar: number; trivias: string;}): Observable<any>{
        return this.httpClient.post(`${this.jhonElJhonApiUrl}/quest/createQuest`, questData);
    }

    getTriviasByFilter(pokemon: string | null, type: string | null, cant: string | null): Observable<ITrivia[]> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/trivia/getTriviasByFilter/${pokemon}/${type}/${cant}`).pipe(map(res => <ITrivia[]>res));
    }
}