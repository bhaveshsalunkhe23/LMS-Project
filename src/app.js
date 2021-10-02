const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("./db/conn");
const Register = require("./models/registers");
const { json } = require("express");
const { log } = require("console");

const port = process.env.PORT || 3000;


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get('/', (req,res) => {
    res.render("index")
});

app.get('/register', (req,res) => {
    res.render("register")
});

app.get('/login', (req,res) => {
    res.render("login")
});

//create new user in database
app.post('/register', async (req,res) => {
    try {
        
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if(password === cpassword){

            const registerStudent = new Register({
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                gender:req.body.gender,
                phone:req.body.phone,
                age:req.body.age,
                password:password,
                confirmpassword:cpassword   
         })
        
          console.log("the success part" + registerStudent);

         const token = await registerStudent.generateAuthToken();
         console.log("the token part" + token);
 
         const registered = await registerStudent.save();
         console.log("the page part" + registered);
         res.status(201).render("index");

        }else{
            res.send("Password aren't matching!")
        }


    } catch (error) {
        res.status(400).send(error);
        console.log("the error part page");
    }
});

// login check

app.post("/login", async(req, res) =>{
    try {
     
         const email = req.body.email;
         const password = req.body.password;
 
         const useremail = await Register.findOne({email:email});
 
         const isMatch = await bcrypt.compare(password, useremail.password);
 
         const token = await useremail.generateAuthToken();
         console.log("the token part" + token);
        
         if(isMatch){
             res.status(201).render("index");
         }else{
            res.send("invalid Password Details"); 
         }
     
    } catch (error) {
        res.status(400).send("invalid login Details")
    }
 })
 


app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})