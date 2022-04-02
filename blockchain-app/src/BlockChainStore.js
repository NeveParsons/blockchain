

class BlockChain {
    constructor() {
        this.chain = []
    }

    addBlock(block) {
        this.chain.unshift(block);
    } 

    getChain() {
        return this.chain;
    }

    getMagicNum() {
        return this.magicNum;
    }

    getSerialNum() {
        return this.serialNum;
    }

    getData(){
        return this.data;
    }
    
}

export default new BlockChain();
