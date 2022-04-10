import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import sjcl from 'sjcl'
import BlockChainStore from './BlockChainStore';
import { json } from 'sjcl';

function BitcoinHacker() {

  const [blockChain, setBlockChain] = React.useState(BlockChainStore.getChain())
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  function hashString(data, prevHash, serialNum) {
    let hashStr = `${data}+${prevHash}+${serialNum}`
    const myBitArray = sjcl.hash.sha256.hash(hashStr)
    const myhash = sjcl.codec.hex.fromBits(myBitArray)
    return myhash
  }

 function updateBlock(block, index , inc) {
    let data = block.dv
    let serialNum = block.sn
    let error = block.error
    let prevHash = block.ph
    if(document.getElementById(`data${index}`)) {
      if (document.getElementById(`data${index}`).value){
        data = document.getElementById(`data${index}`).value;
      }
    }
    if(document.getElementById(`sn${index}`)) {
      if (document.getElementById(`sn${index}`).value){
        serialNum = document.getElementById(`sn${index}`).value;
      }
    }
    if(document.getElementById(`ph${index}`)) {
      if (document.getElementById(`ph${index}`).value){
        prevHash = document.getElementById(`ph${index}`).value;
      }
    }
    
    let newSerialNum = parseInt(serialNum) + inc
    let hash = hashString(data, prevHash, newSerialNum)
    
    let newblock = 
      {
        dv: data,
        sn: newSerialNum,
        ph: prevHash,
        nh: hash,
        mn: block.mn,
        error: error
      }
    
    BlockChainStore.replaceBlock(index, newblock)
    let newChain = BlockChainStore.getChain()
    setBlockChain(newChain)
    console.log(JSON.stringify(blockChain))
    forceUpdate()
      
  }

  function Block(props) {
    return (
      <td>
            <tr>
                <td>
                <hr class="line"></hr>
                </td>
                <td>
                {BlockChainStore.validBlock(props.index) ? 
                <div class="blockboxHacker">
                    <label> Data:
                        <input class="hackinputData" autoComplete="off" id={`data${props.index}`} type="text" placeholder={props.data}></input><br></br>
                    </label>
    
                    <label> Nonce:
                        <input class="hackinputSN" autoComplete="off" id={`sn${props.index}`} type="integer" placeholder={props.serialNum}></input><br></br>
                    </label>

                    <div class="info">Magic Number: {props.magicNum}</div><br></br>
    
                    <div class="info">{`Previous Hash`}</div>
                    <div>{props.prevHash}</div><br></br>
    
                    <div class="info">{`Block Hash`}<br></br></div>
                    <div>{props.newHash}</div>
                </div>
                :
                <div class="blockboxHacker invalid">
                <label> Data:
                    <input class="hackinputData" autoComplete="off" id={`data${props.index}`} type="text" placeholder={props.data}></input><br></br>
                </label>

                <label> Nonce:
                    <input class="hackinputSN" autoComplete="off" id={`sn${props.index}`} type="integer" placeholder={props.serialNum}></input><br></br>
                </label>

                <div class="info">Magic Number: {props.magicNum}</div><br></br>

                <label> Previous Hash: <br></br>
                  <input class="hackinputPH" autoComplete="off" id={`ph${props.index}`} type="text" placeholder={props.prevHash}></input><br></br>
                </label>

                <div class="info">{`Block Hash`}<br></br></div>
                <div>{props.newHash}</div>
              </div>
              }
              </td>
            </tr>

            <tr>
              <td></td>
              <td><button className='updateBlock' onClick={e => updateBlock(props.block, props.index, 0)}>Update Block</button></td>
            </tr>

            <tr>
              <td></td>
              <td><button className='updateBlock' onClick={e => updateBlock(props.block, props.index, 1)}>Generate New Block</button></td>
            </tr>
            <tr>
            </tr>

            <tr>
              <td></td>
              {<td class="messageBox">{props.block.error}</td>}
            </tr>
     </td>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>BITCOIN HACKER</h3>
      </header>
      <table className='informationHacker'>
        <tr>
          <td>
            <h2>Explanation</h2>
            You are trying to tamper with data in a blockchain however one change will produce an invalid block and you wont be able to successfully hack the chain.<br></br><br></br>
            When you enter new data into the block click <strong>Update Block</strong>to make the change<br></br><br></br>
            <strong>Generate New Block</strong> will update the block with an incremented Nonce<br></br><br></br>
            When the block is green it is valid and when the block is red it is invalid. When the block is red an error message will appear describing why the block is invalid <br></br><br></br>
            The block will be invalid for one of two reasons, ethier the new hash for the block doesnt start with the magic number or the blocks previous hash no longer matches the previous blocks.<br></br><br></br>
            
          </td>

          <td>
            <h2>Real World Differnces</h2>
            If you were actually trying to tamper with a block on bitcoin blockchain it would be much much harder to pull off. The proof of work needed to generate a valid 
            hash would be bery energy intinsive meaning you would need high quality equipment and it would also take much more time. But even if you had
            top of the line equipment to churn out hashes it would still be almost impossible as while you are updating the block chain miners are continously adding
            to it. Keep in mind there are many miners competing to be the first ones to generate the next valid block, so you would have to work at double the speed
            of all of them in order to successfully tamper with a single block of data.
          </td>
        </tr>
      </table>
      <br></br>

      <table class='blocks'>
        <tr>
        {blockChain.map((block, index)=> {
          return <Block index={index} data={block.dv} serialNum={block.sn} prevHash={block.ph} newHash={block.nh} magicNum={block.mn} block={block}/>
        })}
        </tr>
      </table>
      
    </div>
  );

}





export default BitcoinHacker;