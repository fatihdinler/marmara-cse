#include "stdio.h";
#include "stdlib.h";

struct n {
    int data;
    struct n *next;
};

typedef struct n node;


int main() {

    node *root;
    node *cursor;

    root = (node*) malloc(sizeof(node));
    root -> data = 10;
    
    root -> next = (node*) malloc(sizeof(node));

    root->next -> data = 20;
    root->next->next = NULL;

    cursor = root;

    for(int i = 1 ; i <= 2 ; i++) {
        printf("cursor->data : %d\n", cursor->data);
        cursor = cursor->next;
    }
    

}