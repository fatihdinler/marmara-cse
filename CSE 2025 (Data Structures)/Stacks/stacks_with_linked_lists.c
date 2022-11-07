#include "stdio.h"
#include "stdlib.h"

/** Linked list içerisinde bulunan her bir eleman bir struct'tır. */
struct node {
    int data;
    struct node *next;
};

/** List'e en son giren eleman'ı point edecek olan top pointer'ı. */
struct node *top = NULL;

/** isEmpty function */
int isEmpty() {
    if(top == NULL) {
        return -1;
    }
}

void showTop() {
    if(isEmpty() == -1) {
        printf("Top is pointing null.\n");
    }
    else {
        printf("Top of stack is -> %d\n" , top -> data);
    }
}

/** Pop function. */
void pop() {
    if(top == NULL) {
        printf("Stack is empty.\n");
    }
    else {
        struct node *temp = top;
        top = top -> next;
        free(temp);
    }
}


/** Push function. */
int push(int data) {
    /** İlk kontrol stack'in boş olup olmadığını kontrol etmektir. Top === NULL ise stack boştur. */
    if(isEmpty() == -1) {
        struct node *new = (struct node*) malloc(sizeof(struct node));
        new -> data = data;
        new -> next = NULL;
        top = new;
    }
    else {
        struct node *new = (struct node*)malloc(sizeof(struct node));
        new -> data = data;
        new -> next = top;
        top = new;
    }
    return 1;
}

/** Display function */ 
void displayStack () {
    if(top == NULL) {
        puts("There is no node in stack.");
        return;
    }

    struct node *cursor = top;
    while(cursor != NULL) {
        printf("%d\n" , cursor -> data);
        cursor = cursor -> next;
    }
}


int main() {

    for(int i = 0 ; i < 10 ; i++) {
        push(i * 10);
    }
    displayStack();
    showTop();

    pop();
    pop();
    pop();

    displayStack();
    showTop();
    

}