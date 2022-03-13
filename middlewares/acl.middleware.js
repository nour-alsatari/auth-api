
function acl(action) {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        next("access denied");
      }
    } catch (e) {
      next("error");
    }
  };
}

module.exports = acl;
