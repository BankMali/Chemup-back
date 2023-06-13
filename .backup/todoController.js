const { Todo, User} = require("../models");

exports.getAllTodos = (req, res, next) => {
  const { id } = req.user;
  Todo.findAll({
    where: { userId: id },
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.summaryTodo = (req, res, next) => {
  let countAll = Todo.count({
    where: { userId: req.user.id },
  });
  let countDone = Todo.count({
    where: {
      status: true,
      userId: req.user.id,
    },
  });
  let countUnDone = Todo.count({
    where: {
      status: false,
      userId: req.user.id,
    },
  });
  Promise.all([countAll, countDone, countUnDone]).then((rs) => {
    // console.log(rs)
    res.json({
      all: rs[0],
      done: rs[1],
      unDone: rs[2],
    });
  });
};


exports.getTodoById = (req, res, next) => {
  const { id } = req.params;
  Todo.findOne({
    attributes: ["title", "dueDate", "status"],
    where: { id: id },
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.createTodo = (req, res, next) => {
  // validation
  const { title, dueDate } = req.body;
  Todo.create({
    title: title,
    dueDate: dueDate,
    userId: req.user.id,
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.deleteTodo = (req, res, next) => {
  const { id } = req.params;
  Todo.destroy({
    where: { id: id },
  })
    .then((rs) => {
      if (rs === 0) {
        throw new Error("Cannot Delete!!");
      }
      res.json(rs);
    })
    .catch(next);
};



exports.updateTodo = (req, res, next) => {
  const { id } = req.params;
  // const {title, dueDate, status} = req.body
  Todo.update(
    { ...req.body, userId: req.user.id },
    {
      where: { id: id },
    }
  )
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

// แสดง todolist จากชื่อ user
//   /user?name=Andy

exports.getTodoByUser = (req, res, next) => {
  const { name } = req.query;
  User.findAll({
    attributes: { exclude: "password" },
    where: { name: name },
    include: {
      model: Todo,
      attributes: ["title", "dueDate", "status", "remainDay"],
    },
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};


// exports.doubleDelete = async (req, res, next) => {
//   const { id1, id2 } = req.params;

//   const t = await sequelize.transaction();

//   try {
//     let rs1 = await Todo.destroy({
//       where: { id: id1 },
//       transaction: t,
//     });
//     if (rs1 === 0) throw new Error("Cannot delete 1st id");
//     let rs2 = await Todo.destroy({
//       where: { id: id2 },
//       transaction: t,
//     });
//     if (rs2 === 0) throw new Error("Cannot delete 2nd id");
//     await t.commit();
//     res.json({ msg: `delete id: ${id1}, ${id2}` });
//   } catch (err) {
//     await t.rollback();
//     console.log("rollBack...");
//     next(err);
//   }
// };

// exports.doubleDelete2 = (req, res, next) => {
//   const { id1, id2 } = req.params;
//   let tsc;
//   sequelize
//     .transaction()
//     .then((t) => {
//       tsc = t;
//       return Todo.destroy({
//         where: { id: id1 },
//         transaction: tsc,
//       });
//     })
//     .then((rs) => {
//       if (rs === 0) throw new Error("cannot delete 1st id");
//       return Todo.destroy({
//         where: { id: id2 },
//         transaction: tsc,
//       });
//     })
//     .then((rs) => {
//       if (rs === 0) throw new Error("cannot delete 2nd id");
//       return tsc.commit();
//     })
//     .then(() => {
//       res.json({ msg: `delete id: ${id1}, ${id2}` });
//     })
//     .catch((err) => {
//       tsc.rollback().then(() => {
//         console.log("rollBack...");
//         next(err);
//       });
//     });
// };
