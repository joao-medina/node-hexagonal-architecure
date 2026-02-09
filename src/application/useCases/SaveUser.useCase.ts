import type { User } from "../../domain/entities/User.entity.js";
import type { UseCaseDTO } from "../contracts/dtos.js";
import type { IUserRepository } from "../contracts/ports.js";


export class SaveUser {
  async execute(user: User, repository: IUserRepository): Promise<UseCaseDTO> {
    try {
      await repository.create(user);
      
      return {
        data: 'User created successfully.'
      }
    } catch(error) {
      return { 
        error: true,
        data: error
      }
    }
  }
}