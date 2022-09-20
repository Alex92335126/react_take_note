class NoteService {
  constructor(knex) {
    this.knex = knex;
  }

  async list(user) {
    console.log("listUser", user);
     
    // const notes = await this.knex("users")
    //   .select("notes.content", "notes.id")
    //   .join("notes", "users.id", "notes.user_id")
    //   .where("id", user);
    
    const notes = await this.knex("notes").select("id","content").where("user_id", user)
    console.log('note service note', notes)
    return notes
  }

  async add(note, user) {
    console.log("add notes", note, user)
    const addnote = await this.knex("notes")
      .insert({ user_id: user, content: note })
      .returning("id", "content")
    return addnote;
      
  }

  update(id, note) {
    return this.knex("notes").update({ content: note }).where({ id });
  }

  remove(id) {
    return this.knex("notes").del().where({ id });
  }
}

module.exports = NoteService;
