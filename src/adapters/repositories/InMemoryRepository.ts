import type { IUserRepository } from "../../application/contracts/ports.js";
import { User } from "../../domain/entities/User.entity.js";

export class InMemoryRepository implements IUserRepository {
  private readonly users = new Map<string, User>();

  async create(user: User): Promise<User> {
    if (this.users.has(user.id)) {
      throw new Error("User already exists.");
    }

    this.users.set(user.id, user);
    return user;
  }

  async findById(id: string): Promise<User | null> {
    return this.users.get(id) ?? null;
  }

  async findAll(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async update(id: string, user: User): Promise<User> {
    if (!this.users.has(id)) {
      throw new Error("User not found.");
    }

    const updated = new User(id, user.name, user.email, user.password, user.address);
    this.users.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.users.delete(id);
  }
}
