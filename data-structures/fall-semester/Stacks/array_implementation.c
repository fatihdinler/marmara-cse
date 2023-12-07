#include "stdio.h"
#include "stdlib.h"
#define size 5

int array[size];
int top = -1;

void push(int data) {
    if(top + 1 == size) {
        printf("STACK is full.\n");
    }
    else {
        top++;
        array[top] = data;
    }
}

void pop() {
    if(top == -1) {
        printf("STACK is empty.\n");
    }
    else {
        top--;
    }
}

int peek() {
    return array[top];
}

int printStack() {
    for(int i = 0 ; i < top + 1; i++) {
        printf("%d ", array[i]);
    }
    printf("--> TOP\n");
}

int main() {

        push(1);
        push(5);
        printStack();
        pop();
        push(77);
        push(3);
        printStack();
        push(-234324);
        printStack(); // 1 77 3 -234324 --> TOP


}
