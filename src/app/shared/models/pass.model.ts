export interface Pass {
    passID?: string;
    order: number;
    name: string;
    priceNormal: number;
    priceDiscount: number;
    validityNumber: number;
    isGroupTraining: boolean;
    isPersonalTraining: boolean;
    isOnlyGym: boolean
}

export enum Validity {
    MONTHS = "MONTHS",
    ENTRIES = "ENTRIES"
}

export interface UserPass extends Pass {
    userID: string;
    boughtTime: any;
    validFrom: any;
    validTo: any;
    remainingEntries?: number;
}