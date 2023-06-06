
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

typedef struct Installment
{
	char insid[30];
	short ispaid;
	char installmentdate[11];
	float amount;
	struct Installment *nextins;
} Installment;

typedef struct Loan
{
	char loanid[30];
	char type[30];
	float totalamount;
	int totalinstallmentnum;
	char processdate[11];
	struct Loan *nextloan;
	Installment *insptr;
} Loan;

typedef struct Customer
{
	char name[20];
	char surname[30];
	int customerid;
	char customertype[20];
	struct Customer *nextcust;
	double totaldebt;
	Loan *loanptr;
} Customer;

void customer_append(Customer **head_ref, char *name, char *surname, int customerid, char *customertype, double totaldebt);
void read_customers(Customer **head);
void printCustomers(Customer *head);
int customersSize(Customer *head);
Customer *getCustomer(Customer *head, char *name, char *surname);
void printLoans(Customer *head);
Loan *loan_append(Loan *head_ref, char *loanid, char *type, float totalamount, int totalinstallmentnum, char *processdate);
Installment *installment_append(Installment *head_ref, char *insid, char *installmentdate, float amount, short ispaid);
int compareDate(char *d1, char *d2);
void read_loans(Customer **head);
void createInstallments(Customer *head);
char *addMonth(char *date, int monthToAdd);
void printInstallments(Customer *head);
void read_payment(Customer **head);
Loan *getLoan(Customer *head, char *id);
void payALl(Loan *loan);
void payAt(Loan *loan, int at);
void findUnpaidInstallments(Customer *head);
void payDelay(Customer *head, char *date);
Installment *findPaidIns(Installment *head_ref);
Installment *DeleteInstallment(Installment *head_ref, Installment *deleteNode);
void deletePaidInstallments(Customer *head);

int main()
{
	Customer *customers = NULL;
	int option = 1000;

	while (option != 0)
	{
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

		switch (option)
		{
		case 1:
			read_customers(&customers);
			break;
		case 2:
			printCustomers(customers);
			break;
		case 3:
			read_loans(&customers);
			break;
		case 4:
			printLoans(customers);
			break;
		case 5:
			createInstallments(customers);
			break;
		case 6:
			printInstallments(customers);
			break;
		case 7:
			read_payment(&customers);
			break;
		case 8:
			findUnpaidInstallments(customers);
			break;
		case 9:
			deletePaidInstallments(customers);
			break;
		case 0:
			break;
		default:
			printf("invalid option\n");
		}
	}
	return 0;
}

void deletePaidInstallments(Customer *head)
{
	Customer *customer = head;
	while (customer != NULL)
	{

		Loan *loan = customer->loanptr;

		while (loan != NULL)
		{

			Installment *paidIns = findPaidIns(loan->insptr);
			while (paidIns != NULL)
			{
				loan->insptr = DeleteInstallment(loan->insptr, paidIns);
				paidIns = findPaidIns(loan->insptr);
			}

			loan = loan->nextloan;
		}
		customer = customer->nextcust;
	}
}

Installment *findPaidIns(Installment *head_ref)
{
	Installment *tmp = head_ref;
	while (tmp != NULL)
	{
		if (tmp->ispaid == 1)
		{
			return tmp;
		}
		tmp = tmp->nextins;
	}
	return NULL;
}

Installment *DeleteInstallment(Installment *head_ref, Installment *deleteNode)
{

	Installment *temp = head_ref, *prev;
	if (temp != NULL && temp == deleteNode)
	{
		head_ref = temp->nextins;
		free(temp);
		return head_ref;
	}

	while (temp != NULL && temp != deleteNode)
	{
		prev = temp;
		temp = temp->nextins;
	}
	if (temp == NULL)
		return NULL;
	prev->nextins = temp->nextins;
	free(temp);
	return head_ref;
}

void findUnpaidInstallments(Customer *head)
{
	char date[40];
	printf("Enter date: \n");
	scanf("%s", date);
	payDelay(head, date);

	Customer *customer = head;
	while (customer != NULL)
	{

		Loan *loan = customer->loanptr;
		float debt = 0;
		int delayInst = 0;

		while (loan != NULL)
		{
			Installment *inst = loan->insptr;

			while (inst != NULL)
			{

				if (inst->ispaid == 3)
				{
					debt += inst->amount;
					delayInst += 1;
				}

				inst = inst->nextins;
			}

			loan = loan->nextloan;
		}

		printf("%s %s : Debt %.2f Number Of Delayed Installments %d\n",
			   customer->name,
			   customer->surname,
			   debt,
			   delayInst);

		customer = customer->nextcust;
	}
}

