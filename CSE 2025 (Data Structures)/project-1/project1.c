#include "stdio.h"
#include "math.h"
#include "stdlib.h"

struct node {
    int data;
    struct node *nextPointer;
};

typedef struct node node;
node *startingPointerForProduct;
node *startingPointerForNumber1;
node *startingPointerForNumber2;

int calculateNumberOfDigitsOfProduct(long long int num1, long long int num2, long long int base);
int calculateTheNumberOfDigits(long long int number);
void createLinkedList(int length);

int main() {
    
    int number1 = 698;
    int number2 = 600;
    
    int lengthOfNumber1 = calculateTheNumberOfDigits(number1);
    int lengthOfNumber2 = calculateTheNumberOfDigits(number2);
    int lengthOfProduct = calculateNumberOfDigitsOfProduct(number1, number2, 10);

    printf("%d  %d", lengthOfNumber1, lengthOfNumber2);
    /** We created a linked list based on the # of digits of multiplication. */
    createLinkedList(lengthOfProduct);


}

/** We can calculate the number of digits of a multiplication. */
int calculateNumberOfDigitsOfProduct(long long int num1, long long int num2, long long int base){   
    long long int number = num1 * num2;
    number = ceil(number);
    return log2(number) / log2(base) + 1;
}

int calculateTheNumberOfDigits(long long int number) {
    int noOfDigits = 0;
    while(number != 0) {
        number /= 10;
        noOfDigits++;
    }
    return noOfDigits;
}

void createLinkedList(int length) {
    node *cursor = (node *) malloc(sizeof(node));
    startingPointerForProduct = cursor;
    
    for(int i = 1 ; i <= length ; i++) {
        cursor -> nextPointer = (node*)malloc(sizeof(node));
        cursor = cursor -> nextPointer;
        cursor -> nextPointer = NULL;
    }
}

