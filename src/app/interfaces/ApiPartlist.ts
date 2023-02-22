export interface ApiPartlist {
    code:        number;
    message:     string;
    resultFound: number;
    data:        Partlist[];
}

export interface Partlist {
    id:          number;
    Brand:       string;
    ItemCode:    string;
    ItemCodeNew: string;
    ItemName:    string;
    Model:       string;
    RetailPrice: number;
}


export interface TablePartlist {
    Brand:       string;
    ItemCode:    string;
    ItemCodeNew: string;
    ItemName:    string;
    Model:       string;
    RetailPrice: number;
}