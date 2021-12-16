const express = require("express");
const { spawn } = require('child_process');
const path = require('path');
const dotenv = require('dotenv').config()


const port = process.env.PORT;
// Cross Unblocked File..
const cors = require('cors');
const { json } = require("express/lib/response");


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
    res.send('<div style="width: 100%; height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center"><h1 style="color: blueviolet">API RUNNING...</h1><p style="color: lightcoral">Powered by XYZ</p></div>')
})

app.post('/disease', (req, res) => {
    try {
        console.log(req.body)
        let result = '';
        const symptoms = req.body;
        const disease = spawn('python', ["./disease_prediction.py", symptoms]);

        disease.stdout.on('data', function (data) {
            result += data.toString();
            result = JSON.parse(result);
            // result = '{"canApprove": true,"hasDisplayed": false}';
            console.log(result);
            // console.log(result.canApprove);
            // resultInJSON = (JSON.parse(result));
            // console.log(JSON.parse(result).name)
            // const diseaseName = result.split(`1.0\r\n41\r\n`)[1];
            // const diseaseName = result['name'];
            // const accuracy = result['accuracy'];
            // console.log('accuracy', accuracy);

            res.json({
                success: true,
                message: 'Disease get successfully',
                data: result
            })
        });
        // disease.stderr.on('data', (data) => {
        //     result += data.toString();
        //     const diseaseSplit = result.split(`1.0\r\n41\r\n`)[1];
        //     res.json({
        //         message: 'Error occure',
        //         data: result
        //     })
        // });
        disease.on('close', function (code) {
            
        });


    } catch (err) {
        res.json({
            message: 'Error occure in disease',
        })
    }
})

app.listen(port, () => console.log(`Server is running at port:${port}`));
