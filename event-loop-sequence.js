// Demo de asincronía (setTimeout)
function firstTask() {
    console.log("First task started");
}

function asyncTask() {
    setTimeout(() => {
        console.log("Asynchronous task completed");
    }, 10000);
}

function asyncTaskLongLongTask() {
    setTimeout(() => {
        console.log("Long asynchronous task completed");
    }, 2000);
}

function secondTask() {
    console.log("Second task started");
}

asyncTaskLongLongTask();
firstTask();
asyncTask();
secondTask();