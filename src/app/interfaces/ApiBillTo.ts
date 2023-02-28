export interface ApiBillTo {
    errorCode:   string;
    resultFound: string;
    data:        BillTo[];
}

export interface BillTo {
    BillToName:    string;
    BillToCode:    string;
    BillToAddress: string;
    BillToTaxID:   string;
    BillToBranch:  string;
}
