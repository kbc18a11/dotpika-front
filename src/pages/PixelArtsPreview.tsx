import React, {useState} from 'react';
import { Button, ButtonGroup, IconButton, Icon, makeStyles } from '@material-ui/core';
import { BrowserRouter as Route, Switch, Link, useParams, Redirect} from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@material-ui/icons';
import '../css/PixelArtsPreview.css';

const PixelArtsPreview = (props: any) => {
  const { id: _id } = useParams<{id: string}>();
  const paeUrl = "/pixel-arts-edit/" + _id;
  return (
    <React.Fragment>
      <div id="pixelArtsPreview">
        <PreviewPixels _id={_id} className="pixelArea" />
        <div className="btnSide">
          <div className="margin"></div>
          <div className="btn">
            <ButtonGroup orientation="vertical">
              <Button component={Link} to={paeUrl}>編集</Button>
              <Button onClick={() => deletePixels(_id)} component={Link} to="/pixel-arts-me">削除</Button>
              <Button onClick={reflectPixels}>実行</Button>
            </ButtonGroup>
          </div>
        </div>
        {/* <IconButton onClick={slidePixels}>
          <ArrowBack color="primary"/>
        </IconButton>
        <IconButton>
          <ArrowForward color="primary"/>
        </IconButton> */}
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
const deletePixels = (_id: string) => {
  localStorage.removeItem(_id);
}

//ドット絵を描画する
const reflectPixels = () => {
  console.log("reflectPixels");
}

// 他のドット絵を表示する
// const slidePixels = () => {
//   console.log("slidePixels");
// }
