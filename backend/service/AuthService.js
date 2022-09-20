class AuthService {
    constructor(knex){
        this.knex = knex;
    }
    
    async getUser(username) {
        let user = await this.knex("users").where({ username }).first();
        return user;
    }

    async addUser(username, password) {
        return await this.knex("users").insert({ username, password });
    }
}

module.exports = AuthService