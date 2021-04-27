require('dotenv').config();
const express = require("express");

const PORT = 3001
const app = express();

const connection = require('../db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', (req, res) => {
    const { body: formData } = req;
    const query = 'INSERT INTO User SET ?';
    connection.query(query, formData, (error, results) => {
        try {
            if (error) {
                res.status(500).json({
                    error: 'error',
                    errorMessage: 'Our server encountered an error performing the request',
                });
            } else {
                res.status(201).json({
                    id: results.insertId,
                    ...formData,
                });
            };
        } catch(err) {
            console.log(err)
            res.status(500).json({
                status: 'error',
                errorMessage: 'Difficulté rencontrée lors de l\'ajout d\'un nouveau membre',
            });
        };
    })
    // try {
    //     connection.query('INSERT INTO User SET ?', formData, (error, results) => {
    //         if (error) {
    //             res.status(500).json({
    //                 error: 'error',
    //                 errorMessage: 'Our server encountered an error performing the request',
    //             });
    //         } else {
    //             res.status(201).json({
    //                 id: results.insertId,
    //                 ...formData,
    //             });
    //         };
    //     });
    // } catch(err) {
    //     console.log(err)
    //     res.status(500).json({
    //         status: 'error',
    //         errorMessage: 'Difficulté rencontrée lors de l\'ajout d\'un nouveau membre',
    //     });
    // };
});

app.get('/', (req, res) => {
    try {
        connection.query('SELECT id, name FROM User', (error, results) => {
            if (error) {
                res.status(500).json({
                    error: 'error',
                    errorMessage: 'Our server encountered an error performing the request',
                });
            } else {
                res.status(200).json(results);
                };
            });
    } catch(err) {
        console.log(err)
        res.status(500).json({
            status: 'error',
            errorMessage: 'Difficulté rencontrée lors de la récupération des membres de l\'équipage',
        });
    };
});

app.get('/', (req, res) => {
    connection.query('SELECT id, name FROM User', (error, results) => {
        res.status(200).json(results);
    });
});

// app.listen(PORT, () => {
//     console.log(`Server listening on ${PORT}`);
// });


const server = app.listen(PORT, (err) => {
    if (err) {
      throw new Error(`An error occurred: ${err.message}`);
    }
    console.log(`🌍 Server is running on port ${PORT}`);
  });
  
  module.exports = server;