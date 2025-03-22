import { User } from './models/user.model';
import { UserDto } from './models/userDto.model';

export class UserMapper {
  // Mappa dal formato backend (DTO) al formato front-end (TO)
  static toUser(dto: UserDto): User {
    return {
      id: dto.id,
      fullName: dto.name,
      email: dto.email,
      city: dto.address.city,
      phone: dto.phone,
      website: dto.website,
      companyName: dto.company.name,
    };
  }

  // Mappa dal formato front-end al formato backend per le operazioni POST.
  // Nota: i campi non presenti nel TO vengono impostati a valori di default o vuoti.
  static toUserDto(user: User): UserDto {
    return {
      id: user.id,
      name: user.fullName,
      username: '', // Se necessario, potresti aggiungere un campo per il username nel front-end
      email: user.email,
      address: {
        street: '',
        suite: '',
        city: user.city,
        zipcode: '',
        geo: {
          lat: '',
          lng: '',
        },
      },
      phone: user.phone,
      website: user.website,
      company: {
        name: user.companyName,
        catchPhrase: '',
        bs: '',
      },
    };
  }
}
