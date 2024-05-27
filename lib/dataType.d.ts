export interface DynamicKeyInterface {
    [key: string]: string | number | boolean;
}
export interface ActionMenus {
    name: string;
    redirectUrl: string;
    isConfirm: boolean;
    fieldName?: string;
    iconUrl?: string;
}
export interface ItemTitles {
    key: string;
    value: string;
    isSearch: boolean;
}
export interface PaginationItems {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
}
export interface FunctionEnable {
    pagination: boolean;
    sorting: boolean;
    searching: boolean;
}
