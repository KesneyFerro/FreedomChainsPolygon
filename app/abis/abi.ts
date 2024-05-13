/* eslint-disable import/no-anonymous-default-export */
export const abiData = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_behavior",
        type: "string",
      },
      {
        internalType: "string",
        name: "_comment",
        type: "string",
      },
    ],
    name: "addBehaviorRecord",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "agent",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isAuthorized",
        type: "bool",
      },
    ],
    name: "AuthorizationUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_agent",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_isAuthorized",
        type: "bool",
      },
    ],
    name: "authorizeAgent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "prisonerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "behavior",
        type: "string",
      },
      {
        indexed: false,
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    name: "BehaviorRecordAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "prisonerId",
        type: "uint256",
      },
    ],
    name: "NewPrisonerID",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "prisonerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "prisonDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "releaseDate",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "isDetained",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "createdBy",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "transactionHash",
        type: "bytes32",
      },
    ],
    name: "PrisonerInfoRegistered",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_prisonDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_releaseDate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_isDetained",
        type: "bool",
      },
    ],
    name: "registerPrisonerInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "authorized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "behaviorRecords",
    outputs: [
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "behavior",
        type: "string",
      },
      {
        internalType: "string",
        name: "comment",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPrisonerDetails",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prisonDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "releaseDate",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isDetained",
            type: "bool",
          },
          {
            internalType: "address",
            name: "createdBy",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "transactionHash",
            type: "bytes32",
          },
        ],
        internalType: "struct PrisonerManagementSystem.PrisonerInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllPrisonerIDs",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAuthorizedAddresses",
    outputs: [
      {
        internalType: "address[]",
        name: "",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getBehaviorRecords",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "date",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "behavior",
            type: "string",
          },
          {
            internalType: "string",
            name: "comment",
            type: "string",
          },
        ],
        internalType: "struct PrisonerManagementSystem.BehaviorRecord[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_id",
        type: "uint256",
      },
    ],
    name: "getPrisonerInfo",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prisonDate",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "releaseDate",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isDetained",
            type: "bool",
          },
          {
            internalType: "address",
            name: "createdBy",
            type: "address",
          },
          {
            internalType: "bytes32",
            name: "transactionHash",
            type: "bytes32",
          },
        ],
        internalType: "struct PrisonerManagementSystem.PrisonerInfo",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "prisonerInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "prisonDate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "releaseDate",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isDetained",
        type: "bool",
      },
      {
        internalType: "address",
        name: "createdBy",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "transactionHash",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
