let queue = {
    items: [],
    head: 0,
    tail: 0
}

const enqueue = (struct, data) => {
    struct.items[struct.tail] = data
    struct.tail++
}

const dequeue = (struct) => {
    const poppedItem = struct.items[struct.head]
    delete struct.items[struct.head]
    struct.head++
    return poppedItem
}

const showFront = (struct) => {
    return struct.items[struct.head]
}

const getLength = (struct) => {
    return struct.tail - struct.head
}

const isQueueEmpty = (struct) => {
    return (struct.head === struct.tail) ? true : false
}

const displayQueue = (struct) => {
    for(let i = struct.tail ; i < struct.head ; i++) {
        const item = struct.items[i]
        console.log(item)
    }
}

enqueue(queue, 10)
enqueue(queue, 20)
enqueue(queue, 30)
enqueue(queue, 40)
console.log(queue.items)

dequeue(queue)
console.log(queue.items)
