var express = require('express');
const app = express();
const conn = require('../connection/conn');

// let query = "CREATE TABLE student (id INT(6) AUTO_INCREMENT, stud_name VARCHAR(30), stud_email VARCHAR(30), stud_gender VARCHAR(30), stud_age INT(6), PRIMARY KEY(id))";

app.use(express.json());
app.use(express.urlencoded({extended: false}))

conn.connect((err,result) => {
    if (err) {
        console.log("Error while connect:", err);
    } else {
        console.log(result);
    }
})

app.get('/users', (req,res) => {
    let findQuery = "SELECT * FROM student";
    conn.query(findQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                statusCode: 400,
                status: 'fail',
                result: "Error while users!!"
            })
        }

        res.send({
            statusCode: 200,
            status: 'success',
            result: result
        })
    })

})

app.get('/users/:id', (req,res) => {
    let params = req.params;
    console.log('params: ', params);
    let findQuery = "SELECT * FROM student WHERE id='"+params.id+"'";
    conn.query(findQuery, (err, result) => {
        if (err) {
            console.log(err);
            res.send({
                statusCode: 400,
                status: 'fail',
                result: "Error while Get user by id!!"
            })
        }

        res.send({
            statusCode: 200,
            status: 'success',
            result: result
        })
    })

})

app.post('/register', (req,res) => {
    try {
        let {name, email, gender, age} = req.body; 
        let insertQuery = "INSERT INTO student (stud_name, stud_email, stud_gender, stud_age) VALUES(?, ?, ?, ?)";

        conn.query(insertQuery, [name, email, gender, age], (err, result) => {
            if (err) {
                console.log(err);
                res.send({
                    statusCode: 400,
                    status: 'fail',
                    result: "Error while register!!"
                })
            }

            console.log("response: ", result);
            res.send({
                statusCode: 200,
                status: 'success',
                result: "User registered successfully, id: " + result.insertId
            })
        })
        
    } catch (error) {
        console.log("Error while register: ", error);
    }
})

app.post('/delete/:id', (req,res) => {
    let id = req.params.id;
    let deleteQuery = "DELETE FROM student WHERE id='"+id+"'";

    conn.query(deleteQuery, (err,result) => {
        if (err) {
            console.log(err);
            res.send({
                statusCode: 400,
                status: 'fail',
                result: "Error while users!!"
            })
        }
        console.log("result", result);
        res.send({
            statusCode: 200,
            status: 'success',
            result: "User Deleted successfully"
        })
    })
})

app.post('/update/:id', (req,res) => {
    try {
        let id = req.params.id;
        console.log('id: ', id);
        let {name, email, gender, age} = req.body;

        let updateQuery = "UPDATE student SET stud_name='"+name+"', stud_email='"+email+"', stud_age='"+age+"', stud_gender='"+gender+"' WHERE id='"+id+"'";
        console.log('updateQuery: ', updateQuery);

        conn.query(updateQuery, (err,result) => {
            if (err) {
                console.log(err);
                res.send({
                    statusCode: 400,
                    status: 'fail',
                    result: "Error while users!!"
                })
            }
            console.log("result", result);
            res.send({
                statusCode: 200,
                status: 'success',
                result: "User Updated successfully"
            })
        })
        
    } catch (error) {
        console.log("Error while update: ", error);
    }
})

app.listen(5000, () => {
    console.log("listening to port 5000");
})