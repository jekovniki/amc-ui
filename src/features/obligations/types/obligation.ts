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

export type AddObligationRequest = {
  entityId: string;
  name: string;
  description?: string;
  dueDateAt: string;
};

export type EditObligationRequest = {
  id: string;
  name?: string;
  description?: string;
  dueDateAt?: string;
  status?: ObligationStatus;
  newEntityId?: string;
};

export enum ObligationStatus {
  PENDING = "PENDING",
  RESOLVED = "RESOLVED",
  DELETED = "DELETED",
}
