import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
import '../css/PixelArtsPreview.css'
 
/*
問題発生中!
Buttonタグ中の文字列が縦になる
実行、削除のボタンが影響を受けている

・発生源
PixelArtsEdit.cssが影響している
*/
const PixelArtsPreview = () => {
  return (
    <div id = "preview">
      <PreviewPixels/>
      <ButtonGroup orientation="vertical">
        <Button component={Link} to="/pixel-arts-edit/:id">編集</Button>
        <Button onClick={DeletePixels}>削除</Button>
        <Button onClick={ReflectPixels}>実行</Button>
      </ButtonGroup>
    </div>
  );
}

export default PixelArtsPreview;

let style = {
  backgroundColor: "red",
  width: 500,
  height: 500
}

//プレビュー表示
const PreviewPixels = () => {
  return <div className = "pixelArea">プレビュー</div>;
}

//削除
const DeletePixels = () => {
  console.log("DeletePixels");
}

//実行
const ReflectPixels = () => {
  console.log("ReflectPixels");
}