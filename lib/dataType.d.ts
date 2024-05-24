export interface DynamicKeyInterface {
    [key: string]: string | number | boolean;
}
export interface ActionMenus {
    name: string;
    ridirectUrl: string;
    isConfirm: boolean;
    fieldName?: string;
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
