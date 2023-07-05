import { Coordinate } from "./coordinates.interface";

export interface User {
  uuid: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  gender: string;
  address: string;
  dateOfBirth: string;
  phone: string;
  imageUrl: string;
  coordinate: Coordinate;
}


