#include "stdio.h"

int main() {
  // The code that i write in the PS-LAB
  // int i;
  // int s2Register;

  // for (i = 10; i > 0; i--) {
  //   int temp;
  //   if (i > 0) {
  //     temp = 1;
  //   } else {
  //     temp = 0;
  //   }

  //   if (temp == 0)
  //     break;
  //   else
  //     s2Register += 2;
  // }

  // printf("%d\n", s2Register);

  // The code that the instructor wrote in the PS-LAB
  int i = 10;
  int s2Register;

  do {
    s2Register += 2;
    i--;
  } while (i > 0);

  printf("%d\n", s2Register);
}