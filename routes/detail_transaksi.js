//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const detail_transaksi = model.detail_transaksi

//endpoint menampilkan semua data detail_transaksi, method: GET, function: findAll()
app.get("/", (req,res) => {
    detail_transaksi.findAll()
        .then(result => {
            res.json({
                detail_transaksi : result
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menyimpan data detail_transaksi, METHOD: POST, function: create
app.post("/", (req,res) => {
    let data = {
        id_transaksi : req.body.id_transaksi,
        id_paket : req.body.id_paket,
        qty : req.body.qty,
        keterangan : req.body.keterangan
    }

    detail_transaksi.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint mengupdate data detail_transaksi, METHOD: PUT, function:update
app.put("/:id", (req,res) => {
    let param = {
        id_detail_transaksi : req.params.id
    }
    let data = {
        id_transaksi : req.body.id_transaksi,
        id_paket : req.body.id_paket,
        qty : req.body.qty,
        keterangan : req.body.keterangan
    }
    detail_transaksi.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint menghapus data detail_transaksi, METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_detail_transaksi : req.params.id
    }
    detail_transaksi.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app





