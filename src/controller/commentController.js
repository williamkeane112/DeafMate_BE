const db = require("../config");
const response = require("../response");

const createComment = (req, res) => {
  const { user_id, forum_id, content } = req.body;

  const query = "INSERT INTO comment (user_id, forum_id, comment) VALUES(?,?,?)";
  const value = [user_id, forum_id, content];
  db.query(query, value, (err, result) => {
    if (err) return response(500, "ERROR", "SERVER ERROR", res);

    return response(200, result, "Add Comment Successfuly", res);
  });
};

const showComment = (req, res) => {
  const user_id = req.query.user_id;
  const forum_id = req.query.forum_id;

  const query = "SELECT nama, comment FROM comment JOIN user ON comment.user_id = user.id JOIN forum ON comment.forum_id = forum.id WHERE user.id = ? AND forum.id = ? ";

  db.query(query, [user_id, forum_id], (err, result) => {
    if (err) return response(500, "ERROR", "SERVER ERROR", res);
    return response(200, result, "Show data comment", res);
  });
};
module.exports = {
  createComment,
  showComment,
};
