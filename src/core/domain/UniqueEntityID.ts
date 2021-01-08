import { v4 as uuid } from "uuid";

import { Identifier } from "./Identifier";

/**
 * Unique entity id
 * Child class for Identifier as Unique UUID
 */
export class UniqueEntityID extends Identifier<string | number> {
    constructor(id?: string | number) {
        super(id ? id : uuid());
    }
}
