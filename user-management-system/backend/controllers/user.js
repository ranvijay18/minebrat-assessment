const User = require('../models/user');
const Address = require("../models/address");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');


async function isExists(emailSearch) {
    const data = await User.findAll({ where: { email: emailSearch } })

    if (data.length > 0) {
        userId = data[0].id;
        return data[0];
    } else {
        return false;
    }
}

function generateAccessToken(id, name) {
    return jwt.sign({ userId: id , name: name}, "secret")
}

exports.postUser = async(req,res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;
    const address = req.body.address;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const pincode = req.body.pincode;
    const hashedPassword = await bcrypt.hash(password, 10);

    const check = await isExists(email);

    if (check === false) {

      
         const user =  await User.create({
                name: name,
                email:email, 
                phone:phone,
                password:hashedPassword
            })
        
    const userAddress = await Address.create({
        address: address,
        address2: address2,
        city: city,
        state: state,
        pincode: pincode,
        userId: user.dataValues.id
    })
        res.status(201).json({message:"Account is successfully created!!!", status: true});
    } else {
        res.status(201).json("Email already exists!!!");
    }
}



exports.postLogin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const check = await isExists(email);

    if (check === false) {
        res.status(201).json("Account not found!!!");
    } else {

        bcrypt.compare(password, check.password, function (err, result) {
            if (result == true) {
                res.status(201).json({ status: true, token: generateAccessToken(check.id, check.name) });
            } else {
                res.status(201).json({ status: false });
            }
        });
    }

}


exports.getUsers= async (req, res) => {

    const name = req.body.name;
    const pincode = +req.body.pincode;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;


    let whereClause = {};
    let includeClause = {};
    if (name) {
      whereClause.name = { [Sequelize.Op.like]: `%${name}%` };
    }
    if (pincode) {
        includeClause = {
            model: Address,
            where: { pincode: pincode },
          };
    }else{
        includeClause = {
            model: Address
          };
    }
    if (startDate && endDate) {
      whereClause.createdAt = {
        [Sequelize.Op.between]: [startDate, endDate],
      };
    }

    const [users, totalResults] = await Promise.all([
        User.findAll({
          where: whereClause,
          include:includeClause,
        }),
        User.count({ where: whereClause }),
      ]);


    res.json({
        details: users
    });
}