import '../css/PixelArtsTemplates.css';
import Button from '@material-ui/core/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PixelArt from '../components/PixelArt';
import { makeStyles } from '@material-ui/core/styles';
import playbutton from '../images/play.png';
import { Paper } from '@material-ui/core';
import outPutPixelArts from '../modules/requestApi/outPutPixelArts';
import { Pixel } from '../components/Pixel';

const useStyles = makeStyles({
  playButton: {
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 36,
    width: 36,
    padding: 0,
    marginTop: 5,
    marginLeft: 20,
    marginRight: 5,
    marginBottom: 15,
  },
});

// LEDの出力をクリアさせるデータ
const clearOutPutLed: Pixel[][] = [...Array(32)].map((_, i) => {
  return [...Array(32)].map((_, j) => {
    return {
      x: i,
      y: j,
      red: 0,
      green: 0,
      blue: 0
    }
  })
});

const PixelArtsTemplates = () => {
  const [pixelArts, setPixelArts] = useState<PixelArt[] | null>(null);
  const [outPutLedExits, setOutPutLedExits] = useState(false);

  const classes = useStyles();

  /**
   * テンプレートのデータをLEDに出力させる
   */
  const outPutLed = async (index: number) => {
    if (!pixelArts) return;

    if (outPutLedExits) {
      await outPutPixelArts(clearOutPutLed);
    }

    const pixelArt = pixelArts[index];
    await outPutPixelArts(pixelArt.dots);

    setOutPutLedExits(true);
  }

  useEffect(() => {
    const init = async () => {
      // テンプレート一覧取得処理
      const url = 'http://localhost:5000/api/pixel-arts-templates';

      try {
        const res = await axios.get(url);

        console.log(res);

        setPixelArts(res.data);
      } catch (e) {
        console.error(e.response);

        if (!e.response) {
          alert(
            'システムエラーが発生しました。お手数をおかけいたしますが、会場スタッフにご連絡ください。'
            + 'APIが起動できていません。スタッフは、マニュアルファイルの手順に従って、APIを起動してください。'
            + 'もし解決できない場合は、代表者にご連絡ください。'
          );
          return;
        }

        if (e.response.status !== 404) {
          if (e.response.data.sqlMessage === 'Too many connections') {
            alert(
              'システムエラーが発生しました。お手数をおかけいたしますが、会場スタッフにご連絡ください。'
              + 'MySQLの接続数が最大に達しました。APIを再起動してください。'
              + 'もし解決できない場合は、代表者にご連絡ください。'
            );
          }

          alert(
            'システムエラーが発生しました。お手数をおかけいたしますが、会場スタッフにご連絡ください。'
            + 'スタッフは、ブラウザのconsoleを確認して、マニュアルファイルの手順に従ってください。'
            + 'もし解決できない場合は、代表者にご連絡ください。'
          );
        }

      }
    };
    init();
  }, []);

  return (
    <div>
      <h2 id='templateh2'>テンプレート選択画面</h2>
      <div className="body">
        {
          pixelArts?.map((pixelArt: PixelArt, index: number) => {
            return (
              <Paper className="pixea-art" elevation={3}>
                <div className="block-image">
                  <img className="example-image" src={pixelArt.example_image} />
                </div>
                <div className="name">
                  {pixelArt.name}
                </div>
                <Button
                  className={classes.playButton}
                  onClick={() => outPutLed(index)}
                  variant="contained"
                >
                  <img src={playbutton} />
                </Button>
              </Paper>
            );
          })
        }
      </div>
    </div>
  );
}

export default PixelArtsTemplates;
