export interface ApiInvoiceDetails {
    errorCode:   string;
    resultFound: string;
    data:        InvDetails[];
}

export interface InvDetails {
    ItemCode:               string;
    ItemName:               string;
    Quantity:               string;
    Price:                  string;
    DiscPrcnt:              string;
    LineTotal:              string;
    BillDisAmt:             number;
    LineTotalAfterBillDisc: string;
}
