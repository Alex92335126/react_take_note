

/**********************************************
 * Routing for the NoteApplication
 * ==================================
 ***********************************************/
// Setup a NoteRouter class which takes the note service as a dependency, that was we can inject the NoteService when we use our Router. As this is not a hard coded value we will need to inject the noteService for every instance of the note router.
class NoteRouter {
  constructor(noteService, express) {
    this.noteService = noteService;
    this.express = express;
  }
  // This utilises the express Router method, basically we are binding the path/ request to each restful verb
  router() {
    let router = this.express.Router();
    // bind the different methods (if not using arrow function, should bind the method to the class)
    // e.g., router.get("/", this.get.bind(this));
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.delete("/:id", this.delete);
    return router;
  }

  /** # GET Method   #
/*  ====================== */
  //   1) Create a get method
  //   when the route is "/"
  //   Here we handle what will occur when we have been sent down a particular path, this path is '/' - we will just list all of the notes, that match our(req.auth.user)
  get(req, res) {
    console.log('hi get data')
    let user = req.user;
    console.log(req.user)
    console.log("auth user", user); 
    return (
      this.noteService
        .list(user)

        // list out all the notes from the user
        // What we do with the information that we receive, here we send the notes back in JSON format.
        .then((notes) => {
          res.json(notes);
        })
        // This .catch is to handle any errors that may befall our project.
        .catch((err) => {
          // Catch error
          res.status(500).json(err);
        })
    );
  }

  getUserNotes(req, res) {
    console.log('userid', req.body)

  }

  /** # Post Method   #
/*  ====================== */
  // 2) Create a post method
  async post(req, res) {
    console.log('HI post note router', req.body)
    let user = req.user;
    try {
      const add = await this.noteService.add(req.body.content, user)
      res.json(add)
    } catch (error) {
      res.status(500).json(error)
    }
    // return (
    //   this.noteService
    //     .add(req.body.content, user)
    //     // call the add method here and pass note and user
    //     .then(() => {
    //       // list the notes of the user
    //       return this.noteService.list(user);
    //     })
    //     .then((notes) => {
    //       // make the notes into json format
    //       res.json(notes);
    //     })
    //     .catch((err) => {
    //       // Catch error
    //       res.status(500).json(err);
    //     })
    // );
  }

  /** # PUT Method   #
  /*  ====================== */
  // 3) Create a put method, which updates our json file
  // Here we handle our put request, which has an id as a parameter (req.params.id), the body of the updated note (req.body.note) and the user who's note we want to update (req.auth.user)
  put(req, res) {
    let id = req.params.id;
    let note = req.body.note;
    let user = req.auth.user;
    console.log("id", id);
    //return this.noteService;
    return (
      this.noteService
        .update(id, note, user)
        // The noteService fires the update command, this will update our note (and our JSON file). Pass id, note and user as argument

        .then(() => {
          // list the notes of the user
          return this.noteService.list(user);
        })
        .then((notes) => {
          // make the notes into json format
          res.json(notes);
        })
        .catch((err) => {
          // Catch error
          res.status(500).json(err);
        })
    );
  }
  /** # DELETE Method   #
  /*  ====================== */
  // 4) Create a delete method

  delete = async (req, res) => {
    let id = req.params.id;
    // let user = req.user;
    try {
      const deletedId = await this.noteService.remove(id)
      if(deletedId) {
        res.json(id)
      } else {
        res.status(500).json("something wrong")
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
  // async delete(req, res) {
  //   let id = req.params.id;
  //   let user = req.user;
  //   return (
  //     this.noteService
  //       .remove(id, user)

  //       // first remove the note. Pass id and user as argument
  //       .then(() => {
  //         // list the notes of the user
  //         return this.noteService.list(user);
  //       })
  //       .then((notes) => {
  //         // make the notes into json format
  //         res.json(notes);
  //       })
  //       .catch((err) => {
  //         // Catch error
  //         res.status(500).json(err);
  //       })
  //   );
  // }
}

module.exports = NoteRouter;
