
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


FILE* fOut;

typedef struct Node
{
    int key;
    struct Node *left;
	struct Node *right;
}Node ;

Node* newNode(int key);
Node *leftRotate(Node* x);
Node *rightRotate(Node* x);
Node *splay(Node* root, int key);
Node* insert(Node* root, int k);
 
void preorder(Node *root);
//Node * bnsearch(Node* root, int key);
Node * search(Node* root, int key);

int main()
{
	fOut = fopen("output.txt","w");
	
	Node* root = NULL;
	char labelInputFile[100];
	char viewedInputFile[100];

	printf("Input file for label numbers: ");
	scanf("%s",labelInputFile);
	fprintf(fOut,"Input file for label numbers: %s\n",labelInputFile);
	
    FILE* fIn = fopen(labelInputFile, "r");
    if(!fIn){
    	printf("file not exist!\n");
	}
    
	int bufferLength = 255;
	char line[bufferLength];

	while(fgets(line, bufferLength, fIn)) { // read line by line, each line do
		int number = atoi(line);
		root = insert(root,number);
		printf("Tree: ");
		fprintf(fOut,"Tree: ");
		preorder(root);
		printf("\n");
		fprintf(fOut,"\n");
	}
	fclose(fIn);
	
	printf("\n");
	fprintf(fOut,"\n");
	
	
	printf("Input file for viewed products: ");
	scanf("%s",viewedInputFile);
	fprintf(fOut,"Input file for viewed products: %s\n",viewedInputFile);
	
    fIn = fopen(viewedInputFile, "r");
    if(!fIn){
    	printf("file not exist!\n");
	}
	while(fgets(line, bufferLength, fIn)) { // read line by line, each line do
		int number = atoi(line);
		Node* tmp = search(root,number);
		if(tmp == NULL){
			printf("Node %d does not exist! \n",number);
			fprintf(fOut,"Node %d does not exist! \n",number);
		}else{
			root = splay(root,number);
			printf("Tree: ");
			fprintf(fOut,"Tree: ");
			preorder(root);
			printf("\n");
			fprintf(fOut,"\n");
		}
	}
	fclose(fIn);
	
	fclose(fOut);
    return 0;
}

void preorder(Node *root)
{
	if(root == NULL){
		return;
	}

    printf("%d ", root->key);
    fprintf(fOut,"%d ", root->key);
    preorder(root->left);
    preorder(root->right);

}

//Node * search(Node* root, int key){
//	Node* r = root;
//	Node* tmp = bnsearch(root,key);
//	if(tmp == NULL){
//		return NULL;
//	}else{
//		return splay(root,key);
//	}
//}

Node* search(Node* root, int key)
{
	if (root == NULL){
		return NULL;
	}
    if (root->key == key){
		return root;
	}    
    if (root->key < key){
    	return search(root->right, key);
	}
    return search(root->left, key);
}

Node* newNode(int key)
{
    Node* node = (struct Node*)malloc(sizeof(struct Node));
    node->key   = key;
    node->left  = NULL;
	node->right  = NULL;
    return node;
}
 

Node *leftRotate(Node* x)
{
    Node *y = x->right;
    x->right = y->left;
    y->left = x;
    return y;
}

Node *rightRotate(Node* x)
{
    Node *y = x->left;
    x->left = y->right;
    y->right = x;
    return y;
}

Node *splay(Node* root, int key)
{
    if (root == NULL ){
    	return root;	
	}
	if(root->key == key){
		return root;
	}

    if (root->key > key)
    {
        if (root->left == NULL){
        
        	return root;
		} 
 
        if (root->left->key > key)
        {
            root->left->left = splay(root->left->left, key);
            root = rightRotate(root);
        }
        else if (root->left->key < key) 
        {
            root->left->right = splay(root->left->right, key);
            if (root->left->right != NULL){
            	root->left = leftRotate(root->left);
			}
               
        }
 		
 		if(root->left == NULL){
 			return root;
		}else{
			return rightRotate(root);
		}
		
    }
    else 
    {
        if (root->right == NULL){
        	return root;
		}
 
        if (root->right->key > key)
        {
            root->right->left = splay(root->right->left, key);
            if (root->right->left != NULL){
            	root->right = rightRotate(root->right);
			}
        }
        else if (root->right->key < key)
        {
            root->right->right = splay(root->right->right, key);
            root = leftRotate(root);
        }
 
		if(root->right == NULL){
 			return root;
		}else{
			return leftRotate(root);
		}
    }
}
 

Node* insert(Node* root, int k)
{

    if (root == NULL){
    	return newNode(k);
	}
 
    root = splay(root, k);
 

    if (root->key == k){
    	return root;
	}
 

    Node* newnode  = newNode(k);
 

    if (root->key > k)
    {
        newnode->right = root;
        newnode->left = root->left;
        root->left = NULL;
    }
    else
    {
        newnode->left = root;
        newnode->right = root->right;
        root->right = NULL;
    }
 
    return newnode; 
}
 


