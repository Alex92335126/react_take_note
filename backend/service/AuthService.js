class AuthService {
    constructor(knex){
        this.knex = knex;
    }
    
    async getUser(user) {
        let user = await knex("users").where({ username }).first();
        return user;
    }

    async addUser(username, password) {
        return await knex("users").insert({ username, password });
    }
}