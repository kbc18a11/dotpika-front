import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import {
    Button,
    makeStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormLabel,
    OutlinedInput,
} from "@material-ui/core/";

const useStyles = makeStyles({
    standardError: {
      width:230,
      height:40,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding:0,
      float:'left',
      marginTop:25,
    },
    saveButton:{
      height:50,
      width:50,
      marginTop:25,
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
    const eMsg:string = "12文字以内で名前を入力してください"
    const name = props.name;
    const [open, setOpen] = useState(false);
    const [err,setErr] = useState(true);
    const [errMsg,setErrMsg] = useState(eMsg);
    const classes = useStyles();
    if(err){
        if(0<name.length&&name.length<13){
            setErr(false);
            setErrMsg('OK');
        }
    }

    const handleClickOpen = () => {
        if(!err){
            setOpen(true);
        }
    };
    
    const handleCloseYes = () => {
        setOpen(false);
        handlePixelArtSaveW();
    };

    const handleCloseNo = () => {
        setOpen(false);
    };

    const handleNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value;
        judgeName(name);
        props.onNameChange(name);
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

    const judgeName = (name:string) => {
        if(0 < name.length && name.length < 13){
            setErr(false);
            setErrMsg("OK");
        }else{
            setErr(true);
            setErrMsg(eMsg);
        }
    }

    return(
        <div id="saveContent">
            <div id="savePixelArt">
                <FormControl error={err} disabled={false}>
                    <FormLabel>
                        <div　id="errorMessage">{errMsg}</div>
                        <OutlinedInput
                            fullWidth
                            id="inputName"
                            name="inputName"
                            type="text"
                            placeholder="名前を付けて保存"
                            required={true}
                            onChange={handleNameChange} 
                            value={name}
                        />
                    </FormLabel>
                </FormControl>
                <Button className={classes.saveButton} variant="contained" onClick={handleClickOpen}>保存</Button>
            </div>
            <div id="shineDeleteButtons">
                <Button className={classes.shineButton} variant="contained" onClick={handleMakeItShine}>光らせる</Button> 
                <Button className={classes.deleteButton} variant="contained" onClick={handleDeleteColor}>全消し</Button> 
            </div>
            <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        「{name}」を保存しますか？  
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseYes} color="primary">
                    <Link to="/pixel-arts-me" id="toLink">はい</Link>
                    </Button>
                    <Button onClick={handleCloseNo} color="primary" autoFocus>
                        いいえ
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default SavePixelArt;

