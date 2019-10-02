const Iota = require('@iota/core')
const Converter = require('@iota/converter')

const iota = Iota.composeAPI({
    provider: 'https://nodes.devnet.iota.org:443'
})

addresses = [
	'XVFJNZOZXGYWR9HFYG9WCJTLZ9HUZOPVAIIYIQNNYVVXG9VQQMKDCSIRIRQVXPBEVE99SAWGFJAWCLSHCTNONGQWDW',
	'EYQHBQJRIGVYCHOKVQJBT9BBHCYPKDJBADOGNMMSNUMBWWGHNFTQRKYWYMAMCLIQBX9QCVHVZCKKKKBBCVXZUNQGBZ',
	'BSWKLGTVQBHGSXWNHAOA9FOJJWAXPZOLXDVRWYOUYVSTUQMXXNYGIWQFBDOYAQODVCQOITMJVXAKBDHPWAHVRLFINA',
	'NPGNNRBCTRSPLWF9WGIXROCGJQBAGWJMCNYCEAJUWO9PEQYYDGGBI9PQHSREB9XLEWARTNINFIGMRKFY9QCZGZVMQD',
	'BCV9ZGHYNPGGODSVZHSGKAAGESXSVETIHTU9EKYZVKPPATTUDQFUJDSGTEVHMYVFYSMFWNAUCFNZKGKCDSLUITSPWD',
	'KBUYECKLNDVCGWGRJXQQTBDKTJBJAEUOPLKRJQFMQDOHZUPNPQWBGGEEDTEXQUXE9GLDUMVTRXAWVDUTAPD9IZNBVD',
	'9ASXRBKSLXBLLVLA99MYRBLHDLCCOFYCZNTEGYGCHHAXFMGHVKZSSUXXCGUMTVEKHOYKTZLCCTJQTTLZ9PESBEEWEZ',
	'EHGDWOPOMJRFBJOOEPQUSI9BHNTLSXBYYKIJSLHVZFVJVBPVCUTWJHGTABMIGRH9QFZ9KZUWJLCDQ9DR9VYSOIQIPW',
	'PRDHRLCYWYRFBHD9CQXBKMSNAPLSWNZTLJPKTNIKHGGBITWUEAXXAFLBGORKT9E9JGZKQMGBLJPQJRTSAVLLIVVTGB',
	'NZRQZBXXOPVVOSKGOOKAWBAKNHSGUXXX9DXHUUM99CVKDHWNQWGFRHCBKXUPXHKJE9OIUPELNUBPRNGRCP9NVEUSMC',
	'LLGABSEYHOXDWHNIUBYWTDYUSEDKMNM9A99KAPMQI9AXYIURAIDZT9VT9PNMAJUNKMYHELZUTDCMQNTLDCTYYYRTHD'
]


iota.getBalances(addresses, 100)
    .then(({ balances }) => {
    	console.log(balances)
  	})
  	.catch(err => {
    	console.log(err)
  	})