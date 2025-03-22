// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './models/user.model';
import { UserMapper } from './user.mapper';
import { UserDtoSchema, UserDto } from './models/userDto.schema';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Sostituisci con l'URL della tua API

  constructor(private http: HttpClient) {}

  // GET: ottiene la lista degli utenti e li mappa al formato front-end
  getUsers(): Observable<User[]> {
    return this.http.get<unknown>(this.apiUrl).pipe(
      tap((raw) => console.log('Raw data from backend:', raw)),
      // Valida con Zod. Se il dato non è un array lo incapsula in uno array.
      map((raw) => {
        if (Array.isArray(raw)) {
          return UserDtoSchema.array().parse(raw);
        } else {
          return [UserDtoSchema.parse(raw)];
        }
      }),
      // Logga il dato validato (parsed) da Zod
      tap((parsed: UserDto[]) => console.log('Parsed data with Zod:', parsed)),
      // Mappa i DTO validati al modello front-end (User)
      map((dtos: UserDto[]) => dtos.map((dto) => UserMapper.toUser(dto))),
      // Logga il dato mappato finale
      tap((mapped: User[]) => console.log('Mapped data:', mapped))
    );
  }

  // POST: crea un nuovo utente, mappando il TO in DTO e poi la risposta di nuovo in TO.
  createUser(user: User): Observable<User> {
    const dto = UserMapper.toUserDto(user);
    return this.http.post<unknown>(this.apiUrl, dto).pipe(
      tap((raw) => console.log('Raw data from backend (POST):', raw)),
      map((raw) => {
        // Se la risposta è un array, prendi il primo elemento, altrimenti parse normalmente
        if (Array.isArray(raw)) {
          return UserDtoSchema.array().parse(raw)[0];
        } else {
          return UserDtoSchema.parse(raw);
        }
      }),
      tap((parsed: UserDto) =>
        console.log('Parsed data with Zod (POST):', parsed)
      ),
      map((createdDto: UserDto) => UserMapper.toUser(createdDto)),
      tap((mapped: User) => console.log('Mapped data (POST):', mapped))
    );
  }
}
