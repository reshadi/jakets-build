import * as Fs from "fs";
import * as Build from "../Build";
import { GlobalTask, CreateMakeRelative } from "jakets/lib/Jakets";

const MakeRelative = CreateMakeRelative(__dirname);

export const TestTask = GlobalTask(
  "test",
  [
    Build.ServerTscTask.Compile("app", ["./app/App.ts"].map(MakeRelative)),
    Build.ClientTscTask.Compile("app", ["app/App.ts"].map(MakeRelative))
  ],
  async function () {
    let output = Fs.readFileSync("./build/compile/client/release/app.js");
    if (output.toString() !== 'console.log("Hello");'){
      throw "Incorrect output"
    }
  }
);