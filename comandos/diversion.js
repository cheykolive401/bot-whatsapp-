module.exports = async function(sock,command,from){

if(command==="meme"){

const memes = [
"Cuando el código funciona",
"Programador vs bug",
"Arreglas un error y aparecen 3",
"Node rompiendo todo"
]

let meme = memes[Math.floor(Math.random()*memes.length)]

await sock.sendMessage(from,{
text:`😂 MEME

${meme}`
})

}

if(command==="gacha"){

const waifus = [
"Rem",
"Asuna",
"Zero Two",
"Mikasa",
"Nezuko"
]

let waifu = waifus[Math.floor(Math.random()*waifus.length)]

await sock.sendMessage(from,{
text:`🎰 GACHA

Te salió: ${waifu}`
})

}

}
