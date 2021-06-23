import { useState, useEffect } from 'react';
import {Pixel} from '../components/Pixel';
import PixelRow from '../components/PixelRow';
import ColorButton from '../components/ColorButton';
import SaveName from '../components/SavePixelArt';
import '../css/PixelArtsEdit.css';
import { useLocation } from 'react-router';

type ColorObj = {
  red: number;
  green: number;
  blue: number;
}

let PixelTable:Pixel[][] = [...Array(32)].map((_, i) => {
  return [...Array(32)].map((_,j) => {
      return {
          x:i,
          y:j,
          red:0,
          green:0,
          blue:0
      }
  })
});


const Color:ColorObj[] = [{red:1,green:0,blue:0},{red:0,green:1,blue:0},{red:0,green:0,blue:1},{red:1,green:1,blue:0},{red:0,green:1,blue:1},{red:1,green:0,blue:1},{red:0,green:0,blue:0},{red:1,green:1,blue:1}]

let Clicked: boolean = false;

let saveName: string = "";

let isNewPixelArt: boolean = true;

const PixelArtsEdit = () => {
  const [pixels, setPixel] = useState(PixelTable);
  const [isClicked ,setClicked] = useState(Clicked);
  const [color, setColor] = useState(Color[0]);
  const [save, setSaveName] = useState(saveName);
  const [isNew, setIsNewPixelArt] = useState(isNewPixelArt);
  const location = useLocation().pathname.slice(-1);
  
  useEffect(() => {
    const loadPixelArt = localStorage.getItem(location);
    if (loadPixelArt) {
      console.log(JSON.parse(loadPixelArt));
      setPixel(JSON.parse(loadPixelArt).dots);
      setIsNewPixelArt(false);
      setSaveName(JSON.parse(loadPixelArt).name);
    }
  },[]);
  
  useEffect(() => {
    pixels.map((row) => {
      row.map((p) => {
        let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
        let element:any = document.getElementById(id);
        element.style.backgroundColor = `rgb(${p.red === 0 ? 0 : 255},${p.green === 0 ? 0 : 255},${p.blue === 0 ? 0 : 255})`;
      })
    })
  },[pixels]);  

  const pixelrows = pixels.map((row)=>{
    return row.map((p) => {
      let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
      return (
        <PixelRow
          pixel={p}
          key={id}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onPixelOver={(x,y,red,green,blue) => handlePixelOver(x,y,red,green,blue)}
          onPixelClick={(x,y,red,green,blue) => handlePixelClick(x,y,red,green,blue)}
        />
      );
    })
  });

  const handleMouseDown = () => {
    setClicked(true);
  }

  const handleMouseUp = () => {
    setClicked(false);
  }

  
  const handlePixelOver = (x:number,y:number,red:number,green:number,blue:number) => {
    if(isClicked){
      const newPixels = pixels.map((row) => {
        return row.map((p) => {
          if(x === p.x && y === p.y){
            return {...p,red:color.red,green:color.green,blue:color.blue}
          }
          return p;
        })
      })
      setPixel(newPixels);
    }
  }

  const handlePixelClick = (x:number,y:number,red:number,green:number,blue:number) => {
    const newPixels = pixels.map((row) => {
      return row.map((p) => {
        if(x === p.x && y === p.y){
          return {...p,red:color.red,green:color.green,blue:color.blue}
        }
        return p;
      })
    })
    setPixel(newPixels);
  }
  

  const handleColorChange = (index:number) => {
    setColor(Color[index]);
  }

  const handleNameChange = (name:string) => {
    setSaveName(name);
    
  }

  const handlePixelArtSaveW = () => {
    handlePixelArtSave()
  }

  const handlePixelArtSave = () => {
    let id = 0;
    if(localStorage.length !== 0){
      for (let i = 0, length = localStorage.length; i < length; ++i) {
        let w = localStorage.key(i);
        if(id < Number(w)){
          id = Number(w);
        }
      }
      id = id + 1;
    }
    if(!isNew){
      const loadPixelArt = localStorage.getItem(location);
      id = (JSON.parse(loadPixelArt!).id);
    }
    const PA = {
      "id":id,
      "name":save,
      "dots":pixels
    }
    localStorage.setItem(String(id), JSON.stringify(PA));
  }

  const handleMakeItShine = () => {

  }

  const handleDeleteColor = () => {
    setPixel(PixelTable);
  }
  
  return (
    <div id="pixeelArtEdit">
      <div id="pixelArt">
        <table>
          <tbody>
            <tr>{pixelrows[0]}</tr>
            <tr>{pixelrows[1]}</tr>
            <tr>{pixelrows[2]}</tr>
            <tr>{pixelrows[3]}</tr>
            <tr>{pixelrows[4]}</tr>
            <tr>{pixelrows[5]}</tr>
            <tr>{pixelrows[6]}</tr>
            <tr>{pixelrows[7]}</tr>
            <tr>{pixelrows[8]}</tr>
            <tr>{pixelrows[9]}</tr>
            <tr>{pixelrows[10]}</tr>
            <tr>{pixelrows[11]}</tr>
            <tr>{pixelrows[12]}</tr>
            <tr>{pixelrows[13]}</tr>
            <tr>{pixelrows[14]}</tr>
            <tr>{pixelrows[15]}</tr>
            <tr>{pixelrows[16]}</tr>
            <tr>{pixelrows[17]}</tr>
            <tr>{pixelrows[18]}</tr>
            <tr>{pixelrows[19]}</tr>
            <tr>{pixelrows[20]}</tr>
            <tr>{pixelrows[21]}</tr>
            <tr>{pixelrows[22]}</tr>
            <tr>{pixelrows[23]}</tr>
            <tr>{pixelrows[24]}</tr>
            <tr>{pixelrows[25]}</tr>
            <tr>{pixelrows[26]}</tr>
            <tr>{pixelrows[27]}</tr>
            <tr>{pixelrows[28]}</tr>
            <tr>{pixelrows[29]}</tr>
            <tr>{pixelrows[30]}</tr>
            <tr>{pixelrows[31]}</tr>
          </tbody>
        </table>
      </div>
      <div id="content">
        <div id="colorPalet">
          <h1 id="colorTitle">Color</h1>
          <ColorButton key="red" value="red" index={0} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="green" value="green" index={1} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="blue" value="blue" index={2} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="yellow" value="yellow" index={3} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="cyan" value="cyan" index={4} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="purple" value="purple" index={5} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="black" value="black" index={6} onColorChange={(index) => handleColorChange(index)}/>
          <ColorButton key="white" value="white" index={7} onColorChange={(index) => handleColorChange(index)}/>
        </div>
        <SaveName name={save} onNameChange={(name) => handleNameChange(name)} onPixelArtSave={() => handlePixelArtSaveW()}
          onMakeItShine={() => handleMakeItShine()} onDeleteColor={() => handleDeleteColor()}/>
      </div>
    </div>
  );

};


export default PixelArtsEdit;
