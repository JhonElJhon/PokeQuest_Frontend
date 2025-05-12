import { INameAndUrl } from "./name_and_url.interface"

export interface IUserProfile {
  nombre: string;
  email: string;
  fechaInicio: string;
  puntaje: number;
  trivias: number;
  avatar: string;
}