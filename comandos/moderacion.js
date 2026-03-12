module.exports = async function(sock,msg,from){

if(!msg) return

if(msg.includes("chat.whatsapp.com")){

await sock.sendMessage(from,{
text:"🚫 Links de grupos no permitidos"
})

}

}
