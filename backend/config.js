var config = {}
config.puerto = 3000
config.db = "frank"

config.EnabledCors = true
config.origins =[
   'http://localhost:4200'
];
module.exports.config = config