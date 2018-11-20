let bankBytecode =
    "0x608060405260008054600160a060020a031916331790556105c5806100256000396000f3006080604052600436106100825763ffffffff7c01000000000000000000000000000000000000000000000000000000006000350416632e1a7d4d811461008757806341c0e1b5146100a157806368915353146100b65780637b83b50b146100c15780639cdfaa06146100e8578063a9059cbb14610100578063d0e30db014610131575b600080fd5b34801561009357600080fd5b5061009f600435610139565b005b3480156100ad57600080fd5b5061009f610249565b61009f6004356102ea565b3480156100cd57600080fd5b506100d6610348565b60408051918252519081900360200190f35b3480156100f457600080fd5b5061009f60043561035b565b34801561010c57600080fd5b5061009f73ffffffffffffffffffffffffffffffffffffffff60043516602435610439565b61009f610541565b33600090815260016020526040902054670de0b6b3a76400008202908111156101c357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f796f75722062616c616e63657320617265206e6f7420656e6f75676800000000604482015290519081900360640190fd5b604051339082156108fc029083906000818181858888f193505050501580156101f0573d6000803e3d6000fd5b5033600081815260016020908152604091829020805485900390558151858152429181019190915281517f5bb95829671915ece371da722f91d5371159095dcabf2f75cd6c53facb7e1bab929181900390910190a25050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146102cf57604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601160248201527f796f7520617265206e6f74206f776e6572000000000000000000000000000000604482015290519081900360640190fd5b60005473ffffffffffffffffffffffffffffffffffffffff16ff5b336000818152600260209081526040918290203480825560019091018590558251908152908101849052428183015290517f207377a59d2a4eb1bb9dda0efe301bf537684d925d562ecf2d3a1c95afe450629181900360600190a250565b3360009081526001602052604090205490565b3360009081526002602052604090208054600190910154670de0b6b3a76400009091029082111561039c573360009081526002602052604090206001015491505b33600090815260026020526040902060010154600a90838115156103bc57fe5b0482028115156103c857fe5b336000818152600160208181526040808420805497909604979097019586019094556002845285822082815501558351838152918201859052428285015292519192917fd95faae33502f0dfa63032b539818d9b3e918b6caf1462bfd5876b82900c89809181900360600190a25050565b33600090815260016020526040902054670de0b6b3a76400008202908111156104c357604080517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601c60248201527f796f75722062616c616e63657320617265206e6f7420656e6f75676800000000604482015290519081900360640190fd5b3360008181526001602090815260408083208054869003905573ffffffffffffffffffffffffffffffffffffffff8716808452928190208054860190558051868152429281019290925280519293927fbabc8cd3bd6701ee99131f374fd2ab4ea66f48dc4e4182ed78fecb0502e44dd69281900390910190a3505050565b336000818152600160209081526040918290208054349081019091558251908152429181019190915281517fad40ae5dc69974ba932d08b0a608e89109412d41d04850f5196f144875ae2660929181900390910190a25600a165627a7a723058203a26c60519bc53377704bb42442c399122350d157a3b300b978630cdc0d11fe50029";

let bankAbi =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "etherValue",
				"type": "uint256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "kill",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "BuyTimeDeposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBankBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "TimeDepositExpired",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "to",
				"type": "address"
			},
			{
				"name": "etherValue",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "DepositEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "WithdrawEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TransferEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "count",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "BuyTimeDepositEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "count",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "TimeDepositExpiredEvent",
		"type": "event"
	}
];