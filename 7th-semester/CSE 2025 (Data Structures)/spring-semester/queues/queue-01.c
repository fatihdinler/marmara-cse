#include <stdlib.h>
#include <stdio.h>

#define MAX_SIZE 100

typedef struct {
    int items[MAX_SIZE];
    int front;
    int rear;
} Queue;

void enqueue (Queue *q, int item) {
    if (q -> rear == MAX_SIZE - 1) {
        printf("Queue structure is full \n");
    }
    q -> items[(q -> rear)++] = item;
}

int dequeue (Queue *q) {
    if (q->front == q->rear) {
        printf("Queue is empty\n");
        return -1;
    }
    int dequeuedElement = q -> front;
    q -> items[q -> front--];
    printf("Queued element is = %d\n", dequeuedElement);
}

void display (Queue *q) {
    if (q -> front == q -> rear) {
        printf("The list is empty ! \n");
    }
    int size = (q -> rear) - (q -> front);
    for (size_t i = 0; i < size; i++) {
        printf("%d ", q ->items[i]);
    }
    printf("\n");
    
}

int main() {
    Queue q;
    q.front = -1;
    q.rear = -1;

    for (size_t i = 0; i < 10; i++) {
        enqueue(&q, i * 10);
    }

    display(&q);
}