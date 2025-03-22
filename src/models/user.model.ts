// src/app/models/user.model.ts
export interface User {
  id: number;
  fullName: string; // In questo caso il "name" del backend
  email: string;
  city: string; // Estratto da address.city
  phone: string;
  website: string;
  companyName: string; // Estratto da company.name
}
