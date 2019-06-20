const asyncAdd = (a, b, cb = () => null) => {
    return new Promise((resolve, reject) => {
        if (typeof a !== 'number' || typeof b !== 'number') {
            reject('Invalid number');
            return cb('Invalid number');
        }
        const result = a + b;
        resolve(result);
        return cb(null, result);
    });
}

const callCallback = (a, b) => {
    asyncAdd(a, b, (err, result) => {
        if (err) {
            console.error(`callback error: ${err}`);
            return;
        }
        console.log(`callback result: ${result}`)
    })
}

const callAsync = async (a, b) => {
    try {
        const result = await asyncAdd(a, b);
        console.log(`async/await result: ${result}`)
    } catch (err) {
        console.error(`async/await error: ${err}`);
    }
}

callCallback(1, 1);
callAsync(2, 2);
callCallback('1', 1);
callAsync(2, '2');