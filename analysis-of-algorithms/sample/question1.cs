function f(n,m)
if (n <= m) printline(<<Take it easy>>)
else 
  for i = 1 to m
    return f(n/2, m*2)