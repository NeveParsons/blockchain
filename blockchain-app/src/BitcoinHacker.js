import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import sjcl from 'sjcl'
import BlockChainStore from './BlockChainStore';

function BitcoinHacker() {

  const [data, setData] = React.useState(null)
  const [serialNum, setserialNum] = React.useState(0)
  const [magicNum, setmagicNum] = React.useState(null)
  const [hash, sethash] = React.useState(null)
  const [prevHash, setprevHash] = React.useState("null")
  const [blockChain, setBlockChain] = React.useState(BlockChainStore.getChain())

 
  function invalidNewBlockHash() {
    let hashStr = `${data}+${prevHash}+${serialNum}`
    let newhash = myHash(hashStr)
    if(newhash.startsWith(magicNum)) {
      return false;
    }
    return true;
    
  }

  function myHash(str) {
    const myBitArray = sjcl.hash.sha256.hash(str)
    return sjcl.codec.hex.fromBits(myBitArray)
  }

  function updateBlock() {
    if(invalidNewBlockHash()) {
      return(
        <div class="messageBox">The Blocks new hash no longer starts with the magic number change the serial number and try again</div>
      )
    }
  
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
                      <input class="hackinputData" type="text" placeholder={props.data} onChange={e => props.setData(e.target.value)}></input><br></br>
                  </label>
  
                  <label> Serial Number:
                      <input class="hackinputSN" type="integer" placeholder={props.serialNum} onChange={e => props.setSN(e.target.value)}></input><br></br>
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
            <td><button className='updateBlock'>Update Block</button></td>
          </tr>
          <tr>
            <td></td>
            <td>{updateBlock()}</td>
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
          return <Block data={block.dv} serialNum={block.sn} prevHash={block.ph} newHash={block.nh} magicNum={block.mn} setData={setData} setSN={setserialNum}/>
        })}
        </tr>
      </table>
    </div>
  );

}





export default BitcoinHacker;