void payDelay(Customer *head, char *date)
{
	Customer *customer = head;

	while (customer != NULL)
	{

		Loan *loan = customer->loanptr;
		while (loan != NULL)
		{
			Installment *inst = loan->insptr;

			while (inst != NULL)
			{

				if (inst->ispaid == 0 && compareDate(inst->installmentdate, date) < 0)
				{
					inst->ispaid = 3;
				}

				inst = inst->nextins;
			}

			loan = loan->nextloan;
		}
		customer = customer->nextcust;
	}
}

void read_payment(Customer **head)
{
	FILE *filePointer;
	int bufferLength = 255;
	char buffer[bufferLength];

	filePointer = fopen("payments.txt", "r");

	int totalCustomers = customersSize(*head);

	while (fgets(buffer, bufferLength, filePointer))
	{
		char *loanId = strtok(buffer, " ");
		char *total = strtok(NULL, " ");
		total[strlen(total) - 1] = '\0';

		Loan *loan = getLoan(*head, loanId);

		if (loan != NULL)
		{
			if (strcmp(total, "ALL") == 0)
			{
				payALl(loan);
			}
			else
			{
				int at = atoi(total);
				payAt(loan, at);
			}
		}
	}
	fclose(filePointer);
}

void payALl(Loan *loan)
{

	Installment *inst = loan->insptr;
	while (inst != NULL)
	{
		inst->ispaid = 1;
		inst = inst->nextins;
	}
}

void 

payAt(Loan *loan, int at)
{
	Installment *inst = loan->insptr;
	int i = 1;
	while (inst != NULL)
	{
		if (i == at)
		{
			inst->ispaid = 1;
			break;
		}
		inst = inst->nextins;
		i++;
	}
}

Loan *getLoan(Customer *head, char *id)
{
	Customer *customer = head;
	while (customer != NULL)
	{

		Loan *loan = customer->loanptr;
		while (loan != NULL)
		{
			if (strcmp(loan->loanid, id) == 0)
			{
				return loan;
			}
			loan = loan->nextloan;
		}
		customer = customer->nextcust;
	}
	return NULL;
}

void printInstallments(Customer *head)
{
	Customer *customer = head;
	printf("---------------------------------------------------------------------------------\n");
	while (customer != NULL)
	{
		printf("%d %s %s -  type: %s  -  total debt: %lf \n",
			   customer->customerid,
			   customer->name,
			   customer->surname,
			   customer->customertype,
			   customer->totaldebt);
		Loan *loan = customer->loanptr;
		while (loan != NULL)
		{
			printf("\t %s : %s - %.2f - %s - %d \n",
				   loan->loanid,
				   loan->type,
				   loan->totalamount,
				   loan->processdate,
				   loan->totalinstallmentnum);

			Installment *inst = loan->insptr;
			while (inst != NULL)
			{
				char isPaid[50];
				if (inst->ispaid == 0)
				{
					strcpy(isPaid, "To be Paid");
				}
				else if (inst->ispaid == 1)
				{
					strcpy(isPaid, "Paid");
				}
				else
				{
					strcpy(isPaid, "Delayed Payment");
				}

				printf("\t\t %s -> %s - %.2f - %s  \n",
					   inst->insid,
					   inst->installmentdate,
					   inst->amount,
					   isPaid);

				inst = inst->nextins;
			}

			loan = loan->nextloan;
		}

		printf("---------------------------------------------------------------------------------\n");

		customer = customer->nextcust;
	}
}

void createInstallments(Customer *head)
{

	Customer *customer = head;
	while (customer != NULL)
	{
		Loan *loan = customer->loanptr;

		while (loan != NULL)
		{

			float amount = loan->totalamount / loan->totalinstallmentnum;

			int i = 0;
			for (i = 0; i < loan->totalinstallmentnum; i++)
			{
				char insId[20];
				sprintf(insId, "%sI%d", loan->loanid, i + 1);
				char *date = addMonth(loan->processdate, i);

				loan->insptr = installment_append(loan->insptr, insId, date, amount, 0);
			}

			loan = loan->nextloan;
		}
		customer = customer->nextcust;
	}
}

