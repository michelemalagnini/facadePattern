// src/app/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { User } from './models/user.model';
import { UserDto } from './models/userDto.model';
import { UserMapper } from './user.mapper';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/users'; // Sostituisci con l'URL della tua API

  constructor(private http: HttpClient) {}

  // GET: ottiene la lista degli utenti e li mappa al formato front-end
  getUsers(): Observable<User[]> {
    return this.http.get<UserDto[]>(this.apiUrl).pipe(
      tap((rawData) => console.log('Raw data from backend:', rawData)),
      map((dtos: UserDto[]) => dtos.map((dto) => UserMapper.toUser(dto))),
      tap((mappedData) => console.log('Mapped data:', mappedData))
    );
  }

  // POST: crea un nuovo utente, mappando il TO in DTO e poi la risposta di nuovo in TO.
  createUser(user: User): Observable<User> {
    const dto: UserDto = UserMapper.toUserDto(user);
    return this.http
      .post<UserDto>(this.apiUrl, dto)
      .pipe(map((createdDto: UserDto) => UserMapper.toUser(createdDto)));
  }
}
