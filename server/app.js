const { useEnv } = require("./utils/env");
useEnv();

const express = require("express");
const cors = require("cors");
const multer = require("multer");
const { sequelize } = require("./db/sequelize");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const instructorsRouter = require("./routes/auth");
const adminUsersRouter = require("./routes/admin/users");
const accountSelfRouter = require("./routes/account/self");
const rolesRouter = require("./routes/roles");
const examRouter = require("./routes/exam/exam");
const examsListRouter = require("./routes/examsList/examsList");
const examResultsRouter = require("./routes/examResults/examResults");

const { verifyToken, isAdminOrInstructor } = require("./middlewares/auth");
const { migrateRoles, migrateAdmin, migrateExams } = require("./db/migration");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

app.use("/", instructorsRouter);
app.use("/admin/users", verifyToken, adminUsersRouter);
app.use("/roles", verifyToken, rolesRouter);
app.use("/account/self", [verifyToken, isAdminOrInstructor], accountSelfRouter);
app.use("/exams-list", examsListRouter);
app.use("/exams", [verifyToken, upload.single("file")], examRouter);
app.use(
  "/examResults",
  [verifyToken, upload.single("file")],
  examResultsRouter
);
const port = process.env.PORT;

app.listen(port, () => {
  console.info(`Listening to ${port}`);
  sequelize
    .sync({ alter: false, force: false })
    .then(() =>
      migrateRoles().then(() => migrateAdmin().then(() => migrateExams()))
    )
    .catch((error) => console.log(error));
});
