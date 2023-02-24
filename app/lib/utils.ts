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

for (let j = 0; j < 32; j++) {
  hashPairs.push(tokenData.hash.slice(2 + j * 2, 4 + j * 2));
}

let decPairs = hashPairs.map((x) => {
  return parseInt(x, 16);
});

function setup() {
  createCanvas(400, 440);
  background(240);
  noLoop();
}

function draw() {
  colorMode(HSB, 255);
  let colorH = map(decPairs[18], 0, 255, 0, 255);
  let colorS = map(decPairs[19], 0, 255, 0, 150);
  let colorB = map(decPairs[20], 0, 255, 210, 255);
  fill(colorH, colorS, colorB);
  quad(0, 400, 120, 120, 160, 200, 80, 400);
  quad(160, 90, 200, 0, 340, 280, 260, 280);
  quad(120, 400, 160, 320, 360, 320, 400, 400);
  
  fill(0);
  text("MINTED BY: [PLACEHOLDER]", 0, 425)
}`;
