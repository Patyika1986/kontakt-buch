const mysql = require("mysql2");
const asyncHandler = require("express-async-handler");

// mysql
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Ppadj2008",
    database: "contacts",
    insecureAuth: true,
});

//@desc Get all contacts
//@route Get /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    pool.query(`select * from contact`, (err, result, fields) => {
        if (err) {
            return console.log(err);
        }
        res.send(result);
    });
});

//@desc Create new contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    const {
        id,
        firstname,
        lastname,
        email,
        gender,
        tel
    } = req.body;
    const iD = req.body.id;

    let sql;
    req.body.map((list) => {
        sql = `insert into contact ( id , firstname, lastname, email, gender,tel) values('${list.id}','${list.firstname}','${list.lastname}','${list.email}','${list.gender}','${list.tel}')`;
    });
    pool.query(sql, (err, result, fields) => {
        if (err) {
            return console.log(err);
        }

        if (res) {
            res.status(200).json({
                message: result,
            });
        }
    });

});

//@desc Get Contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    console.log("get one contact with id", req.body);
    pool.query(`select * from contact`, (err, result, fields) => {
        if (err) {
            return console.log(err);
        }
        const response = result.find((user) => user.id == req.params.id);

        if (res) {
            res.status(200).json({
                message: response,
            });
        }
    });
});

//@desc Update Contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    const {
        id,
        firstname,
        lastname,
        email,
        gender,
        tel
    } = req.body;
    const iD = req.body.id;

    // sql = 'UPDATE `contact` ' + 'SET `firstname` = `?`, `lastname` = `?`, `gender` = `?`, `email` = `?`, `tel` = `?`  ' + 'WHERE `id` = `?`';

    pool.query('UPDATE contact SET ? WHERE id = ?', [{
        firstname: firstname,
        lastname: lastname,
        gender: gender,
        email: email,
        tel: tel,
        id: id
    }, id], (err, result, fields) => {
        if (err) {
            return console.log(err, "with update something went wrong");
        }

    });

    res.status(200).json({
        message: `Update  contacts for ${req.params.id}`,
    });
});

//@desc Delete Contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {

    pool.query(`delete from contact where id=${req.params.id}`, (err, result, fields) => {
        if (err) {
            return console.log(err, "something went wrong");
        }
    });
    res.status(200).json({
        message: `Deleted contact ${req.params.id}`,
    });

});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};