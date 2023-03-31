
export function updateCompletedCount(complete, count, setCount) {
    if (complete === true) {
        console.log("completed count +1")
        setCount(count +1)
    } else if (count > 0) {
        console.log('completed ount -1 psk count sup a 0')
        setCount(count-1)
    } else {
        console.log("completed count = count")
        setCount(count)
    }
}

export function adjustPendingTaskCount(complete, pendingTasks) {
    if (!complete) {
        pendingTasks = pendingTasks -1
    }
}

export function updatePendingCount(complete, count, setCount) {
    if (complete === false) {
        console.log("pending count +1")
        setCount(count +1)
    } else if (count > 0) {
        console.log('pending ount -1 psk count sup a 0')
        setCount(count-1)
    } else {
        console.log("pending count = count")
        setCount(count)
    }
}


// complete === false
// ? setCount(count + 1)
// : count > 0
// ? setCount(count - 1)
// : setCount(count);
