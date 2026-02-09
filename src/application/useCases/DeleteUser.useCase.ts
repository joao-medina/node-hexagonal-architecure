import type { UseCaseDTO } from "../contracts/dtos.js";
import type { IUserRepository } from "../contracts/ports.js";

export class DeleteUser {
  async execute(id: string, repository: IUserRepository): Promise<UseCaseDTO> {
    try {
      const deleted = await repository.delete(id);

      if (!deleted) {
        throw "User not found.";
      }

      return {
        data: "User deleted successfully."
      };
    } catch (error) {
      return {
        error: true,
        data: error
      };
    }
  }
}
