#include "stdio.h"

/** For every call, it prints n times and call itself n + 1 times. */
void Test(int n) { // T(n)
    if(n > 0) {
        printf("call #%d\n", n); // 1 unit of time
        Test(n - 1); // T(n - 1) unit of time
    }
} // In total --> T(n) = T(n - 1) + 1

int main() {
    Test(5);
}