module.exports = async function(sock,command,from){

if(command!=="meme") return

const memes = [

"https://i.imgur.com/W3WfF.png",
"https://i.imgur.com/Qr71crq.jpg",
"https://i.imgur.com/2ZQZ1.jpg"

]

let url = memes[Math.floor(Math.random()*memes.length)]

await sock.sendMessage(from,{
image:{url:url},
caption:"😂 meme"
})

}
