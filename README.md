# vveb3 tools

## Installation

1. Install [Node.js](https://nodejs.org/en/)
1. `$ git clone https://github.com/sprice/vveb3-tools.git`
1. `$ cd vveb3-tools`
1. `$ npm install`
1. Create an [Alchemy](https://www.alchemy.com/) account and get an API key
1. `$ cp .env.template .env`
1. Add your Alchemy API key to the `.env` file you just created

## Tools

### Snapshot

Create a CSV file of all the owners of an NFT and how many NTFs they own.

```shell
$ node index.mjs snapshot 0xCONTRACT_ADDRESS
```
