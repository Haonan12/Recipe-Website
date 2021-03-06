import { IRepository } from "../interface";

export default interface IUserRepository<T> extends IRepository<T> {
  findActiveUserByUsername: (username: string) => T
} 