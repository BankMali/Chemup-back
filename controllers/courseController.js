const { Course, Lesson } = require("../models");

exports.addCourse = (req, res, next) => {
  try {
    const { input, lesson } = req.body;
    const { name, price, timeMax, description } = input;
    // console.log("dqwdqwdqw");
    const result = Course.create({
      name,
      price,
      timeMax,
      description,
    })
      .then((rs) => {
        // lesson.map((el) => (el.courseId = rs.id));
        // console.log(lesson);
        // Lesson.bulkCreate(lesson);
        console.log(rs);
        for (let item of lesson) {
          Lesson.create({ lessonName: item.lessonName, courseId: rs.id });
          // console.log(item);
        }
      })
      .catch((err) => next(err));

    res.status(200).json({ msg: "sucess" });
  } catch (error) {
    next(error);
  }
};

// exports.createPlaylist = (req, res, next) => {
//     // validation
//     const {input, inputChordlist} = req.body
//     const {musicName, youtubeEmbed} = input
//     Playlist.create({
//         musicName,
//         youtubeEmbed,
//         userId: req.user.id
//     }).then(rs=> {
//         inputChordlist.map(el => el.playlistId = rs.id)
//         Chordlist.bulkCreate(inputChordlist)
//         res.json(rs)
//     })

exports.deleteCourse = (req, res, next) => {
  const { id } = req.params;
  Lesson.destroy({ where: { courseId: id } })
    .then(() => Course.destroy({ where: { id } }))
    .then((rs) => {
      if (rs === 0) {
        throw new Error("Cannot Delete!!");
      }
      res.status(200).json({ msg: "Delete sussess" });
    });
  // Course.destroy({
  //   where: { id: id },
  // }).then((rs) => {
  //   if (rs === 0) {
  //     throw new Error("Cannot Delete!!");
  //   }
  //   res.status(200).json({ msg: "Delete sussess" });
  // });
};

// exports.getAllCourse = async (req, res, next) => {
//   const courses = await Course.findAll();
//   res.status(200).json({ courses });
// };

exports.getAllCourse = (req, res, next) => {
  Course.findAll({
    include: [
      {
        model: Lesson,
        attributes: ["lessonName"],
      },
    ],
  })

    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.getCourseById = (req, res, next) => {
  const { id } = req.params;
  Course.findOne({
    attributes: ["name", "description", "price", "timeMax"],
    where: { id: id },
  })
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

exports.updateCourse = (req, res, next) => {
  const { id } = req.params;
  Course.update(
    { ...req.body },
    {
      where: { id: id },
    }
  )
    .then((rs) => {
      res.json(rs);
    })
    .catch(next);
};

// exports.searchPlaylist = (req, res , next) => {
//   const {search} = req.body
//   Playlist.findAll({
//       include:[{
//           model: User, attributes:["username"]
//       }],
//       where:{musicName:{
//           [Op.like]:`%${search}%`
//       }}
//   }).then((rs) => {
//       res.json(rs);
//     })
//     .catch(next);
// }

// exports.searchPlaylist = (req, res, next) => {
//   const { search } = req.body;
//   Playlist.findAll({
//     include: [
//       {
//         model: User,
//         attributes: ["username"],
//       },
//     ],
//     where: {
//       musicName: {
//         [Op.like]: `%${search}%`,
//       },
//     },
//   })
//     .then((rs) => {
//       res.json(rs);
//     })
//     .catch(next);
// };

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
