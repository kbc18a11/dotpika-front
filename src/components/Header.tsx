import React from 'react';
import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom'




const Header = () => {

  return (

    <div className="headermain">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
          </IconButton>
         
            <div className="title">ドットピカ</div>
         
          <Button color="inherit"><div className="button-top"><Link to="/pixel-arts-edit" style={{ textDecoration: "none",color:'white' }}>色を塗る</Link></div></Button>
          <Button color="inherit"><div className="button-top"><Link to="/pixel-arts-me" style={{ textDecoration: "none",color:'white' }}>一覧へ</Link></div></Button>
          <Button color="inherit"><div className="button-top"><Link to="/pixel-arts-templates" style={{ textDecoration: "none",color:'white' }}>テンプレートを選ぶ</Link></div></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header
