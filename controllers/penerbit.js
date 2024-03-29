const Penerbit = require('../models/penerbit');
const sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports.getAllPenerbit = (req, res) => {
    Penerbit.findAll()
        .then((penerbit) => {
            res.status(200).json(penerbit);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.getDetailPenerbit = (req, res) => {
    Penerbit.findOne({
            where: {
                id: req.params.penerbit_id
            }
        })
        .then((penerbit) => {
            res.status(200).json(penerbit);
        })
        .catch((error) => {
            console.log(error)
        });
}

module.exports.storePenerbit = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Penerbit.create({
                        nama: req.body.nama,
                        telepon: req.body.telepon
                    })
                    .then((penerbit) => {
                        res.status(200).json({
                            msg: 'Penerbit berhasil dibuat!',
                            penerbit: penerbit
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

module.exports.updatePenerbit = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) { //isAdmin
                Penerbit.findOne({
                        where: {
                            id: req.params.penerbit_id
                        }
                    })
                    .then((penerbit) => {
                        if (!penerbit) {
                            return res.status(404).json({
                                msg: 'Penerbit tidak ditemukan'
                            });
                        }
                        penerbit.name = req.body.name;
                        penerbit.telepon = req.body.telepon;
                        penerbit.save();

                        return res.status(200).json({
                            msg: 'Penerbit diperbarui',
                            penerbit: penerbit
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


module.exports.destroyPenerbit = (req, res) => {
    jwt.verify(req.token, process.env.SECRETKEY, (error, authData) => {
        if (error) {
            res.status(403).json({
                msg: error.message
            });
        } else {
            if (authData.admin == 1) {
                Penerbit.destroy({
                        where: {
                            id: req.params.penerbit_id
                        }
                    })
                    .then((penerbit) => {
                        res.status(200).json({
                            msg: 'Penerbit dihapus'
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

module.exports.searchPenerbit = (req, res) => {
    Penerbit.findAll({
            limit: 10,
            where: {
                title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + req.params.title + '%')
            }
        })
        .then((penerbit) => {
            res.status(200).json({
                msg: 'Hasil pencarian',
                result: penerbit
            });
        })
        .catch((error) => {
            console.log(error)
        });
}