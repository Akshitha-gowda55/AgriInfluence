"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth");
const admin_1 = require("../middleware/admin");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/dashboard', auth_1.authMiddleware, admin_1.adminMiddleware, (_req, res) => {
    return res.json({
        success: true,
        data: {
            totalUsers: 120,
            totalOrders: 54,
            totalProducts: 8,
            totalRevenue: 12540,
            pendingSupportTickets: 6,
        },
    });
});
router.get('/stats', auth_1.authMiddleware, admin_1.adminMiddleware, (_req, res) => {
    return res.json({
        success: true,
        stats: {
            ordersToday: 12,
            newUsersToday: 5,
            lowStockProducts: 3,
            deliveredOrders: 31,
        },
    });
});
router.post('/action', auth_1.authMiddleware, admin_1.adminMiddleware, (req, res) => {
    const { action, targetId } = req.body;
    if (!action) {
        return res.status(400).json({
            success: false,
            message: 'Admin action is required',
        });
    }
    return res.json({
        success: true,
        message: `Admin action "${action}" executed successfully`,
        targetId: targetId || null,
    });
});
router.get('/', (_req, res) => {
    res.json({
        success: true,
        message: 'Admin route working',
    });
});
exports.default = router;
//# sourceMappingURL=admin.js.map