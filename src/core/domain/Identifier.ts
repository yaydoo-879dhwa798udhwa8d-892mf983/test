/**
 * Identifier
 * @template T
 * Class for Identifier: Getter,Setter, equalsto something, string, value
 */
export class Identifier<T> {
    constructor(private value: T) {
        this.value = value;
    }
    toString() {
        return String(this.value);
    }
    equals(id?: Identifier<T>): boolean {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }
    toValue(): T {
        return this.value;
    }
}
