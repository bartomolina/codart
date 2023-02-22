import { NextApiRequest, NextApiResponse } from "next";

// const warmUpSeconds = 10 * 60 * 60;
const warmUpSeconds = 1;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let log = "warming up";
  const dev = process.env.NODE_ENV !== "production";
  const protocol = dev ? "http://" : "https://";

  global.lastWarmUp = global.lastWarmUp || 0;
  const secondsSinceLastWarmUp = (new Date().getTime() - global.lastWarmUp) / 1000;

  log += "/seconds sice last warmup: " + secondsSinceLastWarmUp;

  if (secondsSinceLastWarmUp > warmUpSeconds) {
    console.log("----------------- WARM UP START -----------------");
    log += "/warming up";
    global.lastWarmUp = new Date().getTime();
    console.time("warmup");
    return fetch(`${protocol}${req.headers.host}/collections/0xa7d8d9ef8d8ce8992df33d8b8cf4aebabd5bd270-370`).then(
      () => {
        console.timeEnd("warmup");
        log += "/warmup successful";
        console.log("----------------- WARM UP END -----------------");
        return res.status(200).json({ result: log });
      }
    );
  }

  return res.status(200).json({ result: log });
}
