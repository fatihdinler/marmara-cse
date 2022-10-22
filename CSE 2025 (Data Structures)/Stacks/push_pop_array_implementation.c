#include "stdio.h"

int array[2];
int size = 2;
int top = 0;

int pop() {
    return array[top--];
}

void push(int element) {
    array[top++] = element;
} 

void print() {
    for(int i = 0 ; i < top ; i++) {
        printf("%d " , array[i]);
    }
}

int main() {
    printf("Pushed -->>\n");
    push(10);
    push(20);
    print();

    printf("\nPopped -->>\n");
    pop();
    print();

}