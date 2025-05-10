import { Entity } from "@/features/entity/types/entity";

export type Obligation = {
  id: string;
  name: string;
  description: string;
  dueDateAt: string;
  status: ObligationStatus;
  createdAt: string;
  updatedAt: string;
  entity: Omit<Entity, "entityType">;
};

export enum ObligationStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  DELETED = "DELETED",
}
