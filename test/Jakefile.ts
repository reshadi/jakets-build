import * as Fs from "fs";
import * as Build from "../Build";
import { GlobalTask, CreateMakeRelative } from "jakets/lib/Jakets";
import { ClientTscCompileTask } from "../lib/ClientTscCompileTask";

const MakeRelative = CreateMakeRelative(__dirname);

export const TestTask = GlobalTask(
  "build_test",
  [
    Build.ServerTscTask.Compile("app", ["./app/App.ts"].map(MakeRelative)),
    Build.ClientTscTask.Compile("app", ["app/App.ts"].map(MakeRelative)),
    // new ClientTscCompileTask({ closure: {} }, "/client_opt").Compile("client_opt", ["app/App.ts"].map(MakeRelative))
  ],
  async function () {
    let output = Fs.readFileSync("./build/compile/client/release/app/app.js");
    if (!/[.]prototype[.].*console[.]log\("Hello"\)/.test(output.toString())) {
      throw `Incorrect output: ${output}`;
    } else {
      require("../build/compile/client/release/app/app");
    }
  }
);