import express from 'express';
import mysql from "mysql2";
import cors from "cors";

import os from "node:os"
import axios from 'axios';
import * as dotenv from 'dotenv'
import nodemailer from "nodemailer"
import { error } from 'node:console';

dotenv.config({ path: '../backend/.env' })

const transporter = nodemailer.createTransport({
    host: "smtp.mailersend.net",
    port: 2525,
    secure: false, // true for port 465, false for other ports
    auth: {
        user: process.env.msUser,
        pass: process.env.msPsw,
    },
});
const app = express();



const db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.psw,
    database: process.env.dbName

})
app.use(express.json())


//cors antaa "luvan" frontendille käyttää backendiä.
app.use(cors())
//näytetään localhost:8800 alla oleva teksti.
app.get("/", (req, res) => {
    console.log(process.env.dbName)
    res.json("hello from backend")
})
//get-metodilla haetaan queryn mukaisesti kaikki data memoryvalues taulusta.
app.get("/messages", (req, res) => {
    const q = "select * from messages left join login on messages.userid=login.id"
    //const q = "SELECT * FROM messages";
    db.query(q, (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json(data)


    })
})

//sql like query
app.get("/searchByKeyword/:key", (req, res) => {
    const q = "SELECT * FROM messages WHERE msgtxt LIKE ?"
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja val taulukossa (req.params.key)
    const val = [`%` + req.params.key + `%`]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})
//haku päivämäärän perusteella
app.get("/searchByDate/:date", (req, res) => {
    const q = "SELECT * FROM messages WHERE txtposttime = ?"
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.date]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)



    })
})
//haku id:n perusteella
app.get("/searchById/:id", (req, res) => {
    const q = "SELECT * FROM messages WHERE id = ?";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]

    db.query(q, [val], (err, data) => {
        if (err) return res.json("error")
        return res.json(data)
    })
})

app.get("/mostliked", (req, res) => {
    const q = "SELECT `id`, `msgtxt`, `likes` FROM messages WHERE likes=(SELECT MAX(likes) FROM messages)"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)

    })
})

app.get("/leastliked", (req, res) => {
    const q = "SELECT `id`, `msgtxt`, `unlike` FROM messages WHERE unlike=(SELECT MAX(unlike) FROM messages)"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)

    })
})

app.get("/searches", (req, res) => {
    const q = "SELECT `byid`, `bydate`, `bykeyword`, `byliked` FROM searches"
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)

    })
})

