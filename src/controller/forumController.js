const response = require("../response");
const db = require("../config");
const multer = require("multer");

const getAllDataForum = (req, res) => {
  const query = "SELECT nama,content,forum.id FROM  forum JOIN user ON forum.user_id = user.id";

  db.query(query, (err, result) => {
    if (err) return response(500, "Invalid", "ERROR GET DATA Forum", res);
    return response(200, result, "Get All Data Successfuly", res);
  });
};

const getDataByID = (req, res) => {
  const id = req.params.id;
  const query = "SELECT nama, content,img FROM forum JOIN user ON forum.user_id = user.id WHERE forum.id= ?";

  db.query(query, id, (err, result) => {
    if (err) return response(500, "Invalid", "ERROR GET DATA Forum", res);

    if (result.length > 0) {
      result[0].image = `http://192.168.135.169:3000/public/forum/${result[0].img}`;
    }

    return res.status(200).json({ message: "Get Data User By Id Successfully", payload: result[0] });
  });
};

const createForum = (req, res) => {
  const { user_id, content } = req.body;
  let img = null;

  if (req.file) {
    img = req.file.filename;
  }

  const query = "INSERT INTO forum (user_id, content, img) VALUES(?,?,?)";
  const cekUserID = "SELECT * FROM user WHERE id= ?";

  db.query(cekUserID, [user_id], (err, result) => {
    if (err) return res.status(500).json({ status: "Invalid", message: "Server ERROR" });

    if (result.length === 0) return res.status(401).json({ status: "Error", message: "Can't get ID User" });

    const values = [user_id, content, img];
    db.query(query, values, (err, result) => {
      if (err) return res.status(500).json({ status: "Invalid", message: "ERROR Add Data" });

      return res.status(200).json({ status: "Success", message: "Create Data Successfully", data: result });
    });
  });
};

module.exports = {
  createForum,
};

module.exports = {
  getAllDataForum,
  getDataByID,
  createForum,
};
