const response = require("../response");
const db = require("../config");
const { getDataByID } = require("./forumController");

const getDataModule = (req, res) => {
  const { isi, latihan } = req.body;
  const query = `SELECT * FROM module WHERE kategori= ?`;

  db.query(query, [isi || latihan], (err, result) => {
    if (err) return response(500, "Error", "Error Get data", res);

    return response(200, result, "Get Data User Successfuly", res);
  });
};

const getDataById = (req, res) => {
  const belajar = req.params.id;
  console.log(belajar);
  const query = `SELECT * FROM module WHERE id= ?`;

  db.query(query, [belajar], (err, result) => {
    if (err) return res.status(500).json({ status: "Error", message: "Error Get data" });

    if (result.length > 0) {
      result[0].videos = `http://192.168.135.169:3000/public/hallo.gif`;
    }
    return res.status(200).json({ message: "Get Data User By Id Successfully", payload: result[0] });
  });
};
module.exports = {
  getDataModule,
  getDataById,
};
