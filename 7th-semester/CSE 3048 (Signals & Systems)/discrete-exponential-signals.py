import matplotlib as plt
import numpy as np

n = np.arange(0,0.20,1); 
X = np.exp(-0.1*n);
plt.stem(X)
plt.xlabel('n')
plt.ylabel('X[n]')
plt.show()