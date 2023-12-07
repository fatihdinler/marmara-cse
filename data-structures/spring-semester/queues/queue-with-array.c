#include "stdio.h"
#include "stdlib.h"

struct Queue {
    int size;
    int front;
    int rear;
    int *items;
};

void createQueue(struct Queue *q, int size) {
    q -> size = size;
    q -> front = -1;
    q -> rear = -1;
    q -> items = (int *) malloc(q -> size * sizeof(int));
}

void enqueue(struct Queue *q, int data) {
    if (q -> rear == q -> size -1) {
        printf("Queue is full ! \n");
    }
    else {
        q -> rear++;
        q -> items[q -> rear] = data; 
    }
}

int dequeue(struct Queue *q) {
    int fetchedData = -1;
    if (q -> rear == q -> front) {
        printf("Queue is empty ! \n");
    }
    else {
        q -> front++;
        fetchedData = q -> items[q -> front];
    }
    return fetchedData;
}

void display(struct Queue *q) {
    for (size_t i = q -> front + 1; i < q -> size; i++) {   
         printf("%d ", q -> items[i]);
    }
    printf("\n");
    
}

int main () {
    struct Queue q;
    createQueue(&q, 10);

    enqueue(&q, 10);
    enqueue(&q, 20);
    enqueue(&q, 30);
    enqueue(&q, 40);

    display(&q);

    dequeue(&q);
    display(&q);
}