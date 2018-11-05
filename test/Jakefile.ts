import * as Fs from "fs";
import * as Build from "../Build";
import { GlobalTask, CreateMakeRelative } from "jakets/lib/Jakets";

const MakeRelative = CreateMakeRelative(__dirname);

export const TestTask = GlobalTask(
  "build_test",
  [
    Build.ServerTscTask.Compile("app", ["./app/App.ts"].map(MakeRelative)),
    Build.ClientTscTask.Compile("app", ["app/App.ts"].map(MakeRelative))
  ],
  async function () {
    let output = Fs.readFileSync("./build/compile/client/release/app.js");
    if (!/[.]prototype[.].*console[.]log\("Hello"\)/.test(output.toString())) {
      throw `Incorrect output: ${output}`;
    }
  }
);