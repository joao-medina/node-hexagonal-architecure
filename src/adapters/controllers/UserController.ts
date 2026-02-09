import express from "express";
import type { IUserRepository } from "../../application/contracts/ports.js";
import { User } from "../../domain/entities/User.entity.js";
import { SaveUser } from "../../application/useCases/SaveUser.useCase.js";
import { ListUsers } from "../../application/useCases/ListUsers.useCase.js";
import { GetUserById } from "../../application/useCases/GetUserById.useCase.js";
import { UpdateUser } from "../../application/useCases/UpdateUser.useCase.js";
import { DeleteUser } from "../../application/useCases/DeleteUser.useCase.js";

export class UserController {
  public readonly router = express.Router();

  constructor(private readonly repository: IUserRepository) {
    this.router.post("/users", this.create.bind(this));
    this.router.get("/users", this.list.bind(this));
    this.router.get("/users/:id", this.getById.bind(this));
    this.router.put("/users/:id", this.update.bind(this));
    this.router.delete("/users/:id", this.remove.bind(this));
  }

  private async create(req: any, res: any): Promise<void> {
    const { id, name, email, password, address } = req.body ?? {};

    if (!id || !name || !email || !password || !address) {
      res.status(400).json({ error: true, data: "Missing required fields." });
      return;
    }

    try {
      const user = new User(id, name, email, password, address);
      const result = await new SaveUser().execute(user, this.repository);
      if (result.error) {
        res.status(500).json({ error: true, data: String(result.data) });
        return;
      }
      res.status(201).json({ data: result.data });
    } catch (error) {
      res.status(500).json({ error: true, data: String(error) });
    }
  }

  private async list(_req: any, res: any): Promise<void> {
    try {
      const result = await new ListUsers().execute(this.repository);
      if (result.error) {
        res.status(500).json({ error: true, data: String(result.data) });
        return;
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      res.status(500).json({ error: true, data: String(error) });
    }
  }

  private async getById(req: any, res: any): Promise<void> {
    const { id } = req.params;

    try {
      const result = await new GetUserById().execute(id, this.repository);
      if (result.error) {
        const isNotFound = String(result.data).includes("not found");
        res.status(isNotFound ? 404 : 500).json({ error: true, data: String(result.data) });
        return;
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      res.status(500).json({ error: true, data: String(error) });
    }
  }

  private async update(req: any, res: any): Promise<void> {
    const { id } = req.params;
    const { name, email, password, address } = req.body ?? {};

    if (!name || !email || !password || !address) {
      res.status(400).json({ error: true, data: "Missing required fields." });
      return;
    }

    try {
      const user = new User(id, name, email, password, address);
      const result = await new UpdateUser().execute(id, user, this.repository);
      if (result.error) {
        const isNotFound = String(result.data).includes("not found");
        res.status(isNotFound ? 404 : 500).json({ error: true, data: String(result.data) });
        return;
      }
      res.status(200).json({ data: result.data });
    } catch (error) {
      res.status(500).json({ error: true, data: String(error) });
    }
  }

  private async remove(req: any, res: any): Promise<void> {
    const { id } = req.params;

    try {
      const result = await new DeleteUser().execute(id, this.repository);
      if (result.error) {
        const isNotFound = String(result.data).includes("not found");
        res.status(isNotFound ? 404 : 500).json({ error: true, data: String(result.data) });
        return;
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: true, data: String(error) });
    }
  }
}
