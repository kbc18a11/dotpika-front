import React from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { BrowserRouter as Route, Switch, Link } from 'react-router-dom';
 
const PixelArtsPreview = () => {
  return (
    <React.Fragment>
      <ButtonGroup orientation="vertical">
        <Button component={Link} to='/pixel-arts-edit/:id'>編集</Button>
        <Button>削除</Button>
        <Button>再生</Button>
      </ButtonGroup>
    </React.Fragment>
  );
}

export default PixelArtsPreview;
