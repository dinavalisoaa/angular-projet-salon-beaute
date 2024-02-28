import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/demo/api/product';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ProductService } from 'src/app/demo/service/product.service';
import { EmployeeService } from 'src/app/service/employee/employee.service';
import { SexService } from 'src/app/service/sex/sex.service';
import { UtilService } from 'src/app/service/util-service/util.service';

@Component({
    templateUrl: './personnel.component.html',
    providers: [MessageService]
})
export class PersonnelComponent implements OnInit {

    selectedState: any;

    dropdownItems = [
        { name: 'Homme', code: 'Homme' },
        { name: 'Femme', code: 'Femme' }
    ];

    productDialog: boolean = false;

    deleteProductDialog: boolean = false;

    deleteProductsDialog: boolean = false;

    products: Product[] = [];

    product: Product = {};

    ///////////////////////////////////////////////////////////

    confirmationPassword: any;

    entry: any;

    exit: any;

    selectedSex: any;

    dropdownSexes: [] = [];

    personnelDialog: boolean = false;

    editPersonnelDialog: boolean = false;

    deletePersonnelDialog: boolean = false;

    personnels: [] = [];

    personnel: any = {};

    submitted: boolean = false;

    entryTimePart: any;

    exitTimePart: any;

    ///////////////////////////////////////////////////////////

    selectedProducts: Product[] = [];

    cols: any[] = [];

    statuses: any[] = [];

    rowsPerPageOptions = [5, 10, 20];

    constructor(
        private productService: ProductService,
        private messageService: MessageService,
        private employeeService: EmployeeService,
        private sexService: SexService,
        public utilService: UtilService
    ) { }

    ngOnInit() {
        this.productService.getProducts().then(data => this.products = data);

        ///////////////////////////////////////////////////////////
        this.fetchPersonnel();
        this.fetchSexes();

        this.cols = [
            { field: 'product', header: 'Product' },
            { field: 'price', header: 'Price' },
            { field: 'category', header: 'Category' },
            { field: 'rating', header: 'Reviews' },
            { field: 'inventoryStatus', header: 'Status' }
        ];

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];
    }

    ///////////////////////////////////////////////////////////

    checkStatus(status: number) {
        let res: { type: any, message: string } = { type: "success", message: "Actif" };
        if(status == 0){
            res = { type: "danger", message: "Passif" };
        }
        return res;
    }

    fetchPersonnel() {
        this.employeeService.getAllEmployees((res) => {
            this.personnels = res;
        });
    }

    fetchSexes() {
        this.sexService.getAllSexes((res) => {
            console.log({res});
            this.dropdownSexes = res;
        });
    }

    openNewDialog() {
        this.personnel = {};
        this.submitted = false;
        this.personnelDialog = true;
    }

    editPersonnel(personnel: any) {
        this.personnel = { ...personnel };
        this.entryTimePart = this.utilService.getTimeFromDate(this.personnel.schedule.entry);
        this.exitTimePart = this.utilService.getTimeFromDate(this.personnel.schedule.exit);
        this.editPersonnelDialog = true;
    }

    deletePersonnel(personnel: any) {
        this.deletePersonnelDialog = true;
        this.personnel = { ...personnel };
    }

    savePersonnel() {
        const name = this.personnel.name;
        const firstname = this.personnel.firstname;
        const dateOfBirth = this.personnel.dateOfBirth;
        const sex = this.selectedSex._id;
        const address = this.personnel.address;
        const phoneNumber = this.personnel.phoneNumber;
        const email = this.personnel.email;
        const password = this.personnel.password;
        const confirmationPassword = this.confirmationPassword;
        const schedule = { entry: this.entry, exit: this.exit };
        const data: any = {
            name,
            firstname,
            dateOfBirth,
            sex,
            address,
            phoneNumber,
            email,
            password,
            confirmationPassword,
            schedule
        };
        this.submitted = true;
        console.log(data);
        this.employeeService.savePersonnel(data, () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Ajout réussi',
                detail: 'Nouveau personnel enregistré',
                life: 5000,
            });
            this.fetchPersonnel();
        });
        this.personnelDialog = false;
        this.personnel = {};
    }

    editPersonnelInformation() {
        const id = this.personnel._id;
        const name = this.personnel.name;
        const firstname = this.personnel.firstname;
        const dateOfBirth = this.personnel.dateOfBirth;
        const sex = this.personnel.sex;
        const address = this.personnel.address;
        const phoneNumber = this.personnel.phoneNumber;
        const email = this.personnel.email;
        const password = this.personnel.password;
        const schedule = { entry: this.entryTimePart, exit: this.exitTimePart };
        const data: any = {
            name,
            firstname,
            dateOfBirth,
            sex,
            address,
            phoneNumber,
            email,
            password,
            schedule
        };
        this.employeeService.updatePersonnel(data, id, () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Informations modifiées',
                detail: 'Informations du personnel modifiées',
                life: 5000,
            });
            this.fetchPersonnel();
        });
        this.editPersonnelDialog = false;
        this.personnel = {};
    }

    confirmPersonnelDelete() {
        const id = this.personnel._id;
        this.employeeService.deactivatePersonnel(id, () => {
            this.messageService.add({
                severity: 'error',
                summary: 'Personnel supprimé',
                detail: 'Suppression d\'un personnel réussi',
                life: 5000,
            });
            this.fetchPersonnel();
        });
        this.deletePersonnelDialog = false;
        this.personnel = {};
    }

    restorePersonnel(personnel: any) {
        const id = personnel._id;
        this.employeeService.activatePersonnel(id, () => {
            this.messageService.add({
                severity: 'success',
                summary: 'Personnel restauré',
                detail: 'Restauration du personnel réussie',
                life: 5000,
            });
            this.fetchPersonnel();
        });
    }

    ///////////////////////////////////////////////////////////

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    deleteSelectedProducts() {
        this.deleteProductsDialog = true;
    }

    editProduct(product: Product) {
        this.product = { ...product };
        this.productDialog = true;
    }

    deleteProduct(product: Product) {
        this.deleteProductDialog = true;
        this.product = { ...product };
    }

    confirmDeleteSelected() {
        this.deleteProductsDialog = false;
        this.products = this.products.filter(val => !this.selectedProducts.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
        this.selectedProducts = [];
    }

    confirmDelete() {
        this.deleteProductDialog = false;
        this.products = this.products.filter(val => val.id !== this.product.id);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.product = {};
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    saveProduct() {
        this.submitted = true;

        if (this.product.name?.trim()) {
            if (this.product.id) {
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value : this.product.inventoryStatus;
                this.products[this.findIndexById(this.product.id)] = this.product;
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                this.product.id = this.createId();
                this.product.code = this.createId();
                this.product.image = 'product-placeholder.svg';
                // @ts-ignore
                this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
                this.products.push(this.product);
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            this.products = [...this.products];
            this.productDialog = false;
            this.product = {};
        }
    }

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products.length; i++) {
            if (this.products[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
