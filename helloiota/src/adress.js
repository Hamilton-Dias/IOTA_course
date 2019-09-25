const Iota = require('@iota/core')

//cat /dev/urandom |tr -dc A-Z9|head -c${1:-81}
//Comand to create seeds in Linux
const seed = 'WUXYHYPKGITMX9ONXOJHSBCVYUJALPCXEUFJYIJQCOZIWJEZIYDC9CNLXUOEQHQWFNVZVXHMLSLHJVAP9'
const security = 2
const checksum = true

for (let i=0; i<=10; i++) {
    console.log(Iota.generateAddress(seed, i, security, checksum))
}