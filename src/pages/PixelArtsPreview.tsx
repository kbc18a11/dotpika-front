import React, {useState} from 'react';
import { Button, ButtonGroup, IconButton, Icon, makeStyles } from '@material-ui/core';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import '../css/PixelArtsPreview.css';

const PixelArtsPreview = (props: any) => {
  //localStorageのkeyの取得の仕方を模索中
  //const _id: string = props._id;
  const _id: string = "1"; 
  return (
    <React.Fragment>
      <div id="pixelArtsPreview">
        <PreviewPixels _id={_id} className="pixelArea" />
        <div className="btnSide">
          <div className="margin"></div>
          <div className="btn">
            <ButtonGroup orientation="vertical">
              <Button component={Link} to="/pixel-arts-edit/:id">編集</Button>
              <Button onClick={deletePixels}>削除</Button>
              <Button onClick={reflectPixels}>実行</Button>
            </ButtonGroup>
          </div>
        </div>
        <IconButton onClick={slidePixels}>
          <ArrowBack color="primary"/>
        </IconButton>
        <IconButton>
          <ArrowForward color="primary"/>
        </IconButton>
      </div>
    </React.Fragment>
  );
}

export default PixelArtsPreview;

//プレビュー表示
const PreviewPixels = (props: any) => {
  
  const salvageLocal = localStorage.getItem(props._id);
  const parseLocal = JSON.parse(salvageLocal!);
  const dots = parseLocal["dots"];
  
  let tr = [];
  for(var i = 0; i < dots.length; i++) {
    let line = dots[i];
    let td = [];
    for(var j = 0; j < line.length; j++) {
      let styles = {
        backgroundColor: `rgb(${line[j].red === 0 ? 0 : 255},${line[j].green === 0 ? 0 : 255},${line[j].blue === 0 ? 0 : 255})`,
      }
      console.log(styles.backgroundColor);
      td[j] = <td style={styles}></td>;
    }
    tr[i] = React.createElement("tr", {}, td);
  }

  return (
    <table className={props.className}>{tr}</table>
  );
}

const createTd = () => {
  return 
}

//ドット絵を削除する
const deletePixels = () => {
  console.log("deletePixels");
}

//ドット絵を描画する
const reflectPixels = () => {
  console.log("reflectPixels");
}

//他のドット絵を表示する
const slidePixels = () => {
  console.log("slidePixels");
}
