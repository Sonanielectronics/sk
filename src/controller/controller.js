var { Todo, Todo2, Todo3, Todo4 } = require("../model/schema");
const HTTP = require("../../constant/response.constant");

var path = require("path");
var nodemailer = require("nodemailer");

const session = require("express-session");

function sendEmail(to, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shzksklf315@gmail.com",
      pass: "hbsehwvznlahcxno",
    },
  });
  const mailOptions = {
    from: "your@email.com",
    to: to,
    subject: subject,
    html: text,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function between(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

class class1 {
  static a = async (req, res) => {
    try {
      if (req.session.Email) {
        if (req.session.Email == "shzksklf315@gmail.com") {
          var user = await Todo4.find({});
          var user2 = await Todo2.find({});
          res.render("Admin", { user, user2 });
        } else {
          res.render("User");
        }
      } else {
        res.redirect("Login");
      }
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static b = async (req, res) => {
    try {
      if (req.session.Email) {
        if (req.body.BetNumber && req.body.BetAmount) {
          var user = await Todo.find({ Email: req.session.Email });
          user[0].Coin = Number(user[0].Coin) + Number(req.body.BetAmount);
          user[0].save();
          var OriginalData = await Todo2.find({});
          var a = await OriginalData[0].GameArray[req.body.BetNumber];
          await a.push([req.session.Email, req.body.BetAmount]);
          OriginalData[0].GameArray[req.body.BetNumber] = a;
          await OriginalData[0].save();
          const message = "Bet Added";
          res.json({ message });
        }
      } else {
        res.redirect("Login");
      }
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static c = async (req, res) => {
    try {
      res.sendFile(path.join(__dirname, "../../index.html"));
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static d = async (req, res) => {
    try {
      var otp = between(100000, 999999);
      var sessionstore = req.session;
      sessionstore.Username = req.body.Username;
      sessionstore.Phone = req.body.Phone;
      sessionstore.VerifyEmail = req.body.Email;
      sessionstore.Otp = otp;
      sessionstore.save();
      sendEmail(`${req.body.Email}`, "Sending Email using Node.js", `${otp}`);
      res.json("Otp send");
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static e = async (req, res) => {
    try {
      if (Number(req.session.Otp) == Number(req.body.Otp)) {
        var sessionstore = req.session;
        sessionstore.Email = req.body.Email;
        sessionstore.save();
        var user = await Todo.find({ Email: req.session.VerifyEmail });
        if (user.length == 0) {
          var addingMensRecords = new Todo({
            Username: req.session.Username,
            Phone: req.session.Phone,
            Email: req.session.VerifyEmail,
            UpiId: "",
            Coin: 0,
          });
          await addingMensRecords.save();
          var user = {
            Username: req.session.Username,
            Phone: req.session.Phone,
            Email: req.session.VerifyEmail,
            UpiId: "",
            Coin: 0,
          };
        }
        res.json(user);
      } else {
        return res.status(500).send({
          errors: [
            {
              message: "Wrong Otp",
              code: HTTP.INTERNAL_SERVER_ERROR,
            },
          ],
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(404).send({
        errors: [
          {
            message: "Please Get Otp Again",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static g = async (req, res) => {
    try {
      res.render("User");
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static h = async (req, res) => {
    try {
      if (req.body.WinningNumber) {
        var WinningNumber = req.body.WinningNumber;
      } else {
        function between(min, max) {
          return Math.floor(Math.random() * (max - min) + min);
        }
        var WinningNumber = between(0, 12);
      }
      var OriginalData = await Todo2.find({});
      if (!OriginalData[0]) {
        let data = new Todo2({
          RemainingTime: 10,
          WinningNumber: WinningNumber,
          TotleGameTime: 25,
          GameArray: [
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
          ],
        });
        await data.save();
      } else if (OriginalData[0].RemainingTime == 0) {
        // var OriginalData = await Todo2.find({});
        // var TotleAmount;
        // for (var i = 0; i < OriginalData[0].GameArray.length; i++) {
        //   for (var j = 0; j < OriginalData[0].GameArray[i].User.length; j++) {
        //     TotleAmount =
        //       TotleAmount + OriginalData[0].GameArray[i].User[j].Amount;
        //   }
        // }
        // var PayAmount = TotleAmount * 0.8;
        // for (var k = 0; k < OriginalData[0].GameArray[i].User.length; k++) {
        //   TotleAmount =
        //     TotleAmount + OriginalData[0].GameArray[i].User[k].Amount;
        // }
        await Todo2.find({}).deleteOne();
        let data = new Todo2({
          RemainingTime: 10,
          WinningNumber: WinningNumber,
          TotleGameTime: 25,
          GameArray: [
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
            [["shzksklf315@gmail.com", 0]],
          ],
        });
        await data.save();
      } else {
      }
      const message = "Data Added";
      res.json({ message });
    } catch (err) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static i = async (req, res) => {
    var OriginalData = await Todo2.find({});
    for (var i = 0; i < OriginalData.length; i++) {
      if (OriginalData[i].RemainingTime > 0) {
        OriginalData[i].RemainingTime = OriginalData[i].RemainingTime - 1;
      }
      if (OriginalData[i].TotleGameTime > 0) {
        OriginalData[i].TotleGameTime = OriginalData[i].TotleGameTime - 1;
        OriginalData[i].save();
      } else {
        fetch(`http://${process.env.URL}/Add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
      }
    }
  };
  static j = async (req, res) => {
    try {
      var OriginalData = await Todo2.find({});
      res.send(OriginalData);
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static l = async (req, res) => {
    try {
      var OriginalData = await Todo2.find({});
      res.send(OriginalData);
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static m = async (req, res) => {
    try {
      if (req.session.Email) {
        var user = await Todo3.find({ Id: req.body.Id });
        var a = {
          Email: req.session.Email,
          Coin: req.body.Coin,
        };
        if (user.length == 0) {
          var addingMensRecords = new Todo3({
            Id: req.body.Id,
            Transaction: [a],
          });
          await addingMensRecords.save();
        } else {
          user[0].Transaction.push(a);
          user[0].save();
        }
        var user2 = await Todo.find({ Email: req.session.Email });
        user2[0].Coin = Number(user2[0].Coin) + Number(req.body.Coin);
        user2[0].save();
        res.send("Coin Purchase");
      } else {
        res.send("Please Login");
      }
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
  static n = async (req, res) => {
    try {
      if (req.session.Email) {
        var user = await Todo.find({ Email: req.session.Email });
        user[0].Coin = Number(user[0].Coin) + Number(req.body.Coin);
        user[0].save();
        var addingMensRecords = new Todo4({
          Email: req.session.Email,
          Amount: req.body.Coin,
        });
        await addingMensRecords.save();
        res.send("Order Purchase");
      } else {
        res.send("Please Login");
      }
    } catch (e) {
      console.log(err);
      return res.status(HTTP.SUCCESS).send({
        errors: [
          {
            message: "Something went wrong!",
            code: HTTP.INTERNAL_SERVER_ERROR,
          },
        ],
      });
    }
  };
}

module.exports = { class1 };
