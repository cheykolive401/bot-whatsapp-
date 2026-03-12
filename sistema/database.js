const fs = require("fs")

const DB_FILE = "./database.json"

let db = { users:{} }

// cargar base de datos si existe
if(fs.existsSync(DB_FILE)){
try{
db = JSON.parse(fs.readFileSync(DB_FILE))
}catch{
db = { users:{} }
}
}

// asegurar que users exista
if(!db.users){
db.users = {}
}

function save(){
fs.writeFileSync(DB_FILE, JSON.stringify(db,null,2))
}

function getUser(id){

if(!db.users[id]){

db.users[id] = {
money:100,
exp:0,
level:1,
inventory:[],
lastWork:0
}

save()

}

return db.users[id]

}

module.exports = { getUser, save }
