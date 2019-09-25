const Iota = require('@iota/core')
const Converter = require('@iota/converter')

const iota = Iota.composeAPI({
   provider: 'https://nodes.devnet.iota.org:443'
})

const listenAddress = 'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW'
const tag = 'HAMILTONFIRSTMESSAGE';

//Criteria to find packages
//In this examples, we will find packages
//with this address and that tag
const query = {
   addresses: [listenAddress],
   tags: [tag]
}

const delay = 3000

//Start to find the packages
/*
iota.findTransactionObjects(query)
  .then(transactions => {
      transactions.map(transaction => {
           const msg = Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''));
           console.log(msg)
      })
  })
  .catch(err => {
      console.log(err)
  })
  */

//Keep listening for new messages
const messages = {}
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
setInterval(() => findMessages(), delay)