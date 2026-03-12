const { default: makeWASocket, useMultiFileAuthState, fetchLatestBaileysVersion } = require("@whiskeysockets/baileys")
const qrcode = require("qrcode-terminal")
const P = require("pino")

const menu = require("./comandos/menu")
const rpg = require("./comandos/rpg")
const juegos = require("./comandos/juegos")
const moderacion = require("./comandos/moderacion")

async function startBot(){

const { state, saveCreds } = await useMultiFileAuthState("session")
const { version } = await fetchLatestBaileysVersion()

const sock = makeWASocket({
version,
logger: P({ level: "silent" }),
auth: state,
browser: ["AnimeBot","Chrome","1.0"],
printQRInTerminal: false
})

sock.ev.on("creds.update", saveCreds)

sock.ev.on("connection.update", (update) => {

const { connection, lastDisconnect, qr } = update

if(qr){
console.log("Escanea este QR:")
qrcode.generate(qr, { small: true })
}

if(connection === "connecting"){
console.log("Conectando a WhatsApp...")
}

if(connection === "open"){
console.log("🌸 AnimeBot conectado")
}

if(connection === "close"){

const reason = lastDisconnect?.error?.output?.statusCode

console.log("Conexión cerrada:", reason)

if(reason !== 401){
console.log("Reintentando conexión...")
startBot()
}else{
console.log("Sesión inválida. Borra la carpeta session.")
}

}

})

sock.ev.on("messages.upsert", async ({ messages }) => {

const msg = messages[0]
if(!msg.message) return

const from = msg.key.remoteJid
const body =
msg.message.conversation ||
msg.message.extendedTextMessage?.text ||
""

if(body.startsWith("!menu")) menu(sock, msg, from)
if(body.startsWith("!rpg")) rpg(sock, msg, from)
if(body.startsWith("!juego")) juegos(sock, msg, from)

moderacion(sock, msg, from)

})

}

startBot()
