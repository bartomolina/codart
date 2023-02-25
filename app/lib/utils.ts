import { IABCollection } from "../global";

export const getScriptType = (collection: IABCollection) => {
  let scriptType = collection.scriptTypeAndVersion;
  if (!scriptType && collection.scriptJSON) {
    scriptType = JSON.parse(collection.scriptJSON).type;
  }
  if (scriptType) {
    scriptType = scriptType.replace("p5js", "p5");
    scriptType = scriptType.replace("threejs", "three");
    scriptType = scriptType.replace("paperjs", "paper");
    scriptType = scriptType.replace("tonejs", "tone");
    if (scriptType.indexOf("@") >= 0) {
      scriptType = scriptType.substr(0, scriptType.indexOf("@"));
    }
  }

  return scriptType;
};

export const libraries = {
  p5: "https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.min.js",
  three: "https://cdn.jsdelivr.net/npm/three@0.124.0/build/three.min.js",
};

export const defaultCode = `let hashPairs = [];
for (let a = 0; a < 32; a++)
  hashPairs.push(tokenData.hash.slice(2 + 2 * a, 4 + 2 * a));
let decPairs = hashPairs.map((a) => parseInt(a, 16));
function setup() {
  createCanvas(400, 440), background(240), noLoop();
  noStroke();
}
function draw() {
  colorMode(HSB, 255);
  let a = map(decPairs[18], 0, 255, 0, 255),
    e = map(decPairs[19], 0, 255, 0, 150),
    s = map(decPairs[20], 0, 255, 210, 255);
  fill(a, e, s);
  quad(0, 400, 130, 125, 170, 200, 80, 400);
  quad(165, 85, 200, 0, 340, 280, 265, 280);
  quad(120, 400, 160, 330, 360, 330, 400, 400);
  fill(0);
  text("MINTED BY: " + tokenData.minter, 0, 425);
}`;
