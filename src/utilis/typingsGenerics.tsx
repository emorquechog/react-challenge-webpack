export type ReadonlyNullable<T> = {
    readonly [K in keyof T]: T[K]
}
