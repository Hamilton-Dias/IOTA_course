const Iota = require('@iota/core')
const Converter = require('@iota/converter')

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})

transactions_hashes = []

const prompt = (question) => {
   return new Promise((resolve, reject) => {
       const { stdin, stdout } = process
       stdin.resume()
       stdout.write(question)
       stdin.on('data', data => resolve(data.toString().trim()))
       stdin.on('error', err => reject(err))
   })
}

const autoPromoteReattach = (tail) => {

	if (tail == undefined){
		return
	}

  	prompt("P (promote) \n R (reattach) \n E (exit) ")
  	.then( input => {
  		switch(option){
			case 'P':
				iota.promoteTransaction(tail, 3, 14)
				.then(()=> {
					console.log(`Promoted transaction hash: ${tail}`);
					process.exit()
				})
				break;
			case 'R':
				iota.replayBundle(tail, 3, 14)
				.then(([reattachedTail]) => {
				const newTailHash = reattachedTail.hash;

				console.log(`Reattached transaction hash: ${tail}`);

				// Keep track of all reattached tail transaction hashes to check for confirmation
				tail.push(newTailHash);
				})
				break;
			default:
				process.exit()
	}
  	})
}

var timer = setInterval( function() {
	autoPromoteReattach (transactions_hashes);
	}, 6000 );

const firstPart = () =>{
	prompt("Enter the hash of a tail transaction: ")
   .then(input => {

   		transactions_hashes.push(input)

   		iota.getLatestInclusion(transactions_hashes)
   			.then(states => {
   				var len = states.length;
   				for (var i = 0; i < len; i++){
   					if (states[i] == true){
   						transactions_hashes.splice(i, 1)
   					}
   					else{
   						clearInterval(timer);
   						autoPromoteReattach(transactions_hashes[i])
   					}
   				}
   			});

   		return firstPart()
   })
   .catch(err => {
       console.log(err)
       process.exit()
   })
}

firstPart()