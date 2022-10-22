#include "stdio.h"
#include "stdlib.h"

int *array;
int size = 2;
int top;

void push(int element) {
    if(top >= size) {
        int *tempArray = (int*) malloc(sizeof(int) * 2 * size);
        for(int i = 0 ; i < top ; i++) {
            tempArray[i] = array[i];
        }
        array = tempArray;
        size *= 2;
    }
    array[top++] = element;
} 

int pop() {
    array[top--];
}

void print() {
    for(int i = 0 ; i < top ; i++) {
        printf("%d. block -->> %d\n" , i,  array[i]);
    }
    printf("\n");
}

int main() {
    array = (int*)malloc(sizeof(int) * size);
    for(int i = 1 ; i < 50 ; i++) {
        push(i);
    }
    print();
}