import React from "react";
import Button from '@material-ui/core/Button';
import Input from "@material-ui/core/Input";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    saveName: {
      width:230,
      height:30,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding:0,
      float:'left',
      marginTop:30,
    },
    saveButton:{
      height:30,
      width:50,
      marginTop:30,
    },
    shineButton:{
        height:60,
        width:100,
    },
    deleteButton:{
        height:60,
        width:100,
    }
  });
  

type SavePixelArtProps = {
    name: string;
    onNameChange: (name:string) => void;
    onPixelArtSave: () => void;
    onDeleteColor: () => void;
    onMakeItShine:() => void;
}

const SavePixelArt = (props: SavePixelArtProps) => {
    const classes = useStyles();
    const name = props.name;

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        props.onNameChange(e.target.value);
    }

    const handlePixelArtSaveW = () => {
        props.onPixelArtSave();
    }

    const handleDeleteColor = () => {
        props.onDeleteColor();
    }

    const handleMakeItShine = () => {
        props.onMakeItShine();
    }

    return(
        <div id="saveContent">
            <div id="savePixelArt">
                <form className={classes.saveName} noValidate autoComplete="off" 
                onKeyPress={e => {
                    if (e.key === 'Enter') {
                        handlePixelArtSaveW()
                    }
                }}>
                    <Input placeholder="名前を付けて保存" value={name} onChange={handleNameChange} inputProps={{ 'aria-label': 'description' }}/>
                </form>
                <Button className={classes.saveButton} variant="contained" onClick={handlePixelArtSaveW}>保存</Button> 
            </div>
            <div id="shineDeleteButtons">
                <Button className={classes.shineButton} variant="contained" onClick={handleMakeItShine}>光らせる</Button> 
                <Button className={classes.deleteButton} variant="contained" onClick={handleDeleteColor}>全消し</Button> 
            </div>
        </div>
    );
}

export default SavePixelArt;

