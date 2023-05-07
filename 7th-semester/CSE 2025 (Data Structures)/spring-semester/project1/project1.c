#include "stdio.h"
#include "stdlib.h"

typedef struct installment{
	char insid[30];
	short ispaid;
	char installmentdate[11];
	float amount;
	struct installment *nextins;
}installment;

typedef struct loan{ 
	char loanid[30];
	char type[30];
	float totalamount;
	int totalinstallmentnum;
	char processdate[11];
	struct loan *nextloan;  
	installment *insptr;
}loan;

typedef struct customer{
	char name[20];
	char surname[30];
	int customerid;
	char customertype[20];
	struct customer *nextcust;
	double totaldebt;
	loan *loanptr;
}customer;

void readCustomers() {

}

int main(){
	customer *customers;
	int option = 1000;
	while (option != 0){
		printf("\n\n#############################################################\n");
		printf("1. read customers.\n");
		printf("2. print customers.\n");
		printf("3. read loans.\n");
		printf("4. print loans.\n");
		printf("5. create installments.\n");
		printf("6. print installments.\n");
		printf("7. read payments.\n");
		printf("8. find unpaid installments.\n");
		printf("9. delete completely paid installments.\n");
		printf("please select your option : \n");
		scanf("%d", &option);
		printf("#############################################################\n");
		
		switch (option){
			case 1:
				//readCustomers function call here
				break;
			case 2:
				//printCustomers function call here
				break;
			case 3:
				//readLoans function call here
				break;
			case 4:
				//printLoans function call here
				break;
			case 5:
				//createInstallments function call here
				break;
			case 6:
				//printInstallments function call here
				break;
			case 7:
				//readPayments function call here
				break;
			case 8:
				//findUnpaidInstallments function call here
				break;
			case 9:
				//DeletePaidInstallments function call here
				break;
			case 0:
				break;
			default :
				printf("invalid option\n");
		}
	}
	return 0;
}
