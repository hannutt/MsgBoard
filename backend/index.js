import express from 'express';
import mysql from "mysql2";
import cors from "cors";
import Mailgun from 'mailgun.js';
//const mailgun = require('mailgun-js');
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

//sql like query
app.get("/searchByKeyword/:key",(req,res)=>{
    const q = "SELECT * FROM messages WHERE msgtxt LIKE ?"
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja val taulukossa (req.params.key)
    const val = [`%` +req.params.key+ `%`]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/searchByDate/:date",(req,res)=>{
    const q = "SELECT * FROM messages WHERE txtposttime = ?"
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.date]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/searchById/:id",(req,res)=>{
    const q = "SELECT * FROM messages WHERE id = ?";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/mostliked",(req,res)=>{
    const q = "SELECT `id`, `msgtxt`, `likes` FROM messages WHERE likes=(SELECT MAX(likes) FROM messages)"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)

    })
})

app.get("/leastliked",(req,res)=>{
    const q = "SELECT `id`, `msgtxt`, `unlike` FROM messages WHERE unlike=(SELECT MAX(unlike) FROM messages)"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)

    })
})

app.get("/searches",(req,res)=>{
    const q = "SELECT `byid`, `bydate`, `bykeyword` FROM searches"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
            return res.json(data)

    })
})

app.put("/postbyid",(req,res)=>{
    const q = "UPDATE  searches SET `byid`=byid+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/postbydate",(req,res)=>{
    const q = "UPDATE  searches SET `bydate`=bydate+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.put("/postbykeyword",(req,res)=>{
    const q = "UPDATE  searches SET `bykeyword`=bykeyword+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.get("/dataToUpdate/:id",(req,res)=>{
    const q = "SELECT * FROM messages WHERE id = ?"
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]
    
    db.query(q,[val],(err,data)=>{
        if(err) return res.json(err)
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

app.post("/register",(req,res)=>{
    const q = "INSERT INTO login (`username`,`psw`,`email`) VALUES (?)"
    const values = [req.body.username,req.body.password,req.body.email]
    db.query(q,[values],(err,data)=>{
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

app.put("/update/:id",(req,res)=>{
    const updateid=req.params.id
    console.log(updateid)
    const q = "UPDATE messages SET `msgtxt` = ?, `txtposttime` = ? WHERE id=?"
    const values=[req.body.message,req.body.postDate] 
    db.query(q,[...values,updateid],(err,data)=>{
        //jos virhe on true palautetaan error viesti.
        if(err) return res.json(err)
           //tämä palauttaa querylla haetun datan kannasta
           return res.json("updated")

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
            //jos datan pituus on suurempi kuin 0 merkkiä eli käytännössä jos syötetyt arvot
        //löytyvät
        if (data.length>0) {
            return res.json("login ok")
        }
            

    })
})

app.post("/check",(req,res)=>{
    const q = "SELECT `psw` FROM login WHERE email = ? AND username = ?"
    //const values = [re.body.emailAdd]
    db.query(q,[req.body.emailAdd,req.body.user],(err,data)=>{
        if(err) return res.json("email not found")
            //jos datan pituus on suurempi kuin 0 merkkiä eli käytännössä jos syötetyt arvot
        //löytyvät
        if (data.length>0) {
            return res.json(data)
        }
        else if (data.length<=0)
            return res.json(data)
            

    })
})
//poisto id:n perusteella.
app.delete("/messages/:id",(req,res)=>{
    //parametrina oleva id talletetaan muuttujaan
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