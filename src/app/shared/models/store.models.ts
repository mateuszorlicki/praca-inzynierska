export interface Status {
    loading: boolean,
    error: boolean,
    success: boolean
}

export const EMPTY_STATUS: Status = {
    loading: false,
    error: false,
    success: false,
}

export const LOADING_STATUS: Status = {
    loading: true,
    error: false,
    success: false,
}

export const ERROR_STATUS: Status = {
    loading: false,
    error: true,
    success: false,
}

export const SUCCESS_STATUS: Status = {
    loading: false,
    error: false,
    success: true,
}