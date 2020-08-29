require("dotenv").config();

const profileCheck = {
  isStoreManager: (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    if (!process.env.jwtPrivateKey) return next();
    if (req.user.profileid == 1) {
      next();
    } else {
      return res
        .status(403)
        .send("Access denied.Dont have Store manager Profile");
    }
  },
  isInventoryManager: (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    if (!process.env.jwtPrivateKey) return next();
    if (req.user.profileid == 2) {
      next();
    } else {
      return res
        .status(403)
        .send("Access denied.Dont have Inventory manager Profile");
    }
  },
  isCashier: (req, res, next) => {
    // 401 Unauthorized
    // 403 Forbidden
    if (!process.env.jwtPrivateKey) return next();
    if (req.user.profileid == 3) {
      next();
    } else {
      return res
        .status(403)
        .send("Access denied.Dont have Inventory manager Profile");
    }
  },
};

module.exports = profileCheck;
