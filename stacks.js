const slowAdd = (a, b) => {
    // takes more than 2 seconds to finish
    for (let i = 0; i < 9999999999; i++) { }
    console.log(a + b);
}

const asyncAdd = (a, b) => {
    setTimeout(() => console.log(a + b), 2000);
}

asyncAdd(1, 1);
asyncAdd(2, 2);

slowAdd(3, 3);
slowAdd(4, 4);