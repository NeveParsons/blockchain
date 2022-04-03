

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

    validBlock(index) {
        this.chain[index].error = ""
        if(!this.chain[index].nh.startsWith(this.chain[index].mn)) {
            this.chain[index].error = "Hash no longer starts with magic number"
            console.log(this.chain[index].error)
            return false;
        }
        if(index == this.chain.length) {
            return true;
        }
        if(!this.chain[index + 1]) {
            return true;
        }
        if(this.chain[index].ph != this.chain[index + 1].nh) {
            this.chain[index].error = "Previous Hash no longer matches previous blocks hash"
            console.log(this.chain[index].error)
            return false
        }
        
        return true;
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
