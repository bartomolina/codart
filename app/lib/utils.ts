import { IABCollection } from "../global";

export const defaultCode = `function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}`;

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
