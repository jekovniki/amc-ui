export type EntityStatusType = "ACTIVE" | "INACTIVE";

export type Entity = {
  id: string;
  uic: string;
  lei: string;
  name: string;
  status: EntityStatusType;
  entityType: EntityType;
  createdAt: string;
  updatedAt: string;
};

export type EntityType = {
  id: number;
  name: string;
};
