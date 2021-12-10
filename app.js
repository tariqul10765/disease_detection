const express = require("express");
const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv').config()


const port = process.env.PORT;
// Cross Unblocked File..
const cors = require('cors');


/**
 * MAIN APP CONFIG
 */

const app = express();
app.use(express.json());
app.use(cors())

/**
 * MAIN BASE GET PATH
 */
app.get('/', (req, res) => {
    res.send('<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by Tariqul</p></div>')
})
app.post('/', (req, res) => {
    const symptoms = req.body.symptoms;
    const disease = spawn('python', ["./disease_prediction.py", symptoms]);

    disease.stdout.on('data', function (data) {
        result += data.toString();
        const diseaseSplit = result.split(`1.0\r\n41\r\n`)[1];

        res.json({
            message: 'Disease get successfully',
            data: diseaseSplit
        })
    });
    disease.on('close', function (code) {
        // console.log("RESULT: ", result);
    });
    res.json({
        message: 'Disease get successfully',
        data: symptoms
    })
})

app.post('/disease', (req, res) => {
    try {
        let result = '';
        const symptoms = req.body.symptoms;
        const disease = spawn('python', ["./disease_prediction.py", symptoms]);

        disease.stdout.on('data', function (data) {
            result += data.toString();
            const diseaseSplit = result.split(`1.0\r\n41\r\n`)[1];

            res.json({
                message: 'Disease get successfully',
                data: diseaseSplit
            })
        });
        disease.on('close', function (code) {
            // console.log("RESULT: ", result);
        });


    } catch (err) {
        res.json({
            message: 'Error occure in disease',
        })
    }
})

app.listen(port, () => console.log(`Server is running at port:${port}`));
