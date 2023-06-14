const { Lesson } = require("../models");

exports.addLesson = (req, res, next) => {
  const [{ name }] = req.body;
  Lesson.create({
    name,
  });
  res.status(200).json({ msg: "Create sussess" });
};

exports.deleteLesson = (req, res, next) => {
  const { id } = req.params;
  Lesson.destroy({
    where: { id: id },
  }).then((rs) => {
    if (rs === 0) {
      throw new Error("Cannot Delete!!");
    }
    res.status(200).json({ msg: "Delete sussess" });
  });
};

exports.getAllLesson = async (req, res, next) => {
  const lessons = await Lesson.findAll();
  res.status(200).json({ lessons });
};

exports.getLessonById = (req, res, next) => {
  const { id } = req.params;
  Lesson.findAll({
    attributes: ["lessonName"],
    where: { courseId: id },
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.updateLesson = (req, res, next) => {
  const lesson = req.body;
  const { id } = req.params;
  Lesson.destroy({
    where: { courseId: id },
  })
    .then((rs) => {
      lesson.map((el) => (el.courseId = id));
      Lesson.bulkCreate(lesson);
      res.json(rs);
    })
    .catch(next);
};

// exports.updateUser = (req, res, next) => {
//     const { id } = req.params;
//     User.update(
//       { ...req.body, userId: req.user.id },
//       {
//         where: { id: id },
//       }
//     )
//       .then((rs) => {
//         res.json(rs);
//       })
//       .catch(next);
//   };
