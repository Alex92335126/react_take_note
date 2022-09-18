class AuthRouter {
    constructor(authService, express) {
        this.authService = authService
        this.express = express;
    }

    router() {
        let router = this.express.Router();
        router.post("/login", this.login.bind(this))
        router.post("/signup", this.signup.bind(this))
        router.get("/logout", this.logout.bind(this))
        router.get("/currentUser", this.getCurrentUser.bind(this))
        return router;
    }

    login(req, res) {
        const { username, password } = req.body;
        
        let user = this.authService.getUser(username)

        if (user) {
            let result = await bcrypt.compare(password, user.password);

            if (result) {
                const payload = {
                    id: user.id,
                    username: user.username,
                };
                const token = jwt.sign(payload, process.env.JWT_SECRET);
                res.json({ token });
            } else {
                res.sendStatus(401);
            }
    }

    }

    signup(req, res) {
        const { username, password } = req.body;
        console.log(username, password);
        let query = await this.authService.getUser(username)
        const hashed = await bcrypt.hash(password, 10);
        if (query == undefined) {
            this.authService.addUser(username, hashed)
            res.json("signup complete");
        } else {
            res.sendStatus(401);
        }
    }

    logout(req, res) {
        //do something?
    }

    getCurrentUser(req, res) {
        // current user data?
    }
}