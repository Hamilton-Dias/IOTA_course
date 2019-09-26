const Iota = require('@iota/core')
const Converter = require('@iota/converter')
const TransactionConverter = require('@iota/transaction-converter')

const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
})

const seed = 'WUXYHYPKGITMX9ONXOJHSBCVYUJALPCXEUFJYIJQCOZIWJEZIYDC9CNLXUOEQHQWFNVZVXHMLSLHJVAP9'
const outputAddress = 'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW'
const depth = 3
const minWeightMagnitude = 9
const tag = 'HAMILTONFIRSTMESSAGE'
const delay = 3000
const messages = {}

const query = {
   addresses: [outputAddress],
   tags: [tag]
}

const prompt = (question) => {
   return new Promise((resolve, reject) => {
       const { stdin, stdout } = process
       stdin.resume()
       stdout.write(question)
       stdin.on('data', data => resolve(data.toString().trim()))
       stdin.on('error', err => reject(err))
   })
}

const sendMessage = (transfers) => {
	iota.prepareTransfers(seed, transfers)
   .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
}

const findMessages = () => {
   iota.findTransactionObjects(query)
      .then(transactions => {
          transactions.map(transaction => {
              if (typeof messages[transaction.hash] == 'undefined') {
                   const msg = Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''))
                   messages[transaction.hash] = msg
                   console.log(msg)
               }
          })
      })
      .catch(err => {
          console.log(err)
      })
}

const firstPart = () =>{
	prompt("Enter a message:")
   .then(input => {
   		message = Converter.asciiToTrytes(input)

   		const transfers = [
   			{
       			value: 0,
       			address: outputAddress,
       			tag: tag,
       			message: message
   			}
		]

   		sendMessage(transfers)

   		return firstPart()
   })
   .catch(err => {
       console.log(err)
       process.exit()
   })
}

firstPart()

setInterval(() => findMessages(), delay)