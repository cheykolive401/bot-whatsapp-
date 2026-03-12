const { getUser, save } = require("../sistema/database")

const characters = [

{name:"Rem",rare:"⭐⭐⭐⭐⭐"},
{name:"Zero Two",rare:"⭐⭐⭐⭐⭐"},
{name:"Mikasa",rare:"⭐⭐⭐⭐"},
{name:"Nezuko",rare:"⭐⭐⭐⭐"},
{name:"Sakura",rare:"⭐⭐⭐"},
{name:"Hinata",rare:"⭐⭐⭐"}

]

module.exports = async function(sock,command,from,sender){

if(command!=="gacha") return

let user = getUser(sender)

let pull = characters[Math.floor(Math.random()*characters.length)]

user.inventory.push(pull.name)

save()

await sock.sendMessage(from,{
text:`🎴 GACHA

Obtuviste:

${pull.name}
Rareza: ${pull.rare}`
})

}
