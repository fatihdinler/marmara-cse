#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME 20

struct installment {
    char insid[30];
    short ispaid;
    char installmentdate[11];
    float amount;
    struct installment *nextins;
};

struct loan {
    char loanid[30];
    char type[30];
    float totalamount;
    int totalinstallmentnum;
    char processdate[11];
    struct loan *nextloan;
    struct installment *insptr;
};

struct customer {
    char name[20];
    char surname[30];
    int customerid;
    char customertype[20];
    struct customer *nextcust;
    double totaldebt;
    struct loan *loanptr;
};

struct customer *customers = NULL;

void readCustomers(char *filename, struct customer **customersHead) {
     FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("Error: Could not open %s\n", filename);
        exit(1);
    }

    // Read each line of the file and create a new customer struct for each line
    char name[20], surname[30], customertype[20];
    while (fscanf(file, "%s %s %s", name, surname, customertype) == 3) {
        // Create a new customer struct and initialize its values
        struct customer *newCustomer = malloc(sizeof(struct customer));
        strcpy(newCustomer->name, name);
        strcpy(newCustomer->surname, surname);
        newCustomer->customerid = 0; // Will be assigned later
        strcpy(newCustomer->customertype, customertype);
        newCustomer->nextcust = NULL;
        newCustomer->totaldebt = 0;
        newCustomer->loanptr = NULL;

        // Insert the new customer at the end of the linked list
        if (*customersHead == NULL) {
            // List is empty, make the new customer the head
            *customersHead = newCustomer;
        } else {
            // Traverse the list to find the last node
            struct customer *current = *customersHead;
            while (current->nextcust != NULL) {
				printf("%s", current -> name);
                current = current->nextcust;
            }

            // Insert the new customer at the end
            current->nextcust = newCustomer;
        }
    }

    // Close the file
    fclose(file);
}

void printCustomers() {
    // code to traverse the customers linked list and print customer information
}

void readLoans() {
    // code to read loans from file and create a linked list for each customer
}

void printLoans() {
    // code to traverse the customers linked list and loans linked list for each customer, and print loan information
}

void readInstallments() {
    // code to read installments from file and create a linked list for each loan
}

void printInstallments() {
    // code to traverse the customers linked list and loans linked list for each customer, and installments linked list for each loan, and print installment information
}

void addCustomer() {
    // code to add a new customer to the linked list
}

void addLoan() {
    // code to add a new loan to a customer's linked list
}

void makePayment() {
    // code to mark an installment as paid and update the total debt of the customer and the remaining amount of the loan
}

void menu() {
    int choice = 1;
    while (choice != 0) {
        printf("1- Read customer data from file\n");
        printf("2- Print customer data\n");
        printf("3- Read loan data from file\n");
        printf("4- Print loan data\n");
        printf("5- Read installment data from file\n");
        printf("6- Print installment data\n");
        printf("7- Add a new customer\n");
        printf("8- Add a new loan\n");
        printf("9- Make a payment\n");
        printf("0- Exit\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                readCustomers("loans.txt", NULL);
                break;
            case 2:
                printCustomers();
                break;
            case 3:
                readLoans();
                break;
            case 4:
                printLoans();
                break;
            case 5:
                readInstallments();
                break;
            case 6:
                printInstallments();
                break;
            case 7:
                addCustomer();
                break;
            case 8:
                addLoan();
                break;
            case 9:
                makePayment();
                break;
            case 0:
                printf("Exiting...\n");
                break;
            default:
                printf("Invalid choice. Try again.\n");
        }
    }
}

int main() {
    menu();
    return 0;
}
