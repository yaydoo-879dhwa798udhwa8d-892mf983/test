import { UniqueEntityID } from "./UniqueEntityID";

const isEntity = (enti: any): enti is Entity<any> => {
    return enti instanceof Entity;
};

/**
 * Entity
 * @template T
 * Class for represent entity
 */
export abstract class Entity<T> {
    // @ts-ignore
    protected readonly _id: UniqueEntityID;
    public readonly props: T;
    constructor(props: T, id?: UniqueEntityID) {
        this._id = id ? id : new UniqueEntityID();
        this.props = props;
    }
    public equals(object?: Entity<T>): boolean {
        if (object == null || object == undefined) {
            return false;
        }
        if (this === object) {
            return true;
        }
        if (!isEntity(object)) {
            return false;
        }
        return this._id.equals(object._id);
    }
}
