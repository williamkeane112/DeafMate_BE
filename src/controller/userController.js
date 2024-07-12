// import package
require("dotenv").config();
const response = require("../response");
const db = require("../config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// logic
const register = async (req, res) => {
  try {
    const { email, nama, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
      return response(401, "Invalid", "Password Dan Konfirmasi Password Tidak Sesuai", res);
    }

    // Check email exists
    const cekEmail = "SELECT * FROM user WHERE email = ?";
    db.query(cekEmail, [email], async (err, result) => {
      if (err) return response(401, "Invalid", "Error", res);

      if (result.length > 0) return response(401, "Error", "Email Sudah Terpakai", res);

      // passowrd hash
      const rounds = 10;
      const passHash = await bcrypt.hash(password, rounds);

      // Insert new user
      const query = "INSERT INTO user (email, nama, password) VALUES (?, ?, ?)";
      const value = [email, nama, passHash];
      db.query(query, value, (err, result) => {
        if (err) return response(400, "Invalid", "Register gagal, Coba Lagi", res);
        const data = {
          payload: result.affectedRows,
          id: result.insertId,
        };
        return response(200, data, "Register Successfully", res);
      });
    });
  } catch (err) {
    return response(500, "Error", "Terjadi kesalahan", res);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM user WHERE email = ?";
  if (!password) response(401, "INVALID", "Email Atau Passowrd salah! Coba lagi!!", res);

  db.query(query, [email], (err, result) => {
    if (err) response(500, "INVALID", "Email Atau Passowrd salah! Coba lagi!!", res);

    const passCompare = bcrypt.compare(password, result[0].password);

    if (!passCompare) response(401, "INVALID", "Email Atau Passowrd salah! Coba lagi!!", res);

    const token = jwt.sign({ id: result[0].id }, process.env.SECRETE_KEY, { expiresIn: 60 * 60 * 1 });

    const data = {
      auth: true,
      token: token,
    };
    return response(200, data, "Login Success", res);
  });
};

module.exports = {
  register,
  login,
};
