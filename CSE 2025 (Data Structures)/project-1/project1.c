#include "stdio.h"
#include "math.h"
#include "stdlib.h"

struct node {
    int data;
    struct node *nextPointer;
};

typedef struct node node;
node *startingPointer;

int calculateNumberOfDigitsOfProduct(long long int num1, long long int num2, long long int base);
void createLinkedList(int length);

int main() {
    
    int number1 = 698;
    int number2 = 600;
    int lengthOfProduct = calculateNumberOfDigitsOfProduct(number1, number2, 10);

    /** We created a linked list based on the # of digits of multiplication. */
    createLinkedList(lengthOfProduct);

}

/** We can calculate the number of digits of a multiplication. */
int calculateNumberOfDigitsOfProduct(long long int num1, long long int num2, long long int base){   
    long long int number = num1 * num2;
    number = ceil(number);
    return log2(number) / log2(base) + 1;
}

void createLinkedList(int length) {
    node *cursor = (node *) malloc(sizeof(node));
    startingPointer = cursor;
    
    for(int i = 1 ; i <= length ; i++) {
        cursor -> nextPointer = (node*)malloc(sizeof(node));
        cursor = cursor -> nextPointer;
        cursor -> nextPointer = NULL;
    }
    printf("\n\n%d", startingPointer -> data);
}

