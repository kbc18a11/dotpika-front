import { useState, useEffect } from 'react';
import {ArtsMe} from '../components/ArtsMe';
import '../css/PixelArtsMe.css';
import PixelArtMe from '../components/PixelArtMe';

let ArtMe:ArtsMe[] = new Array();

const PixelArtsMe = () => { 
  const [pixelArts, setPixelArts] = useState(ArtMe);
  const compareFunc = (a:ArtsMe, b:ArtsMe) => {
    return a.id - b.id;
  }
   
  useEffect(() => {
    const localStorageData = Object.keys(localStorage).map((key) =>{
      return JSON.parse(localStorage.getItem(key)!);
    });
    localStorageData.sort(compareFunc);
    console.log(localStorageData);
    
    setPixelArts(localStorageData);
  },[]);

  const handlePlayPixelArt = (id:string) => {
    const playData = pixelArts.filter(art => art.id == Number(id));
    alert("LEDを光らせるボタン"+JSON.stringify(playData));
  }


  const handleDeletePixelArt = (id:string) => {
    const newData = pixelArts.filter(art => art.id !== Number(id));
    localStorage.removeItem(id);
    setPixelArts(newData);
  }

  const getPixelArts = 
    pixelArts.map((pixelArt) => {
    return (<PixelArtMe
      pixelArt={pixelArt}
      key={pixelArt.id}
      onClickPlay={(id) => handlePlayPixelArt(id)}
      onClickDelete={(id) => handleDeletePixelArt(id)}
      />
    );
  });

  
  return (
    <div className="ArtsMe">
    <h1>ドット絵一覧画面</h1>
      <div className="items">
      {getPixelArts}
      </div>
    </div>
  );
}

export default PixelArtsMe;