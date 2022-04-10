import React from 'react';

const About = () => {
  return (
    <div className="App">
      <header className="App-header about">
        <h3>ABOUT</h3>
      </header>
      <div>
        <table className='about'>
          <h3>APP DESCRIPTION</h3>
          <div>This application is to demonstrate how BlockChains are created, how they work and why they are secure. 
               To achieve this you will pretend to be a bitcoin Miner and add data blocks to a chain aswell as attempted 
               to hack that same chain. 
          </div>
          <h3>WHAT IS A BLOCKCHAIN?</h3>
          <div>Blockchain is a type of database that stores data in blocks that are then linked together via cryptography. When new data 
            needs to be added to the chain it will be entered into a new block with the hash of the previous block. This information 
            is then hashed and stored in the block as the new blocks hash. The blocks are stored linerally so that if one is tampered with the hash no longer 
            matches with the next blocks previous hash so it will no longer be valid. 
          </div>

          <h3>WHY ARE BLOCKCHAINS SECURE?</h3>
          <div> Blockchains are secure for multiple reasons, as mentioned above they store the hash of the previous block meaning that 
            to tamper with a block you would have update the blocks after it so thier hashes are correct hashes. 
            <br></br> <br></br>
            Blockchains also use a mehtod called Proof Of Work, which is essentially proving that a significant amount of work was done 
            to produce an outcome. In regaurds to Bitcoin Blockchains this would be some form of mathamatical puzzle that a hash has to
            abide by, this can take up to 10 minutes to produce.
            <br></br> <br></br>
            Blockchains are also secure due to the fact they are a distributed ledger and 
            use peer-to-peer networks to verify new blocks being added to the chain. When somone joins the P2P network they have access
            to the chain and when one of them tries to add a new block everyone else on the network will verify that it is valid. 
            
            <br></br> <br></br>
            This means to tamper with a block you will need to update all the blocks on the chain, perform the proof of work for each one and 
            take control of more that 50% of the P2P network
          </div>

          <h3>WHAT IS BITCOIN MINING?</h3>
          <div> Bitcoin Mining is the the process of creating new blocks of data contiang information about Bitcoin transactions and adding them to a BlockChain.
            Bitcoin Miners are the people who create new blocks to add to the Blockchain. The Proof of Work required for each block, as 
            described above is what the minors have to perform to find a valid block. This is done by updating a number reffered to as the Nonce, 
            this is stored in the blocks header and altering it will create a completely different hash. Bitcoin miners use brute force by changing the Nonce
            untill the hash produced follows the rule needed to complete the "proof of work", this will often be that the hash is smaller than some target
            hash, the smaller the target the harder it is to solve. The minors on the network are all competing to be the first to find a valid block,
            when they do it is verified by others on the network and if its valid they are rewarded with bitcoin. 
          </div>
        </table>
      </div>
      
      
    </div>
  );
};

export default About;