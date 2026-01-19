import { ratelimit } from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
    try {
        const { success } = await ratelimit.limit("global");

        if (!success) {
            return res.status(429).json({ message: "Too many requests" });
        }

        next();
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Rate limiter failure" });
    }
};

export default rateLimiter;
