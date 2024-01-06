const mongoose = require('mongoose');
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
require('dotenv').config();
const conn = process.env.MONGO_URL;
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());
mongoose.connect(conn);

const inputSchema = new mongoose.Schema({
    date: String,
    tran: String,
    voucher: String,
    sample_1: String,
    sample_2: String,
    name_1: String,
    debit_1d: String,
    credit_1d: String,
    name_2: String,
    debit_2d: String,
    credit_2d: String,
    name_3: String,
    debit_3d: String,
    credit_3d: String,
    name_4: String,
    debit_4d: String,
    credit_4d: String,
    name_5: String,
    debit_5d: String,
    credit_5d: String,
    name_6: String,
    debit_6d: String,
    credit_6d: String,
    name_7: String,
    debit_7d: String,
    credit_7d: String,
    totalCredit: Number,
    totalDebit: Number,
})

const InputData = mongoose.model('InputData',inputSchema);

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/home.html');
});

app.get('/formDetails',(req,res)=>{
    res.sendFile(__dirname+'/public/formDetails.html');
});

app.get('/india',(req,res)=>{
    res.sendFile(__dirname+'/public/india.html');
});

app.post('/formDetails',async(req,res)=>{
    let {date,tran,voucher,sample_1,sample_2,name_1,debit_1d,credit_1d,name_2,debit_2d,credit_2d,name_3,debit_3d,credit_3d,name_4,debit_4d,credit_4d,name_5,debit_5d,credit_5d,name_6,debit_6d,credit_6d,name_7,debit_7d,credit_7d} = req.body;
    let totalCredit = parseFloat(credit_1d)+parseFloat(credit_2d)+parseFloat(credit_3d)+parseFloat(credit_4d)+parseFloat(credit_5d)+parseFloat(credit_6d)+parseFloat(credit_7d);
    let totalDebit = parseFloat(debit_1d)+parseFloat(debit_2d)+parseFloat(debit_3d)+parseFloat(debit_4d)+parseFloat(debit_5d)+parseFloat(debit_6d)+parseFloat(debit_7d);
    try{
        const inputData = new InputData({
            date: date,
            tran: tran,
            voucher: voucher,
            sample_1: sample_1,
            sample_2: sample_2,
            name_1: name_1,
            debit_1d: debit_1d,
            credit_1d: credit_1d,
            name_2: name_2,
            debit_2d: debit_2d,
            credit_2d: credit_2d,
            name_3: name_3,
            debit_3d: debit_3d,
            credit_3d: credit_3d,
            name_4: name_4,
            debit_4d: debit_4d,
            credit_4d: credit_4d,
            name_5: name_5,
            debit_5d: debit_5d,
            credit_5d: credit_5d,
            name_6: name_6,
            debit_6d: debit_6d,
            credit_6d: credit_6d,
            name_7: name_7,
            debit_7d: debit_7d,
            credit_7d: credit_7d,
            totalCredit: totalCredit,
            totalDebit: totalDebit,
        });
        await inputData.save();
        let a3 = fs.readFileSync('public/submit.html')
        res.send(a3.toString());
    }
    catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
    }
})

app.post('/india',async(req,res)=>{
    let {date,tran,voucher,sample_1,sample_2,name_1,debit_1d,credit_1d,name_2,debit_2d,credit_2d,name_3,debit_3d,credit_3d,name_4,debit_4d,credit_4d,name_5,debit_5d,credit_5d,name_6,debit_6d,credit_6d,name_7,debit_7d,credit_7d} = req.body;
    let totalCredit = parseFloat(credit_1d)+parseFloat(credit_2d)+parseFloat(credit_3d)+parseFloat(credit_4d)+parseFloat(credit_5d)+parseFloat(credit_6d)+parseFloat(credit_7d);
    let totalDebit = parseFloat(debit_1d)+parseFloat(debit_2d)+parseFloat(debit_3d)+parseFloat(debit_4d)+parseFloat(debit_5d)+parseFloat(debit_6d)+parseFloat(debit_7d);
    try{
        const inputData = new InputData({
            date: date,
            tran: tran,
            voucher: voucher,
            sample_1: sample_1,
            sample_2: sample_2,
            name_1: name_1,
            debit_1d: debit_1d,
            credit_1d: credit_1d,
            name_2: name_2,
            debit_2d: debit_2d,
            credit_2d: credit_2d,
            name_3: name_3,
            debit_3d: debit_3d,
            credit_3d: credit_3d,
            name_4: name_4,
            debit_4d: debit_4d,
            credit_4d: credit_4d,
            name_5: name_5,
            debit_5d: debit_5d,
            credit_5d: credit_5d,
            name_6: name_6,
            debit_6d: debit_6d,
            credit_6d: credit_6d,
            name_7: name_7,
            debit_7d: debit_7d,
            credit_7d: credit_7d,
            totalCredit: totalCredit,
            totalDebit: totalDebit,
        });
        await inputData.save();
        let a3 = fs.readFileSync('public/submit.html')
        res.send(a3.toString());
    }
    catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
    }
})

app.get('/result', async (req, res) => {
    try {
      const data = await InputData.find();
      res.render('result', { data });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

app.listen(port,()=>{
    console.log(`server running at ${port}`)
})
