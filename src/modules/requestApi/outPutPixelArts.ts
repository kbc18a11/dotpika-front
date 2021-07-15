import axios from 'axios';
import { Pixel } from '../../components/Pixel';

export default async (pixelArt: Pixel[][]) => {
  try {
    const response = await axios
      .post(`${process.env.REACT_APP_APP_API_URL}/out-put-pixel-arts/usb`, { Dots: pixelArt });
  } catch (e) {
    console.error(e.response);

    if (e.response) {
      alert(
        'システムエラーが発生しました。お手数をおかけいたしますが、会場スタッフにご連絡ください。'
        + 'スタッフは、ブラウザのconsoleを確認して、マニュアルファイルを確認して対処してください。'
        + 'もし解決できない場合は、代表者にご連絡ください。'
      );
    }
  }
};
