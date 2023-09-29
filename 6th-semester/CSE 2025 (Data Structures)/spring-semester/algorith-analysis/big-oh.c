#include "stdio.h"

int main() {

    int i, j;
    int n = 5;

    for(i = 0; i <= n; i++) { // n + 1
        printf("Outer loop is executed %d times.\n", i);
        for(j = 0; j <=  n; j++) { // n + 1
            printf("Inner loop is executed %d times.\n", j);
        }
    }

}