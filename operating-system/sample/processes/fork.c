#include "stdio.h"
#include "stdlib.h"
#include "unistd.h"

int main() {
  pid_t pid;
  pid = fork();

  if (pid > 0) {
    wait(NULL);
    printf("my pid is %d and my parent pid is %d\n", pid, getpid());
  } else if (pid == 0) {
    printf("my pid is %d and my parent pid is %d\n", pid, getpid());
  } else {
    printf("Error");
  }
}