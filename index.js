const express = require("express");
const app = express();
const ejs = require("ejs");
const PORT = process.env.PORT || 5001;
const users = require("./data/data");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("pages/home.ejs")
});


//GET
app.get("/users", (req, res) => {
    res.send({ message: "All data users", data: users });
});

app.get("/users/filterByStudentidnumber/:studentidnumber", (req, res) => {
    const { studentidnumber } = req.params;

    const filterByStudentidnumber = users.filter(
        (user) => user.studentidnumber.toLowerCase() === studentidnumber.toLowerCase()
    );

    res.send({
        message: `All data users by studyidnumber: ${studentidnumber}`,
        data: filterByStudentidnumber,
    });
});
//POST
app.post("/users", (req,res)=>{
    const{ name, studentidnumber, major} = req.body;
    const id = users[users.length - 1].id +1;
    users.push({ id, name, studentidnumber, major});
    res.send({
        message: "Your data is successfully Inputed",
        data: users,
    });
});

//PUT
app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, studentidnumber, major } = req.body;
    const usersID = users.findIndex((user) => user.id === parseInt(id));
    const newData = {
        name,
        studentidnumber,
        major,
        id: parseInt(id),
    };

    users.splice(usersID, 1, newData);

    res.send({ message: "Your data is successfully Updated", data: users });
});

app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    const usersID = users.findIndex((user) => user.id === parseInt(id));

    users.splice(usersID, 1);

    res.send({ message: "Your data is successfully Updated", data: users });
});

app.listen(PORT, () => {
    console.log(`this app listen on part PORT: ${PORT}`);
});