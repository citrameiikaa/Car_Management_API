import db from "../models/index.js"
import jwt from "jsonwebtoken";
import cars from "../models/cars.js";

const Cars = db.Cars


export const getCars = async (req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "You are not authorized to register an SuperAdmin / Admin",
        });
        return;
    }
    const cars = await Cars.findAll({
        // attributes: ['id', 'name', 'email', 'role']
        // {
        //     "id": 7,
        //     "name": "BMW",
        //     "price": "5000",
        //     "size": "large",
        //     "available": 2,
        //     "createdBy": null,
        //     "updatedBy": null,
        //     "deletedBy": null,
        //     "createdAt": "2022-10-21T11:00:07.000Z",
        //     "updatedAt": "2022-10-21T11:00:07.000Z"
        // }
    });
    res.json(cars);
}

export const getCarsById = async (req, res) => {
    if (req.user.role == "member") {
        res.status(401).json({
            status: "Unauthorized",
            message: "You are not authorized to register an SuperAdmin / Admin",
        });
        return;
    }
    const {
        id
    } = req.params;
    const cars = await Cars.findOne({
        where: {
            id: id
        },
    });
    res.json(cars);
}

export const createCars = async (req, res) => {
    const {
        name,
        price,
        size,
        available
    } = req.body;
    try {
        await Cars.create({
            name: name,
            price: price,
            size: size,
            available: available
        });
        return res.status(200).json({
            success: true,
            message: "Mobil Berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateCars = async (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        price
    } = req.body;
    try {
        await Cars.update({
            name: name,
            price: price
        }, {
            where: {
                id: id
            },
        });
        return res.status(200).json({
            success: true,
            message: "Mobil Berhasil diupdate",
        });
    } catch (error) {
        console.log(error);
    }
}

export const deleteCars = async (req, res) => {
    const {
        id
    } = req.params;
    const dataBeforeDelete = await Cars.findOne({
        where: {
            id: id
        },
    });
    // if(tokenUser.role !="superadmin"){res.json()}
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

    if (!parsedDataProfile) {
        return res.status(400).json({
            success: false,
            message: "Cars doesn't exist or has been deleted!",
        });
    }

    await Cars.destroy({
        where: {
            id
        },
    });

    return res.status(200).json({
        success: true,
        message: "Delete Data Successfully",
    });
}