import Admin from '../models/admin.js'; // Modeli import edin
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create a new admin
export const createAdmin = async (req, res) => {
    const { name, surname, email, password } = req.body;

    // Check for missing fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    try {
        // Check if the admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new admin
        const admin = new Admin({
            name,
            surname,
            email,
            password: hashedPassword
        });

        // Save the admin to the database
        await admin.save();
        return res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        console.error('Error creating admin:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Login admin
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email,password);
    const JWT_SECRET = 'XDYZSSDSsasfasd123.!'
    // Check for missing fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        // Find the admin by email
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: admin._id, email: admin.email }, JWT_SECRET, {
            expiresIn: '1h'
        });

        // Respond with the token
        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
