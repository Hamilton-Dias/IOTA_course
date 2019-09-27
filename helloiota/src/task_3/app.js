var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const Iota = require('@iota/core')
const Converter = require('@iota/converter')
const TransactionConverter = require('@iota/transaction-converter')

var clients = {}; 

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

app.get('/', function(req, res){
  res.send('server is running');
});

io.on("connection", function (client) {
    client.on("join", function(name){
    	console.log("Joined: " + name);
        clients[client.id] = name;
        client.emit("update", "You have connected to the server.");
        client.broadcast.emit("update", name + " has joined the server.");
        setInterval(() => findMessages(client), delay)
    });

    client.on("send", function(msg){
    	console.log("Message: " + msg);
        client.broadcast.emit("chat", clients[client.id], msg);
        message = Converter.asciiToTrytes(msg)

        const transfers = [
            {
                value: 0,
                address: outputAddress,
                tag: tag,
                message: message
            }
        ]

        sendMessage(transfers)
    });

    client.on("disconnect", function(){
    	console.log("Disconnect");
        io.emit("update", clients[client.id] + " has left the server.");
        delete clients[client.id];
    });
});


http.listen(8888, function(){
  console.log('listening on port 8888');
});

const sendMessage = (transfers) => {
    iota.prepareTransfers(seed, transfers)
   .then(trytes => iota.sendTrytes(trytes, depth, minWeightMagnitude))
}

const findMessages = (client) => {
   iota.findTransactionObjects(query)
      .then(transactions => {
          transactions.map(transaction => {
              if (typeof messages[transaction.hash] == 'undefined') {
                   const msg = Converter.trytesToAscii(transaction.signatureMessageFragment.replace(/9*$/, ''))
                   messages[transaction.hash] = msg
                   console.log(msg)
                   client.emit("chat", clients[client.id], msg);
               }
          })
      })
      .catch(err => {
          console.log(err)
      })
}