app.put("/postbylikes", (req, res) => {
    const q = "UPDATE  searches SET `byliked`=byliked+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/postbyid", (req, res) => {
    const q = "UPDATE  searches SET `byid`=byid+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/postbydate", (req, res) => {
    const q = "UPDATE  searches SET `bydate`=bydate+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.put("/postbykeyword", (req, res) => {
    const q = "UPDATE  searches SET `bykeyword`=bykeyword+1";
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

app.get("/dataToUpdate/:id", (req, res) => {
    const q = "SELECT * FROM messages WHERE id = ?"
    //re.params.id lukee endpointin parametrina olevan arvon. parametrin täytyy olla saman
    //niminen get.kutsussa ja reg.params.date
    const val = [req.params.id]

    db.query(q, [val], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })

})
//post metodi, eli tiedon lisäys
app.post("/messages", (req, res) => {
    const q = "INSERT INTO messages (`msgtxt`,`txtposttime`,`likes`,`unlike`,`userid`) VALUES (?)"
    //nämä arvot saadaan add komponentin statemuuttujasta, muuttujassa on message ja postdate
    //kentät, joihin talletetaan input-kentissä oleva data. viimeisenä oleva
    //luku nolla asetetaan oletusarvona kaikkiin uusiin postauksiin, että tykkäysten lasku
    //toimii
    const values = [req.body.message, req.body.postDate, 0, 0,req.body.userID]
    db.query(q, [values], (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json(data)

    })
})
var emailExist;
app.post("/register", (req, res) => {
    var email = req.body.email
    //lasketaan syötetyllä emaililla löytyvät tietueet
    const emailQuery = "SELECT COUNT (*) AS count FROM login WHERE email=?"
    db.query(emailQuery, [email], (error, result) => {

        const count = result[0].count
        emailExist = count === 1
        console.log(emailExist)
        //jos emailia ei ole ennestään niin luodaan uusi tili
        if (emailExist === false) {
            const q = "INSERT INTO login (`username`,`psw`,`email`) VALUES (?)"
            const values = [req.body.username, req.body.password, req.body.email]
            db.query(q, [values], (err, data) => {
                if (err) return res.json(err)
                //tämä palauttaa querylla haetun datan kannasta
                return res.json(data)

            })

        }
        if (emailExist) {
            return res.json("Email is already in use")
        }
    })

})




app.put("/like/:id", (req, res) => {
    //kasvatetaan likes sarakkeen arvoa aina yhdellä / per painikkeen klikkaus
    const q = "UPDATE messages SET `likes`= likes +1 WHERE id= ? "
    //req.params = /like endpoint ja id=/:id loppuosa
    const msgid = [req.params.id]
    db.query(q, [msgid], (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json(data)

    })
})

app.put("/update/:id", (req, res) => {
    const updateid = req.params.id
    console.log(updateid)
    const q = "UPDATE messages SET `msgtxt` = ?, `txtposttime` = ? WHERE id=?"
    const values = [req.body.message, req.body.postDate]
    db.query(q, [...values, updateid], (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json("updated")

    })
})

app.put("/updatepsw/:user", (req, res) => {
    //endpointin user parametri talletetaan user muuttujaan
    const user = req.params.user
    const q = "UPDATE login SET `psw` = ? WHERE username= ?"
    const values = [req.body.newPsw]
    db.query(q, [...values, user], (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json("updated")

    })
})

app.put("/unlike/:id", (req, res) => {
    //kasvatetaan likes sarakkeen arvoa aina yhdellä / per painikkeen klikkaus
    const q = "UPDATE messages SET `unlike`= unlike +1 WHERE id= ? "
    //req.params = /like endpoint ja id=/:id loppuosa
    const msgid = [req.params.id]
    db.query(q, [msgid], (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json(data)

    })
})

app.post("/login", (req, res) => {
    const q = "SELECT * FROM login WHERE username = ? AND psw = ?"
    //state muuttujiin talletetut arvot on tässä-
    const values = [req.body.userName, req.body.psw]

    db.query(q, [req.body.userName, req.body.psw], (err, data) => {
        if (err) return res.json("login failed")
        //jos datan pituus on suurempi kuin 0 merkkiä eli käytännössä jos syötetyt arvot
        //löytyvät
        if (data.length > 0) {
            console.log(data)
            return res.json(data)
        }
        else {
            return res.json("")
        }


    })
})


app.post("/check/:email", (req, res) => {
    const q = "SELECT `psw` FROM login WHERE email = ?"
    var mailAdd = req.params.email
    db.query(q, [req.params.email], (err, data) => {
        if (err) return res.json("email not found")
        //jos datan pituus on suurempi kuin 0 merkkiä eli käytännössä jos syötetyt arvot
        //löytyvät
        if (data.length > 0) {
            console.log(data)

            //main toteuttaa sähköpostin lähetyksen nodemailerin avulla
            main(mailAdd, data)
        }

    })
})
//poisto id:n perusteella.
app.delete("/messages/:id", (req, res) => {
    //parametrina oleva id talletetaan muuttujaan
    const msgid = req.params.id;
    const q = "DELETE FROM messages WHERE id=?"
    db.query(q, [msgid], (err, data) => {
        //jos virhe on true palautetaan error viesti.
        if (err) return res.json(err)
        //tämä palauttaa querylla haetun datan kannasta
        return res.json("deleted")


    })

})


app.listen(8800, () => {
    console.log("connection ok!")
})

app.get("/devicename", (req, res) => {
    return res.json({ device: os.hostname() })
})
//sähköpostin lähetys
async function main(mailAdd, psw) {
    //salasanan muunto objektista json-merkkijonoksi. Ilman tätä sähköpostin teksti olisi [object object] muodossa.
    var pswConvert = JSON.stringify(psw)
    const info = await transporter.sendMail({
        from: process.env.msAdd,
        to: mailAdd,
        subject: "Your password",
        text: pswConvert,

    });

    console.log("Message sent: %s", info.messageId);
    //main().catch(console.error);

}


