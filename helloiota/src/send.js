const Iota = require('@iota/core')
const Converter = require('@iota/converter')
const TransactionConverter = require('@iota/transaction-converter')

const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
})

const seed = 'WUXYHYPKGITMX9ONXOJHSBCVYUJALPCXEUFJYIJQCOZIWJEZIYDC9CNLXUOEQHQWFNVZVXHMLSLHJVAP9'

//One of the addresses genereted in adress.js
const outputAddress = 'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW'

//Three milestones deep in the Tangle for the Randon Walk
const depth = 3

//Dificulty of the PoW
//14 in Mainnet
//9 in Devnet
const minWeightMagnitude = 9

const tag = 'HAMILTONFIRSTMESSAGE'

//Always convert the message to Trytes!!
const message = Converter.asciiToTrytes('Hello IOTA!')

const transfers = [
   {
       value: 0,
       address: outputAddress,
       tag: tag,
       message: message
   }
]

iota.prepareTransfers(seed, transfers)
	//sendTrytes performs the tips selection, assemble the bundle, sends
	//to the full node where the PoW is performed
   .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
   .then(bundle => {
       console.log(bundle)
   })
   .catch(err => {
       console.log(err)
   })

//Copy and paste the bundle hash in the Tangle Explorer to see the transaction