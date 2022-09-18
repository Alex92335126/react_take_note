/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('users').del()
    await knex('users').insert([
      {
        username: 'a', 
        password: 'a', 
      },
      {
        username: 'b', 
        password: 'b', 
      },
      {
        username: 'c', 
        password: 'c',
      },
    ]);

    await knex('notes').del()
    await knex('notes').insert([
      { user_id: '1', content: "Hello World" },
      { user_id: '1', content: "It's me Akon" },
      { user_id: '2', content: "Let's eat food later on" },
      { user_id: '3', content: "Cheers" },
      { user_id: '2', content: "Coca Cola is the best" },
    ]);
  };