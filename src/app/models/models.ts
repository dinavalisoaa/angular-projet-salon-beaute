
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

export interface Employee {
    _id?:string,
    name?: String,
    firstname?: String,
    dateOfBirth?: Date,
    sex?:Sex,
    address?: String,
    phoneNumber?: String,
    email?: String,
    profile?: String,
    password?: String,
    schedule?: scheduleForm,
    status?: Number
}
export interface scheduleForm{
    entry?: Date,
    exit?: Date
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