char *addMonth(char *date, int monthToAdd)
{
	char dateBuffer[255];
	strcpy(dateBuffer, date);
	int day = atoi(strtok(dateBuffer, "/"));
	int month = atoi(strtok(NULL, "/"));
	int year = atoi(strtok(NULL, "/"));

	struct tm t;
	t.tm_sec = 0;
	t.tm_min = 0;
	t.tm_hour = 0;
	t.tm_mday = day;
	t.tm_mon = month;
	t.tm_year = year - 1900;
	t.tm_wday = 0;

	t.tm_mon += monthToAdd;

	mktime(&t);

	month = t.tm_mon;
	int ryear = 1900 + t.tm_year;
	if (month == 0)
	{
		month = 12;
		ryear = 1900 + t.tm_year - 1;
	}

	char resultDate[50];
	sprintf(resultDate, "%02d/%02d/%d", t.tm_mday, month, ryear);

	char *c = malloc(50);
	strcpy(c, resultDate);
	// printf("%s\n",resultDate);

	return c;
}

Installment *installment_append(Installment *head_ref, char *insid, char *installmentdate, float amount, short ispaid)
{
	Installment *new_node = (struct Installment *)malloc(sizeof(struct Installment));
	Installment *last = head_ref;

	new_node->amount = amount;
	new_node->ispaid = ispaid;
	strcpy(new_node->insid, insid);
	strcpy(new_node->installmentdate, installmentdate);

	new_node->nextins = NULL;

	if (head_ref == NULL)
	{
		head_ref = new_node;

		return head_ref;
	}

	while (last->nextins != NULL)
	{
		last = last->nextins;
	}
	last->nextins = new_node;
	return head_ref;
}

void read_loans(Customer **head)
{
	FILE *filePointer;
	int bufferLength = 255;
	char buffer[bufferLength];

	filePointer = fopen("loans.txt", "r");

	int totalCustomers = customersSize(*head);

	while (fgets(buffer, bufferLength, filePointer))
	{
		char *name = strtok(buffer, " ");
		char *surname = strtok(NULL, " ");
		char *loantype = strtok(NULL, " ");
		float totalamount = atof(strtok(NULL, " "));
		int totalinstallmentnum = atoi(strtok(NULL, " "));
		char *processdate = strtok(NULL, " ");
		processdate[strlen(processdate) - 1] = '\0';

		Customer *customer = getCustomer(*head, name, surname);
		if (customer != NULL)
		{
			customer->loanptr = loan_append(customer->loanptr, "0", loantype, totalamount, totalinstallmentnum, processdate);
		}
	}
	fclose(filePointer);

	Customer *customer = *head;
	while (customer != NULL)
	{
		Loan *loan = customer->loanptr;
		char loanId[50];
		int id = 1;
		float totalDebt = 0;
		while (loan != NULL)
		{
			sprintf(loanId, "%dL%d", customer->customerid, id);
			strcpy(loan->loanid, loanId);
			id++;
			totalDebt += loan->totalamount;
			loan = loan->nextloan;
		}
		customer->totaldebt = totalDebt;
		customer = customer->nextcust;
	}

	printf("read loan.txt successful!");
}

void printLoans(Customer *head)
{
	Customer *customer = head;
	printf("---------------------------------------------------------------------------------\n");
	while (customer != NULL)
	{
		printf("%d %s %s -  type: %s  -  total debt: %.2lf \n",
			   customer->customerid,
			   customer->name,
			   customer->surname,
			   customer->customertype,
			   customer->totaldebt);
		Loan *loan = customer->loanptr;
		while (loan != NULL)
		{
			printf("\t %s : %s - %f - %s - %d \n",
				   loan->loanid,
				   loan->type,
				   loan->totalamount,
				   loan->processdate,
				   loan->totalinstallmentnum);

			loan = loan->nextloan;
		}

		printf("---------------------------------------------------------------------------------\n");

		customer = customer->nextcust;
	}
}

