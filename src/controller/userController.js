const response = require("../response");
const test = (req, res) => {
  response(200, "success", "OKE", res);
};

module.exports = {
  test,
};
