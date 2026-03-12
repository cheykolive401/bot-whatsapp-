const { getUser, save } = require("../sistema/database")
const { addXP } = require("../sistema/levels")

module.exports = async function(sock,command,from,sender){

let user = getUser(sender)

if(command==="perfil"){

await sock.sendMessage(from,{
text:`VIRGEN MOJA CAMA

Nivel: ${user.level}
EXP: ${user.exp}
Dinero: ${user.money}
Inventario: ${user.inventory.join(", ") || "vacío"}`
})

}

if(command==="trabajar"){

let now = Date.now()

if(now - user.lastWork < 60000){

await sock.sendMessage(from,{text:"⏳ espera 1 minuto"})
return
}

user.lastWork = now

let earn = Math.floor(Math.random()*80)+20

user.money += earn

let levelup = addXP(user,20)

save()

await sock.sendMessage(from,{
text:`💼 trabajaste y ganaste ${earn} monedas`
})

if(levelup){
await sock.sendMessage(from,{text:"✨ SUBISTE DE NIVEL"})
}

}

}