Customer *getCustomer(Customer *head, char *name, char *surname)
{
	Customer *node = head;

	while (node != NULL)
	{
		// printf("%d\n",strcmp(node->name,name));

		if (strcmp(node->name, name) == 0 && strcmp(node->surname, surname) == 0)
		{
			return node;
		}

		node = node->nextcust;
	}
	return NULL;
}

int compareDate(char *d1, char *d2)
{
	char date1Buffer[255];
	char date2Buffer[255];
	strcpy(date1Buffer, d1);
	strcpy(date2Buffer, d2);

	int day1 = atoi(strtok(date1Buffer, "/"));
	int month1 = atoi(strtok(NULL, "/"));
	int year1 = atoi(strtok(NULL, "/"));

	int day2 = atoi(strtok(date2Buffer, "/"));
	int month2 = atoi(strtok(NULL, "/"));
	int year2 = atoi(strtok(NULL, "/"));

	if (year1 != year2)
	{
		return year1 - year2;
	}
	if (month1 != month2)
	{
		return month1 - month2;
	}
	return day1 - day2;
}

Loan *loan_append(Loan *head_ref, char *loanid, char *type, float totalamount, int totalinstallmentnum, char *processdate)
{

	Loan *new_node = (struct Loan *)malloc(sizeof(struct Loan));
	strcpy(new_node->loanid, loanid);
	strcpy(new_node->type, type);
	new_node->totalamount = totalamount;
	new_node->totalinstallmentnum = totalinstallmentnum;
	strcpy(new_node->processdate, processdate);

	new_node->insptr = NULL;
	new_node->nextloan = NULL;

	Loan *current;
	if (head_ref == NULL || compareDate(head_ref->processdate, new_node->processdate) >= 0)
	{
		new_node->nextloan = head_ref;
		head_ref = new_node;
	}
	else
	{
		current = head_ref;
		Loan *prev = current;
		while (current->nextloan != NULL && compareDate(current->processdate, new_node->processdate) < 0)
		{
			prev = current;
			current = current->nextloan;
		}

		if (prev == current || current->nextloan == NULL)
		{
			new_node->nextloan = current->nextloan;
			current->nextloan = new_node;
		}
		else
		{
			new_node->nextloan = current;
			prev->nextloan = new_node;
		}
	}

	return head_ref;
}

void customer_append(Customer **head_ref, char *name, char *surname, int customerid, char *customertype, double totaldebt)
{

	Customer *new_node = (struct Customer *)malloc(sizeof(struct Customer));
	Customer *last = *head_ref;

	new_node->customerid = customerid;
	new_node->totaldebt = totaldebt;
	strcpy(new_node->name, name);
	strcpy(new_node->surname, surname);
	strcpy(new_node->customertype, customertype);
	new_node->loanptr = NULL;
	new_node->nextcust = NULL;

	if (*head_ref == NULL)
	{
		*head_ref = new_node;

		return;
	}

	while (last->nextcust != NULL)
	{
		last = last->nextcust;
	}
	last->nextcust = new_node;
}

void read_customers(Customer **head)
{
	FILE *filePointer;
	int bufferLength = 255;
	char buffer[bufferLength];

	filePointer = fopen("customers.txt", "r");

	int id = 1;
	while (fgets(buffer, bufferLength, filePointer))
	{
		char *name = strtok(buffer, " ");
		char *surname = strtok(NULL, " ");
		char *customertype = strtok(NULL, " ");
		customertype[strlen(customertype) - 1] = '\0';

		customer_append(head, name, surname, id, customertype, 0);
		id++;
	}

	fclose(filePointer);
	printf("read customers.txt successful!");
}

void printCustomers(Customer *head)
{
	Customer *node = head;
	printf("---------------------------------------------------------------------------------\n");
	while (node != NULL)
	{
		printf("%d %s %s -  type: %s  -  total debt: %lf \n",
			   node->customerid,
			   node->name,
			   node->surname,
			   node->customertype,
			   node->totaldebt);
		printf("---------------------------------------------------------------------------------\n");

		node = node->nextcust;
	}
}

int customersSize(Customer *head)
{
	Customer *node = head;
	int count = 0;

	while (node != NULL)
	{
		count++;
		node = node->nextcust;
	}
	return count;
}
