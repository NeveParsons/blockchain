

class BlockChain {
    constructor() {
        this.chain = []
    }

    addBlock(block) {
        this.chain.unshift(block);
    } 

    replaceBlock(index, block) {
        this.chain[index] = block;
    }

    getBlock(index) {
        return this.chain[index]
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
