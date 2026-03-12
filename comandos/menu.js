module.exports = async function(sock,command,from){

if(command!=="menu") return

await sock.sendMessage(from,{
text:`🌸 ANIME RPG BOT 🌸

👤 RPG
!perfil
!trabajar

⚔ BATALLA
!batalla

🎴 GACHA
!gacha

😂 MEMES
!meme

🎮 JUEGOS
!dados
!coinflip

⚙ UTILIDAD
!ping

✨ Nivel automático
💾 progreso guardado`
})

}
