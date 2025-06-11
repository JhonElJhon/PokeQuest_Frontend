import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, startWith } from 'rxjs/operators'
import { IBerry } from '../interfaces/berry.interface';
import { IAbilitiy } from '../interfaces/ability.interface';
import { IHomeAbility } from '../interfaces/ability.home.interface';
import { IUserProfile } from '../interfaces/userProfile.interface';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    //private jhonElJhonApiUrl: string = 'https://localhost:5001';
    private jhonElJhonApiUrl: string = 'https://pokequestapi.onrender.com';

    constructor(
        private httpClient: HttpClient
    ) { }

    getAllUsers(): Observable<IUserProfile[]>{
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/user/getAllUsers`).pipe(map(res => <IUserProfile[]>res));
    }

    searchUserByName(name: string): Observable<IUserProfile> {
        return this.httpClient.get(`${this.jhonElJhonApiUrl}/user/get/${name.replace(/\s/g, "-")}`).pipe(map(res => <IUserProfile>res));
    }

    updateUserData(userData: { avatar: number; nombreViejo: string; emailViejo: string; nombreNuevo: string; emailNuevo: string;}): Observable<any> {
        return this.httpClient.put(`${this.jhonElJhonApiUrl}/user/update`, userData);
    }

    getResourceByUrl(url: string): Observable<any> {
        return this.httpClient.get(url);
    }

    updateUserPoints(userData: { usuario: string; puntos: number;}): Observable<any> {
        return this.httpClient.put(`${this.jhonElJhonApiUrl}/user/addPoints`, userData);
    }

}