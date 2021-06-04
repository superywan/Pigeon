const isValidEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(userEmail);
};

const validInfo = (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    if (req.path === "/api/auth/register") {
        if (![firstName, lastName, email, password].every(Boolean)) {
            return res.status(422).json("Missing credentials");
        } else if (isValidEmail(email)) {
            return res.status(422).json("Invalid email");
        }
    }
    if (req.path === "/api/auth/login") {
        if (![email, password].every(Boolean)) {
            return res.status(422).json("Missing credentials");
        } else if (isValidEmail(email)) {
            return res.status(422).json("Invalid email");
        }
    }
    next();
};

export default validInfo;
