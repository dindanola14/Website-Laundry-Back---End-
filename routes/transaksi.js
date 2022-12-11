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
const transaksi = model.transaksi

//endpoint menampilkan semua data transaksi, method: GET, function: findAll()
app.get("/", (req,res) => {
    transaksi.findAll()
        .then(result => {
            res.json({
                transaksi : result
            })
        })
        .catch(error => {
            console.log(error);
            res.json({
                message: error.message
            })
        })
})

//endpoint untuk menyimpan data transaksi, METHOD: POST, function: create
app.post("/", (req,res) => {
    var now = new Date();
    var result = now.setDate(now.getDate() + 3);
    var invoice = Date.now();

    let data = {
        id_outlet : req.body.id_outlet,
        kode_invoice : invoice,
        id_member : req.body.id_member,
        tgl : Date.now(),
        batas_waktu : result,
        tgl_bayar : req.body.tgl_bayar,
        biaya_tambahan : req.body.biaya_tambahan,
        diskon : req.body.diskon,
        pajak : req.body.pajak,
        status : req.body.status,
        dibayar : req.body.dibayar,
        id_user : req.body.id_user
    }

    transaksi.create(data)
        .then(result => {
            let lastID=result.id_transaksi
            let ivc=result.kode_invoice+"-"+lastID
            let param={
                id_transaksi:result.id_transaksi
            }
            let query={
                kode_invoice:ivc
            }
            transaksi.update(query, {where: param})
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

//endpoint mengupdate data transaksi, METHOD: PUT, function:update
app.put("/:id", (req,res) => {
    let param = {
        id_transaksi : req.params.id
    }
    let data = {
        id_outlet : req.body.id_outlet,
        kode_invoice : req.body.kode_invoice,
        id_member : req.body.id_member,
        tgl : req.body.tgl,
        batas_waktu : req.body.batas_waktu,
        tgl_bayar : req.body.tgl_bayar,
        biaya_tambahan : req.body.biaya_tambahan,
        diskon : req.body.diskon,
        pajak : req.body.pajak,
        status : req.body.status,
        dibayar : req.body.dibayar,
        id_user : req.body.id_user
    }
    transaksi.update(data, {where: param})
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

//endpoint menghapus data transaksi, METHOD: DELETE, function: destroy
app.delete("/:id", (req,res) => {
    let param = {
        id_transaksi : req.params.id
    }
    transaksi.destroy({where: param})
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





