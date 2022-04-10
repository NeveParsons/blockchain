

class BlockChain {
    constructor() {
        this.chain = []
        this.prevHash = null;
    }

    addBlock(block) {
        let len = this.chain.length
        if(len == 0) {
            this.chain.unshift(block);
        }
        else if(this.chain[len -1].nh != block.nh) {
            this.chain.unshift(block);
        }
    } 

    blockAlreadyExists(hash) {
        for(let i = 0; i < this.chain.length; i++) {
            if(this.chain[i].nh == hash) {
                return true;
            }
        }
        return false;
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

    setPrevHash(hash) {
        this.prevHash = hash;
    }

    getBlock(index) {
        return this.chain[index]
    }

    getPrevHash() {
        let len = this.chain.length
        if(len == 0) {
            return null
        }
        return this.chain[0].nh
    }

    getChain() {
        return this.chain;
    }

}

export default new BlockChain();
