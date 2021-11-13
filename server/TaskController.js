const { isValidObjectId } = require('mongoose');
const Tasks = require('./TaskModel');

const toDoController = {

  createTask(req, res) {
    console.log('in createCard');
    const { subject, description } = req.body;
    Tasks.create({ subject, description })
      .then(data => res.status(200).json(data))
      //.then((res) => res.status(200).json(res.locals.user))
      .catch(err => res.status(400).json({ err: err.message }));
  },

  getTasks(req, res) {
    console.log('in getTask');
    Tasks.find()
      .then(data => {
        console.log(data);
        if (data) res.send(data).status(200);
        else res.send({err: 'task not found'});
      })
      .catch(err => {
        //console.log('error when getting the student');
        err => res.send(err).status(400);
      });
  },

  // updateTask(req, res) {
  //   console.log('in updateTask');
  //   const newDescription = req.body.description;
  //   const newName = {};
  //   newName.firstName = req.body.firstName;
  //   Tasks.findOneAndUpdate(oldName, newName, { useFindAndModify: false, returnOriginal: false })
  //     .then(data => {
  //       if (data) res.send(data).status(200);
  //       else res.send('data not found');
  //     })
  //     .catch(err => {
  //       res.status(400).json({ err: err.message });
  //     });

  // },


  deleteTask(req, res) {
    console.log('in deleteTask');
    const id = req.params.id;
    console.log(id);
    Tasks.findOneAndDelete(`{_id : ObjectId(${id}) }`)
      .then(data => {
        res.sendStatus(200);
      })
      .catch(err => {
        res.status(400).json({ err: err.message });
      });
  },
};

module.exports = toDoController;
