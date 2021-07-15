import { useState, useEffect } from 'react';
import { Pixel } from '../components/Pixel';
import PixelRow from '../components/PixelRow';
import ColorButton from '../components/ColorButton';
import SaveName from '../components/SavePixelArt';
import '../css/PixelArtsEdit.css';
import { useLocation } from 'react-router';
import outPutPixelArts from '../modules/requestApi/outPutPixelArts';
import UndoRedoButton from '../components/UndoRedoButton';
import fillColor from '../images/fillColor.png'

type ColorObj = {
  red: number;
  green: number;
  blue: number;
}

let PixelTable: Pixel[][] = [...Array(32)].map((_, i) => {
  return [...Array(32)].map((_, j) => {
    return {
      x: i,
      y: j,
      red: 0,
      green: 0,
      blue: 0
    }
  })
});

const URLength = 20;

let UndoRedoPixels:Pixel[][][]= [...Array(URLength)].map(() => {
  return PixelTable;
});

const Color: ColorObj[] = [{ red: 1, green: 0, blue: 0 }, { red: 0, green: 1, blue: 0 }, { red: 0, green: 0, blue: 1 }, { red: 1, green: 1, blue: 0 }, { red: 0, green: 1, blue: 1 }, { red: 1, green: 0, blue: 1 }, { red: 0, green: 0, blue: 0 }, { red: 1, green: 1, blue: 1 }]

