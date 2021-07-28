const allowOnly = function (accessLevel, callback) {
  function checkUserRole(req, res) {
    const role = req.user[0].role;
    
    console.log("Access Level: " + accessLevel + ", User Role: " + role);

    if (role < accessLevel) {
      res.sendStatus(403);
      return;
    }

    callback(req, res);
  }

  return checkUserRole;
};

module.exports = { allowOnly };
