import { NextApiRequest, NextApiResponse } from "next";

const warmUpSeconds = 10 * 60 * 60;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const dev = process.env.NODE_ENV !== 'production';
  const protocol = dev ? 'http://' : 'https://';

  global.lastWarmUp = global.lastWarmUp || 0;
  const secondsSinceLastWarmUp = (new Date().getTime() - global.lastWarmUp) / 1000;

  if (secondsSinceLastWarmUp > warmUpSeconds) {
    console.log("----------------- PERFORMANCE WARM UP START -----------------");
    global.lastWarmUp = new Date().getTime();
    console.time("warmup");
    return fetch(`${protocol}${req.headers.host}/collections/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-370`).then(() => {
      console.timeEnd("warmup");
      console.log("----------------- PERFORMANCE WARM UP END -----------------");
      return res.status(200).end();
    });
  }

  return res.status(200).end();
}
