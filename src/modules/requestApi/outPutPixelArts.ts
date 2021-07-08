import axios from 'axios';
import { Pixel } from '../../components/Pixel';

interface Dot {
  x: number;
  y: number;
  red: number;
  green: number;
  bule: number;
}

export default async (pixelArt: Pixel[][]) => {
  try {
    const response = await axios
      .post(`${process.env.REACT_APP_APP_API_URL}/out-put-pixel-arts/usb`, { Dots: pixelArt });
  } catch (e) {
    console.error(e.response);
  }
};