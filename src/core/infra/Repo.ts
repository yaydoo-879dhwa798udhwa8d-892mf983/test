/**
 * Repo Interface
 * @template T
 * Repo Utility
 */
export interface Repo<T> {
    exist(t: T): Promise<boolean>;
    save(t: T): Promise<T>;
}
