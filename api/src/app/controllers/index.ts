import { readdirSync } from "fs";
import { Express } from "express";

export function loadControllers(app: Express) {
  console.log('\n--- IMPORTING CONTROLLERS ---');
  readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.ts')))
    .forEach(file => load(file, app));
}

function load (file: any, app: Express): void {
  const { controller } = require(`./${file}`);
  controller(app);
}