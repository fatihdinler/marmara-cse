#include "stdio.h"
#include "stdlib.h"

struct node {
    int data;
    struct node *next;
};

typedef struct node node;


int main() {
    
    int counter = 0;

    node *root;
    node *cursor;

    root = (node*) malloc(sizeof(node));
    root -> data = 1;

    root -> next = (node*) malloc(sizeof(node));
    root -> next -> data = 2;

    root -> next -> next = (node*) malloc(sizeof(node));
    root -> next -> next -> data = 3;
    root -> next -> next -> next = NULL;

    cursor = root;

    while(cursor != NULL) {
        counter++;
        printf("The %d. element is %d\n", counter, cursor -> data);
        cursor = cursor -> next;
    }

}