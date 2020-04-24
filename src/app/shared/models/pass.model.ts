export interface Pass {
    order: number;
    name: string;
    priceNormal: number;
    priceDiscount: number;
    validity: Validity
    validityValue: number;
}

export enum Validity {
    MONTHS = "MONTHS",
    ENTRIES = "ENTRIES"
}

export interface EntriesPass extends Pass {
    ownerUid: string;
    boughtTime: Date;
    remainingEntries: number;
}

export interface MonthsPass extends Pass {
    ownerUid: string;
    boughtTime: Date;
    validFrom: number;
    validTo: number;
}