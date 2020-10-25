export interface ActionType<T = any> {
    type: T
}

export interface AnyAction extends ActionType {
    [restProps: string]: any
}
