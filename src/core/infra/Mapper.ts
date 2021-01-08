export abstract class Mapper<DomanTestingNewObject> {
    // @ts-ignore
    public static toDomain(raw: any): T;
    // @ts-ignore
    public static toDTO(t: T): DTO;
    // @ts-ignore
    public static toPersistence(t: T): any;
}
