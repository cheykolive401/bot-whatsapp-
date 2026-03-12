module.exports = async function(sock,command,from){

if(command==="ping"){
await sock.sendMessage(from,{text:"⚡ Pong"})
}

if(command==="dados"){

let roll = Math.floor(Math.random()*6)+1

await sock.sendMessage(from,{
text:`🎲 Sacaste ${roll}`
})

}

if(command==="coinflip"){

let win = Math.random()<0.5

await sock.sendMessage(from,{
text: win ? "🪙 Cara ganaste" : "💀 Cruz perdiste"
})

}

}
