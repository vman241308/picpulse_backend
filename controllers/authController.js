const connection = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('dotenv');
env.config();
// const User = require("../models/User");

function validateEmail(email) {
    var re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(email.toLowerCase());
}

exports.signup = async (req, res) => {
    try {
        let { FirstName, LastName, Email, Password, DOB, Avatar } = req.body;
        // check if DOB is empty, if so set it to null
        if(!DOB) {
            DOB = null;
        }

        // Check if the input parameters are empty
        if(!FirstName || !LastName || !Email || !Password){
           return res.status(400).send({ message: 'Input parameters cannot be empty.' });
        }

        // Validate email
        if (!validateEmail(Email)) {
            return res.status(400).send({ message: 'Invalid email format.' });
        }

        // Check if the email already exists
        connection.query(
            `SELECT * FROM users WHERE Email = ?`,
            [Email],
            async (err, results) => {
                if (err) throw err;

                if (results.length > 0) {
                    return res.status(400).send({ message: 'Email already exists.' });
                }

                const hashedPassword = await bcrypt.hash(Password, 8);

                connection.query(
                    `INSERT INTO users (FirstName, LastName, Email, Password, DOB, Avatar) VALUES (?, ?, ?, ?, ?, ?)`,
                    [FirstName, LastName, Email, hashedPassword, DOB, Avatar],
                    (err, results) => {
                        if (err) throw err;
                        res.status(200).send({ message: 'User created successfully.' });
                    }
                );
            }
        );
    } catch (err) {
        res.status(500).send({ message: `An unexpected error occurred: ${err.message}` });
    }
};

exports.signin = async (req, res) => {
    try {
        let { Email, Password } = req.body;
        // Check if the input parameters are empty
        if(!Email || !Password){
           return res.status(400).send({ message: 'Input parameters cannot be empty.' });
        }
        
        // validate email
        if (!validateEmail(Email)) {
            return res.status(400).send({ message: 'Invalid email format.' });
        }

        connection.query('SELECT * FROM users WHERE Email = ?', [Email], async (error, results) => {
            if (error) throw error;

            if (results.length > 0) {
                const comparison = await bcrypt.compare(Password, results[0].Password);
                if (comparison) {
                    const UserID = results[0].UserID;
                    const token = jwt.sign({ UserID }, process.env.JWT_SECRET, {
                        expiresIn: '2h'
                    });
                    return res.status(200).send({ 
                        message: 'User logged in successfully', 
                        token: token 
                    });
                } else {
                    return res.status(401).json({
                        message: 'Password is incorrect',
                    });
                }
            } else {
                return res.status(404).json({
                    message: 'User not found',
                });
            }
        });
    } catch (error) {
        res.status(500).send();
    }
};