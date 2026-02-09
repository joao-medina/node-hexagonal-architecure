import type { UseCaseDTO } from "../contracts/dtos.js";
import type { IUserRepository } from "../contracts/ports.js";

export class ListUsers {
  async execute(repository: IUserRepository): Promise<UseCaseDTO> {
    try {
      await repository.findAll();

      return {
        data: "Users retrieved successfully."
      };
    } catch (error) {
      return {
        error: true,
        data: error
      };
    }
  }
}
