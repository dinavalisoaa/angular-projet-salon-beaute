import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Expense } from 'src/app/models/models';
import { ExpenseService } from 'src/app/service/expense/expense.service';

@Component({
    templateUrl: './expense.component.html',
    providers: [MessageService],
})
export class ExpenseComponent implements OnInit {
    expenseDialog: boolean = false;

    filtreDialog: boolean = false;

    deleteExpenseDialog: boolean = false;

    deleteExpensesDialog: boolean = false;

    expenses: Expense[] = [];

    expense: Expense = {};

    selectedExpenses: Expense[] = [];

    submitted: boolean = false;

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private expenseExpense: ExpenseService,
        private messageExpense: MessageService
    ) {}

    ngOnInit() {
        this.fetchList('');

        // this.expenseExpense.getExpenses().then(data => );
        // console.log(this.expenses)
    }
    myUploader(event: any, expense?: any) {
        console.log('onUpload() START');

        for (let file of event.files) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                expense.illustration = reader.result;
            };
            console.log('FILE TO BE UPLOADED: ', file);
            //   this.uploadedFiles.push(file);
        }
        // this.expense.illustration=
        this.messageExpense.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: '',
        });
    }
    openNew() {
        this.expense = {};
        this.submitted = false;
        this.expenseDialog = true;
    }

    deleteSelectedExpenses() {
        this.deleteExpensesDialog = true;
    }

    editExpense(expense: Expense) {
        this.expense = { ...expense };
        this.expenseDialog = true;
    }

    deleteExpense(expense: Expense) {
        this.deleteExpenseDialog = true;
        this.expense = { ...expense };
    }

    confirmDeleteSelected() {
        this.deleteExpensesDialog = false;
        this.expenses = this.expenses.filter(
            (val) => !this.selectedExpenses.includes(val)
        );
        this.messageExpense.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Expenses Deleted',
            life: 3000,
        });
        this.selectedExpenses = [];
    }

    confirmDelete() {
        this.deleteExpenseDialog = false;
        this.expenses = this.expenses.filter(
            (val) => val._id !== this.expense._id
        );
        this.messageExpense.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Expense Deleted',
            life: 3000,
        });
        this.expense = {};
    }

    hideDialog() {
        this.expenseDialog = false;
        this.submitted = false;
        this.filtreDialog = false;
    }

    showDialogFilter() {
        this.filtreDialog = true;
    }
    fetchList(query: string) {
        this.expenseExpense.getExpense(query, (res) => {
            this.expenses = res;
        });
    }
    search() {
        var query: any = '?';
        const data: Expense = {};
        if (this.expense.amount) {
            query += '&amount=' + this.expense.amount;
        }
        if (this.expense.date) {
            query += '&date=' + this.expense.date;
        }
        if (this.expense.description) {
            query += '&description=' + this.expense.description;
        }
        console.log(query);
        this.fetchList(query);
        this.filtreDialog = false;
    }
    resetFilter() {
        this.expense = {};
    }
    saveExpense() {
        const date = this.expense.date;
        const description = this.expense.description;
        const amount = this.expense.amount;
        const data: Expense = {
            description,
            amount,
            date,
        };

        if (this.expense._id == undefined) {
            this.submitted = true;
            console.log(data);
            this.expenseExpense.saveExpense(data, () => {
                this.messageExpense.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Expense Created',
                    life: 3000,
                });
                this.fetchList('');
            });
        } else {
            this.expenseExpense.updateExpense(data, this.expense._id, () => {
                this.messageExpense.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Expense Updated',
                    life: 3000,
                });
                this.fetchList('');
            });
        }
        this.expenseDialog = false;
        this.expense = {};
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.expenses.length; i++) {
            if (this.expenses[i]._id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal(
            (event.target as HTMLInputElement).value,
            'contains'
        );
    }
}
