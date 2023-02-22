export interface ApiInvoice {
    errorCode:   string;
    resultFound: string;
    data:        Invoice[];
}

export interface Invoice {
    DocType:       string;
    TaxDate:       string;
    FullTaxNumber: string;
    ShipToName:    string;
    DocTotal:      string;
}