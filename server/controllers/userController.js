
import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js'
import asyncHandler from 'express-async-handler'

const saltRounds = 10;

const register = asyncHandler(async (req, res) => {
    const {username, email, password, firstname, lastname, address, phonenumber, roles} = req.body

    if(username.length <= 3 || username.length > 30) {
        res.status(400)
        throw new Error("Username must be between 4-30 characters long.")
    }
    if(password.length <= 5) {
        res.status(400)
        throw new Error ("Password must be atleast 6 characters long.")}

    const dupeUser = await User.findOne({
        $or: [
            { username: username },
            { email: email }
        ]
    });
    
    if (dupeUser) {
        if (dupeUser.username === username) {
            res.status(400)
            throw new Error("Username already taken")
        }
        if (dupeUser.email === email) {
            res.status(400)
            throw new Error("Email already in use")
        }
    }

    const userRoles = roles && roles.length > 0  // this is here so that when you register on the page your first account is given admin permissions so that then you can access admin tools and add users from there. 
        ? {
            Employee: roles.includes('Employee'),
            Editor: roles.includes('Editor'),
            Admin: roles.includes('Admin')
          }
        : {
            Employee: true,
            Editor: true,
            Admin: true
          };

    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        personal_info: {
            firstname,
            lastname,
            address,
            phonenumber,
        },
        roles: userRoles,
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
          });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({ email })  
    const matchPassword = await bcrypt.compare(password, user.password)

    if(user && matchPassword) {
        generateToken(res, user._id)

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            personal_info: {
                firstname: user.personal_info.firstname,
                lastname: user.personal_info.lastname,
                address: user.personal_info.address,
                phonenumber: user.personal_info.phonenumber,
            },
            roles: {
                Employee: user.roles.Employee,
                Editor: user.roles.Editor,
                Admin: user.roles.Admin
            }
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const logout = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    }) 
    res.status(200).json({message: 'user logout'})
}

const getUser = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json('user not found')
        }
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

const getAllUsers = async (req, res) => {
    const allUsers = await User.find({}).select('-password')
    try {
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(403).json(error)
    }
}

const getRole = asyncHandler(async (req, res) => {
    const user = req.user;
    try {
        const admin = user.roles.Admin
        res.status(200).json(admin);
    } catch (error) {
        res.status(403).json(error)
    }
})

const addUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      generateToken(res, user._id);
  
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

  const updateUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json('user not found')
        }

        user.username = req.body.username || user.username
        user.email = req.body.email || user.email
        user.personal_info.firstname = req.body.firstname || user.personal_info.firstname,
        user.personal_info.lastname = req.body.lastname || user.personal_info.lastname
        user.personal_info.address = req.body.address || user.personal_info.address
        user.personal_info.phonenumber = req.body.phonenumber || user.personal_info.phonenumber
        user.roles.Employee = req.body.Employee || user.roles.Employee
        user.roles.Editor = req.body.Editor || user.roles.Editor
        user.roles.Admin = req.body.Admin || user.roles.Admin

        const updatedUser = await user.save()

        res.status(200).json(updatedUser)

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
  });

  const deleteUser = asyncHandler(async (req, res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId)

        if(!user) {
            return res.status(404).json('user not found')
        }

        const deleteUser = await user.deleteOne()

        res.status(200).json(deleteUser)

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
  });

export default {register, login, logout, getUser, addUser, getRole, getAllUsers, deleteUser, updateUser}