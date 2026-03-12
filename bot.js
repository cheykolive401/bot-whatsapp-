const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const P = require("pino")
const qrcode = require("qrcode-terminal")

// COMANDOS
const menu = require("./comandos/menu")
const juegos = require("./comandos/juegos")
const rpg = require("./comandos/rpg")
const moderacion = require("./comandos/moderacion")

// NUEVOS SISTEMAS
const gacha = require("./comandos/gacha")
const memes = require("./comandos/memes")
const batalla = require("./comandos/batalla")

const prefix = "!"

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")
const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger:P({level:"silent"}),
auth:state,
browser:["AnimeBot","Chrome","1.0"]
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update",(update)=>{

const { connection, qr } = update

if(qr){
console.log("Escanea el QR:")
qrcode.generate(qr,{small:true})
}

if(connection==="open"){
console.log("🌸 AnimeBot conectado")
}

if(connection==="close"){
console.log("Conexión cerrada, reiniciando...")
startBot()
}

})

sock.ev.on("messages.upsert", async ({messages})=>{

const m = messages[0]
if(!m.message) return

const msg =
m.message.conversation ||
m.message.extendedTextMessage?.text

if(!msg) return

const from = m.key.remoteJid
const sender = m.key.participant || from

// moderación
moderacion(sock,msg,from)

// verificar prefijo
if(!msg.startsWith(prefix)) return

const command = msg.slice(1).split(" ")[0]

// comandos básicos
menu(sock,command,from,sender)
juegos(sock,command,from,sender)
rpg(sock,command,from,sender)

// sistemas avanzados
gacha(sock,command,from,sender)
memes(sock,command,from,sender)
batalla(sock,command,from,sender)

})

}

startBot()
