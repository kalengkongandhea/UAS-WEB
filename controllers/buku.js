const Buku = require('../models/buku');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports.getAllBuku = (req, res) => {
    Buku.findAll()
        .then((buku) => {
            res.status(200).json(buku);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailBuku = (req, res) => {
    Buku.findOne({
            where: {
                id: req.params.buku_id
            }
        })
        .then((buku) => {
            res.status(200).json(buku);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storeBuku = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Buku.create({
                        isbn: req.body.isbn,
                        judul: req.body.judul,
                        jumlah_halaman: req.body.jumlah_halaman,
                        harga: req.body.harga,
                        penerbitId: req.body.penerbitId
                    })
                    .then((buku) => {
                        res.status(200).json({
                            msg: 'Buku berhasil ditambahkan',
                            buku: buku
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}

module.exports.updateBuku = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Buku.findOne({
                        where: {
                            id: req.params.buku_id
                        }
                    })
                    .then((buku) => {
                        if (!buku) {
                            return res.status(404).json({
                                msg: 'Buku tidak ditemukan'
                            });
                        }
                        buku.isbn = req.body.isbn;
                        buku.judul = req.body.judul;
                        buku.jumlah_halaman = req.body.jumlah_halaman;
                        buku.harga = req.body.harga;
                        buku.penerbitId = req.body.penerbitId;
                        buku.save();

                        return res.status(200).json({
                            msg: 'Buku berhasil diperbarui',
                            buku: buku
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}

module.exports.destroyBuku = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Buku.destroy({
                        where: {
                            id: req.params.buku_id
                        }
                    })
                    .then((buku) => {
                        res.status(200).json({
                            msg: 'Buku dihapus!'
                        });
                    })
                    .catch((error) => {
                        console.log(error)
                    });
            } else {
                res.status(403).json({
                    msg: 'Oops, Anda bukan admin!'
                });
            }
        }
    })
}

module.exports.searchBuku = (req, res) => {
    Buku.findAll({
            limit: 10,
            where: {
                judul: sequelize.where(sequelize.fn('LOWER', sequelize.col('judul')), 'LIKE', '%' + req.params.judul + '%')
            }
        })
        .then((buku) => {
            res.status(200).json({
                msg: 'search results',
                result: buku
            });
        })
        .catch((error) => {
            console.log(error)
        });
}