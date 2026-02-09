import type { UseCaseDTO } from "../contracts/dtos.js";
import type { IUserRepository } from "../contracts/ports.js";

export class GetUserById {
  async execute(id: string, repository: IUserRepository): Promise<UseCaseDTO> {
    try {
      const user = await repository.findById(id);

      if (!user) {
        throw "User not found.";
      }

      return {
        data: "User retrieved successfully."
      };
    } catch (error) {
      return {
        error: true,
        data: error
      };
    }
  }
}
