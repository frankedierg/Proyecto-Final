var config = {}
config.puerto = 3000
config.db = "frank"
config.emailpass = "wacjgettnyrzrvkc"
config.sessionsecret = "abcd123456"

config.EnabledCors = true
config.origins =[
   'http://localhost:4200'
  // 'chrome-extension://'
];
module.exports.config = config