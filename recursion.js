// node --stack-size=50 recursion.js
// Will fail because it will exceed maximum stack of 50KB
// Will work normally if --stack-size is increased or not defined

let count = 1;
const recursiveFunction = (limit) => {
    console.log(count);
    if (count >= limit) {
        return;
    }
    count++;
    return recursiveFunction(limit);
};

recursiveFunction(1000);