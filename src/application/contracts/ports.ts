import type { User } from "../../domain/entities/User.entity.js";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: string, user: User): Promise<User>;
  delete(id: string): Promise<boolean>;
}
