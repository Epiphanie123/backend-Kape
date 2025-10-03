"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// router/otpRouter.ts
const express_1 = require("express");
const OTPGenerator_1 = require("../utils/OTPGenerator");
const SendEmail_1 = require("../utils/SendEmail");
const router = (0, express_1.Router)();
router.post("/send-otp", async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const otp = (0, OTPGenerator_1.generateOTP)(6);
        // Send email
        const sent = await (0, SendEmail_1.sendOTP)(email, otp);
        if (!sent) {
            return res.status(500).json({ message: "Failed to send OTP" });
        }
        // Store OTP temporarily (in memory for now, later in Redis/DB)
        // For demo: return OTP in response
        res.status(200).json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.default = router;
