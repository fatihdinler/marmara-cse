// Name : Fatih Erkam Dinler
// ID : 150119567
// Data Structures Project 2.

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct AVLNode {
    int data;
    int height;
    struct AVLNode *leftChild;
    struct AVLNode *rightChild;
} AVLNode;

char left_child_rotatin_status[] = "l";
char right_child_rotatin_status[] = "r";
int avlRotationNumber = 0;
int avlComparisonNumber = 0;
int avlTotalCost = 0;

int getMaxOfNode(int a, int b);
int getHeigthOfNode(AVLNode *node);
AVLNode *newAVLNode(int data);
AVLNode *rotate(AVLNode *rootNode, char status);
int getBalance(AVLNode *node);
AVLNode *insert(int data, AVLNode *node);
void printPreOrderAvlTree(AVLNode *node);

int main() {

    AVLNode *root = NULL;

    root = insert(44, root);
    root = insert(3, root);
    root = insert(12, root);
    root = insert(10, root);
    root = insert(6, root);
    
    printPreOrderAvlTree(root);

}

int getHeigthOfNode(AVLNode *node) {
    if (node == NULL) {
        return 0;
    }
    else {
        int heightOfNode = node->height;
        return heightOfNode;
    }
}

int getMaxOfNode(int a, int b) {
    avlComparisonNumber++;
    int returnValue = (a > b) ? a : b;
    return returnValue;
}

AVLNode *newAVLNode(int data) {

    AVLNode *newlyCreatedNode = (AVLNode *)malloc(sizeof(AVLNode));

    /** The data of the newly created node will be the 'data' which is in function parameter. */
    newlyCreatedNode->data = data;

    /** The left and rigth child of the newly created node is NULL. */
    newlyCreatedNode->leftChild = NULL;
    newlyCreatedNode->rightChild = NULL;

    // We need to set the heigth of the new created node as 1 since every node
    // that is last created is leaf node. Leaf node's heigth is 1.
    newlyCreatedNode->height = 1;
    return newlyCreatedNode;
}

AVLNode *rotate(AVLNode *rootNode, char status){

    switch (status) {

        case 'r':
            {
            // avlRotationNumber++;
            AVLNode *rootNodeToBeRotated = rootNode->leftChild;
            AVLNode *tempNode = rootNodeToBeRotated->rightChild;

            rootNodeToBeRotated->rightChild = rootNode;
            rootNode->leftChild = tempNode;

            int heigthOfRootNodeLeftChild = getHeigthOfNode(rootNode->leftChild);
            int heigthOfRootNodeRigthChild = getHeigthOfNode(rootNode -> rightChild);
            int heigthOfRootNode = heigthOfRootNodeLeftChild + heigthOfRootNodeRigthChild + 1;
            int heigthOfRootNodeToBeRotatedLeftChild = getHeigthOfNode(rootNodeToBeRotated->leftChild);
            int heigthOfRootNodeToBeRotatedRigthChild = getHeigthOfNode(rootNodeToBeRotated->rightChild);
            int heigthOfRootNodeToBeRotated = heigthOfRootNodeToBeRotatedLeftChild + heigthOfRootNodeToBeRotatedRigthChild + 1;

            rootNode -> height = heigthOfRootNode;
            rootNodeToBeRotated->height = heigthOfRootNodeToBeRotated;

            return rootNodeToBeRotated;
            }
        case 'l':
            {
            // avlRotationNumber++;
            AVLNode *rootNodeToBeRotated = rootNode->rightChild;
            AVLNode *tempNode = rootNodeToBeRotated->leftChild;

            rootNodeToBeRotated->leftChild = rootNode;
            rootNode->rightChild = tempNode;

            int heigthOfRootNodeLeftChild = getHeigthOfNode(rootNode->leftChild);
            int heigthOfRootNodeRightChild = getHeigthOfNode(rootNode->rightChild);
            int heigthOfRootNode = heigthOfRootNodeLeftChild + heigthOfRootNodeRightChild + 1;
            int heigthOfRootNodeToBeRotatedLeftChild = getHeigthOfNode(rootNodeToBeRotated->leftChild);
            int heigthOfRootNodeToBeRotatedRigthChild = getHeigthOfNode(rootNodeToBeRotated -> rightChild);
            int heigthOfRootNodeToBeRotated = heigthOfRootNodeToBeRotatedLeftChild + heigthOfRootNodeToBeRotatedRigthChild + 1;

            rootNode -> height = heigthOfRootNode;
            rootNodeToBeRotated -> height = heigthOfRootNodeToBeRotated;

            return rootNodeToBeRotated;
            }
    }
}

int getBalance(AVLNode *node) {

    if (node == NULL) {
        return 0;
    }
    else {  
        int leftChildHeigth = getHeigthOfNode(node -> leftChild);
        int rigthChildHeigth = getHeigthOfNode(node->rightChild);
        int heigthOfNode = leftChildHeigth - rigthChildHeigth;
        return heigthOfNode;
    }
    
}

AVLNode *insert(int data, AVLNode *node) {

    /* If the node is initially empty, then create a new node with the given data. */
    if (node == NULL) {
        return newAVLNode(data);
    }

    /** If node exists, then do the basic BST operations. */
    if(node) {
        if (data < node->data) {
            node->leftChild = insert(data , node->leftChild);
        }
        else if (data > node->data) {
            node->rightChild = insert(data , node->rightChild); 
        }
        else {
            return node;
        }
        
        int heigthOfNodeLeftChild = getHeigthOfNode(node->leftChild);
        int heigthofNodeRigthChild = getHeigthOfNode(node->rightChild);
        int heigthOfNode = heigthOfNodeLeftChild + heigthofNodeRigthChild + 1;
        node -> height = heigthOfNode;
    }

    int balanceFactorOfNode = getBalance(node);
    
    if(balanceFactorOfNode) {
        
        if (balanceFactorOfNode > 1 && data < node->leftChild->data) {
            avlRotationNumber++;
            return rotate(node, 'r');
        }

        if (balanceFactorOfNode < -1 && data > node->rightChild->data) {
            avlRotationNumber++;
            return rotate(node, 'l');
        }

        if (balanceFactorOfNode > 1 && data > node->leftChild->data) {
            avlRotationNumber += 2;
            node->leftChild = rotate(node->leftChild, 'l');
            return rotate(node, 'r');
        }

        if (balanceFactorOfNode < -1 && data < node->rightChild->data) {
            avlRotationNumber += 2;
            node->rightChild = rotate(node->rightChild, 'r');
            return rotate(node, 'l');
        }
    }

    return node;
}

void printPreOrderAvlTree(AVLNode *node) {
    if (node != NULL) {
        printf("%d ", node->data);
        printPreOrderAvlTree(node->leftChild);
        printPreOrderAvlTree(node->rightChild);
    }
}


    // root = insert(44, root);
    // root = insert(3, root);
    // root = insert(12, root);
    // printf("Preorder traversal of the constructed AVL tree is: \n");
    // printPreOrderAvlTree(root);
    // avlTotalCost = avlRotationNumber + avlComparisonNumber;
    // printf("\nAVL rotation number is : %dtu\n", avlTotalCost);