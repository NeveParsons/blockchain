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
  const [prevHash, setprevHash] = React.useState(BlockChainStore.getPrevHash())
  const [blockChain, setBlockChain] = React.useState(BlockChainStore.getChain())
  const [displayDataInfo, setDisplayDataInfo] = React.useState(false)
  const [displayserialNumInfo, setdisplayserialNumInfo] = React.useState(false)
  const [displaymagicNumInfo, setdisplaymagicNumInfo] = React.useState(false)
  const [error, setError] = React.useState(null)

  const dataInfo = <div class="textbox">The Data store in a bitcoin block chain would consist of transaction details looking something like
                                        “x paid y, z amount of money”, for simplicity sake though you can enter any string into this field.</div>

  const SNInfo = <div class="textbox">The Nonce is used so a new hash can be generated with the same data and is stored in the header of a block. Blockchains use 
                                      a method known as Proof of work meaning for the hash to be added to the chain it needs to follow a certain rule, to find 
                                      a valid hash we need to be able to change it without editing the data so this is done by updating the Nonce.</div>

  const MNInfo = <div class="textbox">The Magic Number is the number the hash has to start with for it to be considered valid. The magic number is used for 
                                      Proof of Work meaning the hash has to satisfy a rule to be added to the chain. In this example the rule is that the hash 
                                      must start with the magic number provided.</div>

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
    setError(null)
    if(newhash.startsWith(magicNum)) {
      setprevHash(newhash)
      BlockChainStore.setPrevHash(newhash)
      if(BlockChainStore.blockAlreadyExists(newhash)) {
        setError("Cannot add block with same hash as existing block")
        return;
      }
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
    }
    else {
      setError("Block does not start with Magic Number")
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
    if(data == null || data.length == 0) {
      console.log("found3")
      setError("Plese enter valid Data - String")
      return false
    }
    if(serialNum == null || !Number.isInteger(sn)) {
      console.log("found1 " + serialNum)
      setError("Plese enter a valid Serial Number - Integer")
      return false;
    }
    if(magicNum == null || !Number.isInteger(mn)) {
      console.log("found2")
      setError("Plese enter a valid Magic Number - Integer")
      return false;
    }
    setError(null)
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
          <Field data={serialNum} label={"Nonce"} setData={setserialNum} showInfo={displayserialNumInfo} setShowInfo={setdisplayserialNumInfo} info={SNInfo}/>
          <Field data={magicNum} label={"Magic Number"} setData={setmagicNum} showInfo={displaymagicNumInfo} setShowInfo={setdisplaymagicNumInfo} info={MNInfo}/>
          <tr>
          <td>
          <button className='generateButton' onClick={newBlockHash} >Generate Hash</button>
          <button className='generateButton' onClick={findValidHash}>Generate Next Hash</button>
          </td>
          </tr>
        </table>

        <table>
          <tr>
          {error && <div class="hashInfo invalidHash"><strong>{error}</strong></div>}
          </tr>
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
          <tr>
          <h2>Explanation</h2>
          You are a bitcoin miner trying to find a valid hash for the next block. <br></br><br></br>
          Click the <strong>Description</strong> buttons to see information about the fields that are required. <br></br><br></br>
          <strong>Generate Hash</strong> will create a new hash with the values provided.<br></br><br></br>
          <strong>Generate New Hash</strong>  will create a new hash with the data provided and an incremented Nonce<br></br><br></br>
          To add a block to the chain the hash needs to be valid, meaning it needs to start with the Magic Number<br></br><br></br>
          When the <strong>Hash</strong> is red the hash is invalid and when the <strong>Hash</strong> is green the hash is valid<br></br><br></br>
          When the Hash is green you can add it to the chain by clicking <strong>Add Block</strong>
          </tr>
          <tr>
          <h2>Real World Differnces</h2>
          Real Bitcoin Minors have much more complicated puzzles that need to be solved to produce the hash. This will often be that the
          hash needs to be smaller than a target hash and will take trillions computations to produce. This means they need computers that 
          can handle very energy intensive processes to churn out hashes and will take close to 10 minutes to produce. <br></br><br></br>

          There are many Bitcoin Miners on a newwork that are competing to add blocks to the chain. To add a new block it needs to be verfied 
          by the other minors and if you are the first to find a valid block you are rewarded with bitcoin
          </tr>
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