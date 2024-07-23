const response = require("../response");
const db = require("../config");

const getDataModule = (req, res) => {
  const { isi, latihan } = req.body;
  const query = `SELECT * FROM module WHERE kategori= ?`;

  db.query(query, [isi || latihan], (err, result) => {
    if (err) return response(500, "Error", "Error Get data", res);

    return response(200, result, "Get Data User Successfuly", res);
  });
};



module.exports = {
  getDataModule,
};
