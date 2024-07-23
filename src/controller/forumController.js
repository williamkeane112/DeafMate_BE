const response = require("../response");
const db = require("../config");
const multer = require("multer")

const getAllDataForum = (req, res) => {
  const query = "SELECT * FROM  forum JOIN user ON forum.user_id = user.id";

  db.query(query, (err, result) => {
    if (err) return response(500, "Invalid", "ERROR GET DATA Forum", res);
    return response(200, result, "Get All Data Successfuly", res);
  });
};

const createForum = (req, res) => {
  // get data form clinet
  const { user_id, content, img } = req.body;
  // query
  const query = "INSERT INTO forum (user_id, content, img) VALUES(?,?,?)";
  const cekUserID = "SELECT * FROM user WHERE id= ?";

  // logic
  db.query(cekUserID, user_id, (err, result) => {
    if (err) return response(500, "Invalid", "Servel ERROR", res);

    if (result.length === 0) return response(401, "Error", "Can't get ID User"); // cek user exis

    // logic create data forum
    const value = [user_id, content, img];
    db.query(query, value, (err, result) => {
      if (err) return response(500, "Invalid", "ERROR Add Data", res);

      return response(200, result, "Create Data Successfuly", res);
    });
  });
};

module.exports = {
  getAllDataForum,
  createForum,
};
