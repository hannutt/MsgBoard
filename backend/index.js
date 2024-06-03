import express from 'express';
import mysql from "mysql2";
import cors from "cors";
const app = express();


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Root512!",
    database:"msgdb"
    
})
app.use(express.json())

//cors antaa "luvan" frontendille käyttää backendiä.
app.use(cors())
//näytetään localhost:8800 alla oleva teksti.
app.get("/",(req,res)=>{
    res.json("hello from backend")
})
//get-metodilla haetaan queryn mukaisesti kaikki data memoryvalues taulusta.
app.get("/messages",(req,res)=>{
    const q = "SELECT * FROM messages";
    db.query(q,(err,data)=>{
        //jos virhe on true palautetaan error viesti.
        if(err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json(data)


    })
})
//post metodi, eli tiedon lisäys
app.post("/messages",(req,res)=>{
    const q = "INSERT INTO messages (`msgtxt`,`txtposttime`,`likes`,`unlike`) VALUES (?)"
    //nämä arvot saadaan add komponentin statemuuttujasta, muuttujassa on message ja postdate
    //kentät, joihin talletetaan input-kentissä oleva data. viimeisenä oleva
    //luku nolla asetetaan oletusarvona kaikkiin uusiin postauksiin, että tykkäysten lasku
    //toimii
    const values = [req.body.message,req.body.postDate,0,0]
    db.query(q,[values],(err,data)=>{
         //jos virhe on true palautetaan error viesti.
         if(err) return res.json(err)
            //tämä palauttaa querylla haetun datan kannasta
            return res.json(data)

    })
})
app.put("/like/:id",(req,res)=>{
    //kasvatetaan likes sarakkeen arvoa aina yhdellä / per painikkeen klikkaus
    const q = "UPDATE messages SET `likes`= likes +1 WHERE id= ? "
    //req.params = /like endpoint ja id=/:id loppuosa
    const msgid = [req.params.id]
    db.query(q,[msgid],(err,data)=>{
         //jos virhe on true palautetaan error viesti.
         if(err) return res.json(err)
            //tämä palauttaa querylla haetun datan kannasta
            return res.json(data)

    })
})

app.put("/unlike/:id",(req,res)=>{
    //kasvatetaan likes sarakkeen arvoa aina yhdellä / per painikkeen klikkaus
    const q = "UPDATE messages SET `unlike`= unlike +1 WHERE id= ? "
    //req.params = /like endpoint ja id=/:id loppuosa
    const msgid = [req.params.id]
    db.query(q,[msgid],(err,data)=>{
         //jos virhe on true palautetaan error viesti.
         if(err) return res.json(err)
            //tämä palauttaa querylla haetun datan kannasta
            return res.json(data)

    })
})

app.post("/login",(req,res)=>{
    const q = "SELECT * FROM login WHERE username = ? AND psw = ?"
    //state muuttujiin talletetut arvot on tässä-
    const values = [req.body.userName,req.body.psw]

    db.query(q,[req.body.userName,req.body.psw],(err,data)=>{
        if(err) return res.json("login failed")
        if (data.length>0) {
            return res.json("login ok")
        }
            

    })
})
//poisto id:n perusteella.
app.delete("/messages/:id",(req,res)=>{
    const msgid = req.params.id;
    const q="DELETE FROM messages WHERE id=?"
    db.query(q,[msgid],(err,data)=>{
        //jos virhe on true palautetaan error viesti.
        if(err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json("deleted")


    })

})
app.listen(8800,()=>{
    console.log("connection ok!")
})