
export interface Service {
    name?: string,
    _id?: string,
    price?: number,
    duration?: number,
    commission?: number
    illustration?:string
}
export interface Expense {
    description?: string,
    _id?: string,
    amount?: number,
    date?: Date,
}

export interface Sex {
    type?: string

}

export interface Customer {
    name?: string,
    firstname?: string,
    dateOfBirth?: Date,
    sex?:Sex,
    address?: string,
    phoneNumber?: string,
    email?: string,
    profile?: string,
    password?: string

}

export interface Appointment {
    date?: Date,
    customer?:Customer,
    service?: Service[],
    status?: Number,
    isPaid?: Boolean
}
// export interface Representative {
//     name?: string;
//     image?: string;
// }

// export interface Customer {
//     id?: number;
//     name?: string;
//     country?: Country;
//     company?: string;
//     date?: string;
//     status?: string;
//     activity?: number;
//     representative?: Representative;
// }
