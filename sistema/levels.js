const { save } = require("./database")

function addXP(user, amount){

user.exp += amount

let needed = user.level * 100

if(user.exp >= needed){

user.level++
user.exp = 0

return true
}

save()

return false

}

module.exports = { addXP }
