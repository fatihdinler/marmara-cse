#include "stdio.h";
#include "stdlib.h";

struct n {
    int data;
    struct n *next;
};

typedef struct n node;


int main() {

    node *starting_pointer;
    
    starting_pointer = (node*) malloc(sizeof(node));
    starting_pointer -> data = 1;
    starting_pointer -> next = NULL;

    printf("starting_pointer -> data = %d\n" , starting_pointer->data); // 1
    printf("starting_pointer -> next = %d\n" , starting_pointer->next); // 0, since NULL represents zero.

}