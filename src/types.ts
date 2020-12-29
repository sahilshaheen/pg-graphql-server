import { EntityManager } from "@mikro-orm/core";

export interface Context {
    em: EntityManager;
    uid?: string;
}