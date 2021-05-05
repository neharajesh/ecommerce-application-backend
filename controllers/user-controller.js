exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
  
exports.sellerBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.buyerBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};