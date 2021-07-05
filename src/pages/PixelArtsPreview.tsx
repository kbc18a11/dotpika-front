import React from 'react';
import { Button, ButtonGroup, IconButton, Icon, makeStyles } from '@material-ui/core';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
import { ArrowBack, ArrowForward } from '@material-ui/icons';

const PreviewStyles = makeStyles({
  content: {
    margin: '20px 0px 20px 0px',
    display: 'inline-block'
  },
  pixelArea: {
    backgroundColor: 'red',
    width: '576px',
    height: '576px',
    margin: '0px',
    float: 'left'
  },
  btnSide: {
    float: 'left'
  },
  margin: {
    height: '450px'
  },
  btn: {
    margin: '10px'
  }
});

const PixelArtsPreview = () => {
  const classes = PreviewStyles();
  return (
    <React.Fragment>
      <div className={classes.content}>
        <PreviewPixels className={classes.pixelArea} />
        <div className={classes.btnSide}>
          <div className={classes.margin}></div>
          <div className={classes.btn}>
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
  return <div className={props.className}>プレビュー</div>;
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
