//Importin IOTA module CORE
const Iota = require('@iota/core')

//Referente to the IOTA API object
const iota = Iota.composeAPI({
	//Adress and Port of a full node
	provider: 'https://nodes.devnet.iota.org:443'
})

//Get the full node's info
iota.getNodeInfo()
   .then(info => console.log(info))
   .catch(err => console.log(err))