const PixelArtsEdit = () => {
  let [pixels, setPixel] = useState(PixelTable);
  const [isClicked, setClicked] = useState(false);
  const [isUpdated,setIsUpdated] = useState(false);
  const [isUpdateUR,setIsUpdateUR] = useState(false);
  const [color, setColor] = useState(Color[0]);
  const [backgroundColor,setBackgroundColor] = useState(Color[6])
  const [save, setSaveName] = useState("");
  const [isNew, setIsNewPixelArt] = useState(true);
  const [startIndex, setStartIndex] = useState(-1);
  const [endIndex, setEndIndex] = useState(-1);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isInit, setIsInit] = useState(false);
  const [isInitBackgroundColor,setIsInitBackgroundColor] = useState(false)
  const [URPixels, setURPixels] = useState(UndoRedoPixels);
  const location = useLocation().pathname.slice(-1);
  useEffect(() => {
    const loadPixelArt = localStorage.getItem(location);
    if (loadPixelArt) {
      //console.log(JSON.parse(loadPixelArt));
      setPixel(JSON.parse(loadPixelArt).dots);
      setIsNewPixelArt(false);
      setSaveName(JSON.parse(loadPixelArt).name);
      setUR(JSON.parse(loadPixelArt).dots);
    }else{
      setStartIndex(0);
      setCurrentIndex(0);
      setEndIndex(0);
    }
    document.getElementById('currentColor')!.style.backgroundColor = 'red';
  }, []);

  useEffect(() => {
    if(!isInit){
      setAllBGC();
      setIsInit(true)
    }else{
      if(isUpdateUR){
        setUR(false);
        setIsUpdateUR(false);
        setIsUpdated(false);
      }else{
        setAllBGC();
      }
    }
  }, [pixels]);

  useEffect(() => {
    document.getElementById('currentColor')!.style.backgroundColor = `rgb(${color.red === 0 ? 0 : 255},${color.green === 0 ? 0 : 255},${color.blue === 0 ? 0 : 255})`;
  }, [color]);

  useEffect(()=>{
    if(!isInitBackgroundColor){
      setIsInitBackgroundColor(true);
    }else{
      const newPixels = pixels.map((row) => {
        return row.map((p) => {
          let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
          let element: any = document.getElementById(id);
          element.style.backgroundColor = `rgb(${backgroundColor.red === 0 ? 0 : 255},${backgroundColor.green === 0 ? 0 : 255},${backgroundColor.blue === 0 ? 0 : 255})`
          return {...p,red:backgroundColor.red,green:backgroundColor.green,blue:backgroundColor.blue};
        })
      })
      setPixel(newPixels);
      setIsUpdateUR(true);
    }
    
  },[backgroundColor])

  useEffect(()=>{
    if(isUpdateUR){
      const newPixels = pixels.map((row,i)=>{
        return row.map((p,j)=>{
          let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
          let element = document.getElementById(id);
          let [r,g,b] = element!.style.backgroundColor.substring(4).slice(0,-1).split(',').map((i:string) => Number(i) == 0?0:1)
            return {...p,red:r,green:g,blue:b}
        })
      })
      setPixel(newPixels);
    }
  },[isUpdateUR])

  
  const setUR = (data:any) => {
    let newUR;
    const current = (URLength-1)<(currentIndex+1)?0:(currentIndex+1);
    if(data){
      newUR = URPixels.map((urPixel,i) => {
        if(0 != i){
          return urPixel;
        }
        return urPixel.map((urRow,j)=>{
          return urRow.map((urP,k) => {
            return { ...urP, red: data[j][k].red, green: data[j][k].green, blue: data[j][k].blue }
          })
        })
      })
    }else{
      newUR = URPixels.map((urPixel,i) => {
        if(current != i){
          return urPixel;
        }
        return urPixel.map((urRow,j)=>{
          return urRow.map((urP,k) => {
            return { ...urP, red: pixels[j][k].red, green: pixels[j][k].green, blue: pixels[j][k].blue }
          })
        })
      })
    }
    setURPixels(newUR);
    if(startIndex < 0){
      setStartIndex(0);
    }else if(startIndex == current){
      let start = (URLength-1)<(startIndex + 1)?0:(startIndex + 1);
      setStartIndex(start);
    }
    setEndIndex(current);
    setCurrentIndex(current);
  }

  const pixelrows = pixels.map((row) => {
    return row.map((p) => {
      let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
      return (
        <PixelRow
          pixel={p}
          key={id}
          onMouseDown={() => handleMouseDown()}
          onMouseUp={() => handleMouseUp()}
          onPixelOver={(x, y) => handlePixelOver(x, y)}
          onPixelClick={(x, y) => handlePixelClick(x, y)}
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

  const handleMouseWindowUp = (e:any) => {
    if(e){
      setClicked(false);
    }
  }

  const handleMouseWindowDown = (e:any) => {
    if(e){
      setClicked(true);
    }
  }
  
  const setAllBGC = () => {
    pixels.map((row) => {
      row.map((p) => {
        let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
        let element: any = document.getElementById(id);
        element.style.backgroundColor = `rgb(${p.red === 0 ? 0 : 255},${p.green === 0 ? 0 : 255},${p.blue === 0 ? 0 : 255})`;
      })
    })
  }

  const setBGC = (x:number,y:number) => {
    const id = (x < 10 ? "0" + x : x) + "" + (y < 10 ? "0" + y : y);
    const element: any = document.getElementById(id);
    element.style.backgroundColor = `rgb(${color.red === 0 ? 0 : 255},${color.green === 0 ? 0 : 255},${color.blue === 0 ? 0 : 255})`;
  }

  const handlePixelOver = (x: number, y: number) => {
    if (isClicked) {
      setBGC(x,y);
      setIsUpdated(true);
    }else{
      if(isUpdated){
        setIsUpdateUR(true);
      }
    }
  }

  const handlePixelClick = (x: number, y: number) => {    
    setBGC(x,y);
    setIsUpdateUR(true);
  }


  const handleColorChange = (index: number) => {
    setColor(Color[index]);
  }

  const handleNameChange = (name: string) => {
    setSaveName(name);
  }

  const handlePixelArtSaveW = () => {
    handlePixelArtSave()
  }

  const handlePixelArtSave = () => {
    let id = 0;
    if (localStorage.length !== 0) {
      for (let i = 0, length = localStorage.length; i < length; ++i) {
        let w = localStorage.key(i);
        if (id < Number(w)) {
          id = Number(w);
        }
      }
      id = id + 1;
    }
    if (!isNew) {
      const loadPixelArt = localStorage.getItem(location);
      id = (JSON.parse(loadPixelArt!).id);
    }
    const PA = {
      "id": id,
      "name": save,
      "dots": pixels
    }
    localStorage.setItem(String(id), JSON.stringify(PA));
  }

  const handleMakeItShine = async () => {
    // LEDにデータを送信
    outPutPixelArts(pixels);
  }

  const handleDeleteColor = () => {
    const newPixels = pixels.map((row) => {
      return row.map((p) => {
        let id = (p.x < 10 ? "0" + p.x : p.x) + "" + (p.y < 10 ? "0" + p.y : p.y)
        let element: any = document.getElementById(id);
        element.style.backgroundColor = `rgb(${backgroundColor.red === 0 ? 0 : 255},${backgroundColor.green === 0 ? 0 : 255},${backgroundColor.blue === 0 ? 0 : 255})`
        return {...p,red:backgroundColor.red,green:backgroundColor.green,blue:backgroundColor.blue};
      })
    })
    setPixel(newPixels);
    setIsUpdateUR(true);
  }

  const backgroundColorButtons = () => {
    return (
      <div id="backgroundColorButtons">
        <img src={fillColor}/>
        <ColorButton key="red" value="red" index={0} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="green" value="green" index={1} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="blue" value="blue" index={2} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="yellow" value="yellow" index={3} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="cyan" value="cyan" index={4} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="purple" value="purple" index={5} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="black" value="black" index={6} onColorChange={(index) => handleBackgroundColor(index)} />
        <ColorButton key="white" value="white" index={7} onColorChange={(index) => handleBackgroundColor(index)} />
      </div>
    )
  }

  const handleBackgroundColor = (index:number) => {
    setBackgroundColor(Color[index]);
    
  }

  const handleClickUndo = () => {
    if(startIndex == -1){
      return
    }
    let current = (currentIndex-1)<0?(URLength-1):(currentIndex-1);
    if(startIndex < endIndex){
      if(startIndex <= currentIndex-1){
        setPixel(URPixels[current]);
        setCurrentIndex(current);
      }
    }else if(startIndex > endIndex){
      if(endIndex != current){
        setPixel(URPixels[current]);
        setCurrentIndex(current); 
      }
    }
  }


  const handleClickRedo = () => {
    if(startIndex == -1){
      return
    }
    let current = (URLength-1)<(currentIndex+1)?0:(currentIndex+1);
    if(startIndex < endIndex){
      if(currentIndex+1 <= endIndex){
        setPixel(URPixels[current]);
        setCurrentIndex(current); 
      }
    }else if(startIndex > endIndex){
      if(startIndex != current){
        setPixel(URPixels[current]);
        setCurrentIndex(current); 
      }
    }
  }

  //console.log("s:"+startIndex+",c:"+currentIndex+",e:"+endIndex);

  return ( 
    <div id="pixelArtEdit" onMouseDown={(e) => handleMouseWindowDown(e)} onMouseUp={(e) => handleMouseWindowUp(e)}>
      {backgroundColorButtons()}
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
      <UndoRedoButton onClickUndo={handleClickUndo} onClickRedo={handleClickRedo}/>
      <div id="content">
        <div id="colorPalet">
          <div id="currentColor"></div>
          <ColorButton key="red" value="red" index={0} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="green" value="green" index={1} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="blue" value="blue" index={2} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="yellow" value="yellow" index={3} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="cyan" value="cyan" index={4} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="purple" value="purple" index={5} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="black" value="black" index={6} onColorChange={(index) => handleColorChange(index)} />
          <ColorButton key="white" value="white" index={7} onColorChange={(index) => handleColorChange(index)} />
        </div>
        <SaveName name={save} onNameChange={(name) => handleNameChange(name)} onPixelArtSave={() => handlePixelArtSaveW()}
          onMakeItShine={() => handleMakeItShine()} onDeleteColor={() => handleDeleteColor()} />
      </div>
    </div>
  );

};


export default PixelArtsEdit;
