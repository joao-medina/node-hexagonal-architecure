import type { User } from "../../domain/entities/User.entity.js";
import type { UseCaseDTO } from "../contracts/dtos.js";
import type { IUserRepository } from "../contracts/ports.js";

export class UpdateUser {
  async execute(
    id: string,
    user: User,
    repository: IUserRepository
  ): Promise<UseCaseDTO> {
    try {
      await repository.update(id, user);

      return {
        data: "User updated successfully."
      };
    } catch (error) {
      return {
        error: true,
        data: error
      };
    }
  }
}
