const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const getHexadecimal = (inputDecimal) => {

    const HEX = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C","D","E","F"];

    let decimal = inputDecimal;
    let remainders = [];

    while(decimal / 16 > 0){

        remainders.push(decimal % 16);

        decimal = Math.floor(decimal / 16);
    }

    const hexadecimal = remainders
        .reverse()
        .map(remainder => HEX[remainder])
        .join("");

    return hexadecimal;

};

app.get('/converter/:decimal', (req, res) => {

    const decimal = req.params.decimal;

    if(!isNaN(decimal) && decimal > 0){

        const hexadecimal = getHexadecimal(decimal);

        res.status(200).send(hexadecimal);

    } else {

        res.status(400).send({ error: "Not a nuber"});

    }

});

app.listen(4001, () => console.log('Express server running on port 4001!'));