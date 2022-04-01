import logo from './logo.svg';
import './App.css';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import TextField from '@mui/material/TextField';
import sjcl from 'sjcl'

function App() {

  const [data, setData] = React.useState(null)
  const [serialNum, setserialNum] = React.useState(null)
  const [magicNum, setmagicNum] = React.useState(null)
  const [hash, sethash] = React.useState(null)
  const [prevHash, setprevHash] = React.useState(null)

  return (
    <div className="App">
      <header className="App-header">
        <h3>BLOCKCHAIN MINOR</h3>
      </header>
      <table class='blockInfo'>

        <tr>Previous hash: xxx</tr>

        <tr>
        <td>
        <div class="info">
          <TextField
            id="outlined-Data-input"
            label="Data"
            className="textfield"
          />
        </div>
          <div class="hide textbox">hello there my name is neve and a message will be put here at some point</div>
        </td>
        <td>
        <div class="info">
          <TextField
            id="outlined-Serial-Number-input"
            label="Serial Number"
            className="textfield"
          />
        </div>
          <div class="hide textbox">hello there my name is neve and a message will be put here at some point</div>
        </td>
        
        <td>
        <div class="info">
          <TextField
            id="outlined-Magic-Number-input"
            label="Magic Number"
            className="textfield"
          />
        </div>
          <div class="hide textbox">hello there my name is neve and a message will be put here at some point</div>
        </td>
        <td>
        <button className='generateButton'>Generate Hash</button>
        </td>

        <td>
        <button className='generateButton'>Find valid Hash</button>
        </td>

        </tr>
    
        <tr>
          <h4>New Block's Hash: xxx</h4>
        </tr>
      </table>

      <table class='blocks'>
        <tr>
        <Block info={""}/>
        <Block info={""}/>
        <Block info={""}/>
        <Block info={""}/>
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
      <div class="blockbox"></div>
      </td>
      </tr>
    </td>
  )

  
  function newBlockHash(prevHash, data, serialNum, blockNum) {
    let hashStr = `${blockNum}+${data}+${prevHash}+${serialNum}`
    return myHash(hashStr)
  }


  function myHash(str) {
    const myBitArray = sjcl.hash.sha256.hash(str)
    return sjcl.codec.hex.fromBits(myBitArray)
  }
}

export default App;
