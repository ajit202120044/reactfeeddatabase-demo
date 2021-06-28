const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

mongoose.connect('mongodb+srv://ajit:ajitkumar@cluster0.it1tr.mongodb.net/feedback?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
.then(console.log("DB connected"))
.catch(err => console.log(err))


const feedbackSchema = new mongoose.Schema({
    name:String,  
     feedback:String
 
})


const Feedback = mongoose.model("feedback", feedbackSchema )

app.post('/createFeeds', async(req,res)=>{

    let nm = req.body.name;
    let fb = req.body.feedback;
  
    let newfeed = new Feedback({name: nm, feedback: fb});
    
    let result = await newfeed.save();
    console.log(result);
    if(result!==''){
      res.send({data:result})
    }else{
      res.send({"error": 'no'})
    }
    
  })


  
  app.get("/getFeeds", async (req, res) => {
    let allfeed = await Feedback.find();
    console.log(allfeed);
    if(allfeed!==[]){
      res.status(200).send(allfeed)
    }else{
      res.status(400).send({error:"dont know "})
    }
  });

//listening to backend server Express at port
app.listen(3005, ()=>console.log("Connected to server and listing on 3005"))


