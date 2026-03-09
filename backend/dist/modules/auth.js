"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const users = [
    {
        id: '1',
        name: 'Admin User',
        email: 'admin@agrinfluence.com',
        password: 'admin123',
        role: 'admin',
    },
];
router.post('/signup', (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and password are required',
            });
        }
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User already exists',
            });
        }
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            role: 'customer',
        };
        users.push(newUser);
        const token = jsonwebtoken_1.default.sign({
            id: newUser.id,
            email: newUser.email,
            role: newUser.role,
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        return res.status(201).json({
            success: true,
            message: 'Signup successful',
            token,
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Signup failed',
        });
    }
});
router.post('/login', (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required',
            });
        }
        const user = users.find((u) => u.email === email && u.password === password);
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password',
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
        return res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (_error) {
        return res.status(500).json({
            success: false,
            message: 'Login failed',
        });
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map