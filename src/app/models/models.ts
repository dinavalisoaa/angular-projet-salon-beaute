export interface Service {
    name?: string;
    _id?: string;
    price?: number;
    duration?: number;
    commission?: number;
    illustration?: string;
}
export interface Expense {
    description?: string;
    _id?: string;
    amount?: number;
    date?: Date;
}
export interface Account {
    date?: Date;
    description?: string;
    customer?: Customer;
    debit?: number;
    credit?: number;
}

export interface TokenObject {
    token?: string;
    role?: string;
    info?: any;
    userId?: string;
}
export interface Employee {
    _id?: string;
    name?: String;
    firstname?: String;
    dateOfBirth?: Date;
    sex?: Sex;
    address?: String;
    phoneNumber?: String;
    email?: String;
    profile?: String;
    password?: String;
    schedule?: scheduleForm;
    status?: Number;
}
export interface scheduleForm {
    entry?: Date;
    exit?: Date;
}
export interface Sex {
    type?: string;
}
export interface Manager {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
}
export interface Customer {
    _id?:string;
    name?: string;
    firstname?: string;
    // preference: {   service?: Service[], employee?: Employee[] };
    dateOfBirth?: Date;
    sex?: Sex;
    address?: string;
    phoneNumber?: string;
    email?: string;
    profile?: string;
    password?: string;
}

export interface Appointment {
    date?: Date;
    _id?: string;
    employee?:Employee|null;
    customer?: Customer;
    service?: Service[];
    status?: Number;
    isPaid?: Boolean;
}

