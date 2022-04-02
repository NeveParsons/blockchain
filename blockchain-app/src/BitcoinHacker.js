import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import sjcl from 'sjcl'
import BlockChainStore from './BlockChainStore';
import { json } from 'sjcl';

function BitcoinHacker() {

  const [blockChain, setBlockChain] = React.useState(BlockChainStore.getChain())

 
  function invalidNewBlockHash(newhash, magicNum) {
    if(newhash.startsWith(magicNum)) {
      return;
    }
    return (
      <td class="messageBox">error</td>
    ) 
  }


  function hashString(data, prevHash, serialNum) {
    console.log(`${data}+${prevHash}+${serialNum}`)
    let hashStr = `${data}+${prevHash}+${serialNum}`
    const myBitArray = sjcl.hash.sha256.hash(hashStr)
    return sjcl.codec.hex.fromBits(myBitArray)
  }

 function updateBlock(block, index) {
    let data = block.data
    let serialNum = block.sn
    if(document.getElementById(`data${index}`) != null) {
      if (document.getElementById(`data${index}`).value != null){
        data = document.getElementById(`data${index}`).value;
      }
    }
    if(document.getElementById(`sn${index}`) != null) {
      if (document.getElementById(`sn${index}`).value != null){
        data = document.getElementById(`sn${index}`).value;
      }
    }
    let hash = hashString(data, block.ph, serialNum)
    while(hash == null) {
      //busy wait
    }
    let newblock = 
      {
        dv: data,
        sn: serialNum, 
        ph: block.ph,
        nh: hash,
        mn: block.mn
      }
    
    BlockChainStore.replaceBlock(index, newblock)
    setBlockChain(BlockChainStore.getChain())
  }

  function isHashValid(block) {
    if(block.nh.startsWith(block.mn)) {
      return;
    }
    return (
      <td class="messageBox">error</td>
    )
  }

  function Block(props) {
    return (
      <td> 
          <tr>
              <td>
              <hr class="line"></hr>
              </td>
              <td>
              <div class="blockbox">
                  <label> Data:
                      <input class="hackinputData" id={`data${props.key}`} type="text" placeholder={props.data} onChange={updateBlock(props.block, props.key)}></input><br></br>
                  </label>
  
                  <label> Serial Number:
                      <input class="hackinputSN" id={`sn${props.key}`} type="integer" placeholder={props.serialNum} onChange={updateBlock(props.block, props.key)}></input><br></br>
                  </label>
  
                  <div class="info">Magic Number: {props.magicNum}</div><br></br>
  
                  <div class="info">{`Previous Hash`}</div>
                  <div class="hide">{props.prevHash}</div><br></br>
  
                  <div class="info">{`Block Hash`}<br></br><br></br></div>
                  <div class="hide">{props.newHash}</div>
              </div>
              </td>
          </tr>
          <tr>
            <td></td>
            <td><button className='updateBlock' onClick={updateBlock(props.block, props.key)}>Update Block</button></td>
          </tr>
          <tr>
            <td></td>
            {isHashValid(BlockChainStore.getBlock(props.key))}
          </tr>

          <tr>
          </tr>
      </td>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>BITCOIN HACKER</h3>
      </header>
      <table class='blocks'>
        <tr>
        {blockChain.map((block, index)=> {
          return <Block key={index} data={block.dv} serialNum={block.sn} prevHash={block.ph} newHash={block.nh} magicNum={block.mn} block={block}/>
        })}
        </tr>
      </table>
    </div>
  );

}





export default BitcoinHacker;