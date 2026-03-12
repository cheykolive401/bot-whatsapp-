const { getUser, save } = require("../sistema/database")

module.exports = async function(sock,command,from,sender){

if(command!=="batalla") return

let user = getUser(sender)

let enemy = Math.floor(Math.random()*50)+20

let damage = Math.floor(Math.random()*100)

if(damage > enemy){

user.money += 50

save()

await sock.sendMessage(from,{
text:`⚔ Ganaste la batalla

Recompensa: 50 monedas`
})

}else{

await sock.sendMessage(from,{
text:"te la metieron por el chiquito"
})

}

}	
