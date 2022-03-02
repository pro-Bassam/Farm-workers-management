// Setup empty JS object to act as endpoint for all routes
reportData={};
const port = 7000;

// Require Express to run server and routes
const express = require('express');
const mySql = require('mysql');

// Start up an instance of app
const app = express();

/* Middleware*/
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(express.static('public'));


//database connection
const dB = mySql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'my_farm',
    port:'3306',
    });
dB.connect((err)=>{
    if(err) throw err;
    else{
    console.log('mysql connected...');
    }
});


//check data
statusid = {};
app.post('/idcheck', (req, res) => {
    worker_id = req.body.worker_id;
    let query1 = dB.query('select * from workers where worker_id = ?;', [worker_id], (err, result, fields) => {
        if(result.length >0){
            statusid.flag = 1;
        } 
        else{
            statusid.flag = 0;
        }
        res.end();
    });
});

app.get('/check',(req, res) => {
    res.send(statusid);
});

//registeration
app.post('/reg',(req, res)=>{
    let worker_id = req.body.worker_id;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let middleName = req.body.middleName;
    let section_id = req.body.section_id;
    let phone_1 = req.body.phone_1;
    let phone_2 = req.body.phone_2;
    let salary = req.body.salary;
    let mangerId= req.body.mangerId;
    let gender = req.body.gender;


    let query = dB.query('select * from workers where worker_id = ?', [worker_id], (err, result, fields) => {
        if (result.length > 0) {
            console.log('existed');
            res.redirect("/add.html");
        } else {
            let query2 = dB.query('INSERT INTO workers (worker_id, first_name, middle_name, last_name, section_id, gender, phone1, phone2, salary, manager_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            , [worker_id, firstName, middleName, lastName, section_id, gender, phone_1, phone_2, salary, mangerId], (err, result)=>{
            if(err) {
                res.redirect("/add.html");
                console.log('error');
                throw err;
            } else {
                res.redirect("/add.html");
                console.log('record added...');
            }
        });
    }
    });     
});

app.post('/update',(req, res)=>{
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let middleName = req.body.middleName;
    let section_id = req.body.section_id;
    let phone_1 = req.body.phone_1;
    let phone_2 = req.body.phone_2;
    let salary = req.body.salary;
    let mangerId= req.body.mangerId;
    let gender = req.body.gender;

    let query = dB.query('update workers set first_name = ?, middle_name = ?,last_name = ?, section_id = ?, gender = ?, phone1 = ?, phone2 = ?, salary = ?, manager_id = ? where worker_id = ?;'
    , [firstName, middleName, lastName, section_id, gender, phone_1, phone_2, salary, mangerId, worker_id], (err, result)=>{
        if(err) {
            res.redirect("/edit.html");
            console.log('error');
            throw err;
        } else {
            res.redirect("/edit.html");
            console.log('record updated...');
        }
    });
});


app.post('/id',(req, res)=>{
    worker_id = req.body.worker_id;
});

//reports
app.get('/show', (req, res) => {
   
    //console.log(worker_id);
    let query1 = dB.query('select * from workers where worker_id = ?;', [worker_id], (err, result, fields) => {
        let sender1 = {};
        sender1.data = result;
        res.send(sender1);
        //console.log(result);
        //console.log(sender1);
    });
});

app.get('/fill', (req, res) => {
   
    console.log(worker_id);
    let query1 = dB.query('select * from workers where worker_id = ?;', [worker_id], (err, result, fields) => {
        let sender1 = {};
        sender1.data = result;
        res.send(sender1);
        //console.log(result);
        //console.log(sender1);
    });
});

app.get('/showAll', (req, res) => {
   
    let query1 = dB.query('select * from workers', (err, result, fields) => {
        let sender1 = {};
        sender1.data = result;
        res.send(sender1);
        //console.log(sender1);
    });
});


app.get('/total', (req, res) => {
   
    let query1 = dB.query('select * from workers', (err, result, fields) => {
        let sender1 = {};
        sender1.data = result;
        res.send(sender1);
        //console.log(sender1);
    });
});
/*
app.get('/activityNum', (req, res) => {
    let query2 = dB.query('select * from clintactivity', (err, result, fields) => {
        let sender2 = {};
        sender2.data = result.length;
        res.send(sender2);
        console.log(result.length);
    });
});
*/
//navigation handling
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.get('/add.html', (req, res) => {
    res.sendFile(__dirname + '/add.html');
})
app.get('/edit.html', (req, res) => {
    res.sendFile(__dirname + '/edit.html');
})

app.get('/show.html', (req, res) => {
    res.sendFile(__dirname + '/show.html');
})



app.listen(port,()=>{
    console.log(`the server is running on port number: ${port}`);
});

