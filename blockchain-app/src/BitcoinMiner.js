import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import sjcl from 'sjcl'
import BlockChainStore from './BlockChainStore';

function BitcoinMiner() {

  const [data, setData] = React.useState(null)
  const [serialNum, setserialNum] = React.useState(0)
  const [magicNum, setmagicNum] = React.useState(null)
  const [newhash, setnewhash] = React.useState()
  const [prevHash, setprevHash] = React.useState("null")
  const [blockChain, setBlockChain] = React.useState(BlockChainStore.getChain())

  function newBlockHash() {
    let hashStr = `${data}+${prevHash}+${serialNum}`
    console.log(`${data}+${prevHash}+${serialNum}  curHash: ${newhash}`)
    setnewhash(myHash(hashStr))
  }

  function findValidHash() {
      newBlockHash()
      setserialNum(Number.parseInt(serialNum) + 1)
      
  }

  function addBlock() {
    if(newhash.startsWith(magicNum)) {
      setprevHash(newhash)
      BlockChainStore.addBlock(
          {
            dv: data,
            sn: serialNum -1, 
            ph: prevHash,
            nh: newhash,
            mn: magicNum
          }
      )
      setBlockChain(BlockChainStore.getChain())
     
    }
  }

  function myHash(str) {
    const myBitArray = sjcl.hash.sha256.hash(str)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    while(myHash == null) {
      //busy wait
    }
    return myHash;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>BITCOIN MINER</h3>
      </header>
      <table class='blockInfo'>
        <tr>Previous hash: {prevHash}</tr>
        <Field data={data} label={"Data"} setData={setData}/>
        <Field data={serialNum} label={"Serial Number"} setData={setserialNum}/>
        <Field data={magicNum} label={"Magic Number"} setData={setmagicNum}/>
        <tr>
        <td>
        <button className='generateButton' onClick={newBlockHash} >Generate Hash</button>
        <button className='generateButton' onClick={findValidHash}>Find valid Hash</button>
        </td>
        </tr>
      </table>

        <table>
        <tr>
        <td>
        <h4>New Block's Hash: {newhash}</h4>
        </td>
        <td>
          <button class="updateBlock" onClick={addBlock}>Add Block</button>
        </td>
        </tr>
        </table>
        
      <table class='blocks'>
        <tr>
        {blockChain.map((block, index)=> {
          return <Block data={block.dv} serialNum={block.sn} prevHash={block.ph} newHash={block.nh}/>
        })}
        </tr>
      </table>
    </div>
  );

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
        <br></br>{`Data: ${props.data}`}<br></br><br></br>
        {`Serial Number: ${props.serialNum}`}<br></br><br></br>     

        <div class="info">{`Previous Hash`}</div>
        <div class="hide">{props.prevHash}</div><br></br>

        <div class="info">{`Block Hash`}<br></br><br></br></div>
        <div class="hide">{props.newHash}</div>
      </div>
      </td>
      </tr>
    </td>
  )
}

function Field(props) {
  return (
    <tr >
      <div class="info">
        <TextField
          label={props.label}
          className="textfield"
          value={props.data}
          onChange={e => props.setData(e.target.value)}
        />
      </div>
      <div class="hide textbox">{props.data}</div>
    </tr>
  )
}

export default BitcoinMiner;