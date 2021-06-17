import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
 
const PixelArtsPreview = () => {
  return (
    <React.Fragment>
      <PreviewPixels/>
      <ButtonGroup orientation="vertical">
        <Button component={Link} to='/pixel-arts-edit/:id'>編集</Button>
        <Button onClick={DeletePixels}>削除</Button>
        <Button onClick={ReflectPixels}>実行</Button>
      </ButtonGroup>
    </React.Fragment>
  );
}

export default PixelArtsPreview;

//プレビュー表示領域、仮のcss
const divStyle = {
  backgroundColor: 'red',
  width: 500,
  height: 500
};

//プレビュー表示
const PreviewPixels = () => {
  return <div style={divStyle}>プレビュー</div>;
}

//削除
const DeletePixels = () => {
  console.log("DeletePixels");
}

//実行
const ReflectPixels = () => {
  console.log("ReflectPixels");
}