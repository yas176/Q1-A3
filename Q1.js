// install express
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());


// Middleware to parse URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Function A: findSummation
function findSummation(N = 1) {
    if (isNaN(N) || N <= 0) return false;
    return (N * (N + 1)) / 2;
}

// Function B: uppercaseFirstandLast
function uppercaseFirstandLast(inputString) {
    if (typeof inputString !== 'string') {
        return false;
    }
    return inputString.split(' ').map(word => {
        if (word.length > 1) {
            return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
        }
        return word.toUpperCase();
    }).join(' ');
}

// Function C: findAverageAndMedian
function findAverageAndMedian(numbers) {
    if (!Array.isArray(numbers) || numbers.some(isNaN)) {
        return false;
    }
    const sortedNumbers = numbers.slice().sort((a, b) => a - b);
    const length = sortedNumbers.length;
    const sum = sortedNumbers.reduce((acc, num) => acc + num, 0);
    const average = sum / length;
    let median;
    if (length % 2 === 0) {
        median = (sortedNumbers[length / 2 - 1] + sortedNumbers[length / 2]) / 2;
    } else {
        median = sortedNumbers[Math.floor(length / 2)];
    }
    return { average, median };
}

// Function D: find4Digits
function find4Digits(numberString) {
    if (typeof numberString !== 'string') {
        return false;
    }
    const numbers = numberString.split(' ').filter(num => num.length === 4 && /^\d{4}$/.test(num));
    return numbers.length > 0 ? numbers[0] : false;
}

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Q1.html');
});

// Routes for the functions
app.post('/findSummation', (req, res) => {
    const N = parseInt(req.body.N, 10);
    res.send({ result: findSummation(N) });
});

app.post('/uppercaseFirstandLast', (req, res) => {
    const inputString = req.body.inputString;
    res.send({ result: uppercaseFirstandLast(inputString) });
});

app.post('/findAverageAndMedian', (req, res) => {
    const numbers = req.body.numbers.split(',').map(Number);
    res.send({ result: findAverageAndMedian(numbers) });
});

app.post('/find4Digits', (req, res) => {
    const numberString = req.body.numberString;
    res.send({ result: find4Digits(numberString) });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
