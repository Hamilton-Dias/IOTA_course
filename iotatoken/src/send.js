const Iota = require('@iota/core')
const Converter = require('@iota/converter')

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})

const seed = 'WUXYHYPKGITMX9ONXOJHSBCVYUJALPCXEUFJYIJQCOZIWJEZIYDC9CNLXUOEQHQWFNVZVXHMLSLHJVAP9'
const inputAddress = 'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW'
const outputAddress = 'PRDHRLCYWYRFBHD9CQXBKMSNAPLSWNZTLJPKTNIKHGGBITWUEAXXAFLBGORKT9E9JGZKQMGBLJPQJRTSAVLLIVVTGB'
const tag = 'HAMILTONTOKENTOP'
const depth = 3
const minWeightMagnitude = 9

const transfers = [
    {
        value: 1,
        address: outputAddress,
        tag: tag
    }
]

const options = {
    inputs: [
        {
            address: inputAddress,
            keyIndex: 0,
            security: 2,
            balance: 1
        }
      ], 
    remainderAddress: 'LLGABSEYHOXDWHNIUBYWTDYUSEDKMNM9A99KAPMQI9AXYIURAIDZT9VT9PNMAJUNKMYHELZUTDCMQNTLDCTYYYRTHD'
}

iota.prepareTransfers(seed, transfers, options)
    .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
    .then(bundle => {
        console.log(bundle)
    })
    .catch(err => {
        console.log(err)
    })
