import './App.css';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import sjcl from 'sjcl'
import BlockChainStore from './BlockChainStore';

function BitcoinMiner() {

  const [data, setData] = React.useState(null)
  const [serialNum, setserialNum] = React.useState(null)
  const [magicNum, setmagicNum] = React.useState(null)
  const [newhash, setnewhash] = React.useState(null)
  const [prevHash, setprevHash] = React.useState(null)
  const [blockChain, setBlockChain] = React.useState(BlockChainStore.getChain())
  const [displayDataInfo, setDisplayDataInfo] = React.useState(false)
  const [displayserialNumInfo, setdisplayserialNumInfo] = React.useState(false)
  const [displaymagicNumInfo, setdisplaymagicNumInfo] = React.useState(false)

  const dataDescription = "The Data stored in a bitcoin block chain would consist of transaction details looking something like this format “x paid y, z amount of money”, for simplicity sake though you can enter any string into this field. This data is then hashed with the serial number and the hash of the previous block."
  const serialNumDescription = "The serial number is used so a new hash can be generated with the same data. Blockchains use a method known as Proof of work meaning for the hash to be added to the chain it needs to follow a certain rule, for the block to be able to achieve this rule we need to keep changing it by updating the serial number."
  const magicNumDescription = "This magic number is the number the hash has to start with for it to be considered valid. The magic number is used for Proof of Work meaning the hash has to satisfy a rule to be added to the chain. In this example the rule is that the hash must start with the magic number provided."

  const dataInfo = <div class="textbox">{dataDescription}</div>
  const SNInfo = <div class="textbox">{serialNumDescription}</div>
  const MNInfo = <div class="textbox">{magicNumDescription}</div>

  function newBlockHash() {
    if(!validValues()) {
      return;
    }
    let hashStr = `${data}+${prevHash}+${serialNum}`
    setnewhash(myHash(hashStr))
  }

  function findValidHash() {
      if(!validValues()) {
        return;
      }
      let sn = Number.parseInt(serialNum) + 1 
      let hashStr = `${data}+${prevHash}+${sn}`
      setserialNum(sn)
      setnewhash(myHash(hashStr))
  }

  function addBlock() {
    if(newhash.startsWith(magicNum)) {
      setprevHash(newhash)
      BlockChainStore.addBlock(
          {
            dv: data,
            sn: serialNum, 
            ph: prevHash,
            nh: newhash,
            mn: magicNum,
            error: ""
          }
      )
      setBlockChain(BlockChainStore.getChain())
     
    }
  }

  function validHash(hash) {
    if(hash == null) {
      return false;
    }
    if(hash.startsWith(magicNum)) {
      return true;
    }
    return false
  }

  function validValues() {
    let sn = Number.parseInt(serialNum)
    let mn = Number.parseInt(magicNum)
    if(serialNum == null || !Number.isInteger(sn)) {
      console.log("found1 " + serialNum)
      return false;
    }
    if(magicNum == null || !Number.isInteger(mn)) {
      console.log("found2")
      return false;
    }
    if(data == null) {
      console.log("found3")
      return false
    }
    setserialNum(Number.parseInt(serialNum))
    setmagicNum(Number.parseInt(magicNum))
    return true;
  }

  function myHash(str) {
    const myBitArray = sjcl.hash.sha256.hash(str)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    return myHash;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h3>BITCOIN MINER</h3>
      </header>
      <div class="hashInfo">Previous hash: {prevHash}</div>

        <table class='blockInfo'>
          <Field data={data} label={"Data"} setData={setData} showInfo={displayDataInfo} setShowInfo={setDisplayDataInfo} info={dataInfo}/>
          <Field data={serialNum} label={"Serial Number"} setData={setserialNum} showInfo={displayserialNumInfo} setShowInfo={setdisplayserialNumInfo} info={SNInfo}/>
          <Field data={magicNum} label={"Magic Number"} setData={setmagicNum} showInfo={displaymagicNumInfo} setShowInfo={setdisplaymagicNumInfo} info={MNInfo}/>
          <tr>
          <td>
          <button className='generateButton' onClick={newBlockHash} >Generate Hash</button>
          <button className='generateButton' onClick={findValidHash}>Generate Next Hash</button>
          </td>
          </tr>
        </table>

        <table>
          {<div class="hashInfo">{`String being hashed: ${data}+${prevHash}+${serialNum}`}</div>}
        </table>
      
        <table>
          <tr>
          <td>
          <h4><tr><td>Hash:</td> {validHash(newhash) ? <td className='valid'>{newhash}</td> : <td className='invalidHash'>{newhash}</td> }</tr></h4>
          </td>
          <td>
            <button class="updateBlock" onClick={addBlock}>Add Block</button>
          </td>
          </tr>
        </table>

        <table class="information">
          <h2>Explanation</h2>
          You are a bitcoin miner trying to find a valid hash for the next block. <br></br><br></br>
          Click the <strong>Description</strong> buttons to see more information about that the fields represent. <br></br><br></br>
          <strong>Generate Hash</strong> will create a new hash with the values provided.<br></br><br></br>
          <strong>Generate New Hash</strong>  will create a new hash with the data provided and an incremented serial number <br></br><br></br>
          When the <strong>Hash</strong> is in red it means it it not a valid hash, when it is in green the hash is valid and you can add it to the chain by clicking <strong>Add Block</strong> <br></br><br></br>
        </table>

        <table class="information2">
          <h2>Real World Differnces</h2>
          Real Bitcoin Minors have much more complicated rules that the hash needs to follow. This means they need computers that can handle very energy intensive
          processes to churn out hashes and will take close to 10 minutes to produce.
        </table>
        
      <table class='blocks'>
        <tr>
        {blockChain.map((block, index)=> {
          return <Block index={index} data={block.dv} serialNum={block.sn} prevHash={block.ph} newHash={block.nh}/>
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
      {BlockChainStore.validBlock(props.index) ? 
      <div class="blockbox"> 
        <br></br>{`Data: ${props.data}`}<br></br><br></br>
        {`Serial Number: ${props.serialNum}`}<br></br><br></br>     

        <div class="info">{`Previous Hash`}</div>
        <div class="hide">{props.prevHash}</div><br></br>

        <div class="info">{`Block Hash`}<br></br><br></br></div>
        <div class="hide">{props.newHash}</div>
      </div>
        :
        <div class="blockbox invalid"> 
        <br></br>{`Data: ${props.data}`}<br></br><br></br>
        {`Serial Number: ${props.serialNum}`}<br></br><br></br>     

        <div class="info">{`Previous Hash`}</div>
        <div class="hide">{props.prevHash}</div><br></br>

        <div class="info">{`Block Hash`}<br></br><br></br></div>
        <div class="hide">{props.newHash}</div>
        </div>
      }
      </td>
      </tr>
      
    </td>
  )
}

function Field(props) {
  return (
    <tr >
      <td>
      <div class="info">
        <TextField
          label={props.label}
          className="textfield"
          value={props.data}
          autoComplete="off"
          onChange={e => props.setData(e.target.value)}
        />
      </div>
      {props.showInfo ? props.info : null}
      </td>
      <td>
      <button class="description" onClick={e => props.setShowInfo(!props.showInfo)}>Description</button>
      </td>
    </tr>
  )
}

export default BitcoinMiner;