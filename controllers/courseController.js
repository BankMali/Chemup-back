const { Course, Lesson} = require("../models");

exports.addCourse = (req, res, next) => {
    const {input, lesson} = req.body
    const {name, price, timeMax, description} = input
    Course.create({
        name,
        price,
        timeMax ,
        description
    }).then(rs=> {
        lesson.map(el => el.courseId = rs.id)
        Lesson.bulkCreate(lesson)
    })

res.status(200).json({msg: "Create sussess"})
}


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
    Course.destroy({
      where: { id: id },
    })
      .then((rs) => {
        if (rs === 0) {
          throw new Error("Cannot Delete!!");
        }
        res.status(200).json({msg: "Delete sussess"})
      })
  };


exports.getAllCourse = async (req,res,next) => {
    const courses = await Course.findAll()
    res.status(200).json({courses})
}

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

