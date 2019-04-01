import * as Fs from "fs";
import * as Path from "path";
import * as Typescript from "typescript";

import * as Jakets from "jakets/Jakefile";
import { TscTask } from "jakets/lib/TscTask";
import * as Rollup from "jakets-rollup/lib/RollupTask";
import * as Closure from "jakets-closure/lib/ClosureTask";
import { FileTask } from "jakets/lib/task/FileTask";
import { TscOptions, TscCompileTask } from "./TscCompileTask";

export interface ClientTscOptions extends TscOptions {
  rollup?: Rollup.RollupOptions,

  /** pass null to disable release optimizations */
  closure?: Closure.ClosureOptions | null,
}

export class ClientTscCompileTask<OptionsType extends ClientTscOptions> extends TscCompileTask<OptionsType> {
  readonly DebugDir: string;
  readonly ReleaseDir: string;

  constructor(options?: OptionsType, compileSubDir?: string) {
    super(
      {
        tsc: {
          module: Typescript.ModuleKind.ES2015,
          target: Typescript.ScriptTarget.ES5,
          // target: Typescript.ScriptTarget.ES2015,
          lib: ["es2015", "dom", "scripthost"].map(l => `lib.${l}.d.ts`),
          // outDir: DebugDir,
        },
        rollup: {
          Bundle: {
            // dest: "",
            format: "iife",
            // moduleName: "TopModule",
            // sourceMap: "inline",
            // useStrict: false
          }
        },
        closure: {
          // externs: ["extern_jquery.js", "extern_bootstrap.js"]
        },
        ...options || {} as OptionsType
      },
      compileSubDir || "/client"
    );
    this.DebugDir = this.CompileDir + "/debug";
    this.ReleaseDir = this.CompileDir + "/release";
    this.Options.tsc.outDir = this.DebugDir;
  }

  Compile(
    name: string
    , filenames: string[]
    , dependencies?: Parameters<typeof TscTask>[2]
  ): FileTask {
    let compileTask = super.Compile(
      "debug/tsc/" + name
      , filenames
      , dependencies
    );

    let filename = `${name}.js`;
    let debugFile = `${this.DebugDir}/${filename}`;

    let packageTask = Rollup.RollupTask(
      "debug/rollup/" + name
      , debugFile
      , filenames.map(f => Path.join(this.DebugDir, f.replace(".ts", ".js")))
      , [compileTask]
      , this.Options.rollup
    );

    if (this.Options.closure === null) {
      return packageTask;
    }

    let releaseFile = `${this.ReleaseDir}/${filename}`;

    let optimizeTask = Closure.ClosureTask(
      "release/closure/" + name
      , [packageTask.GetName(), Jakets.DirectoryTask(Path.dirname(this.ReleaseDir)).GetName()]
      , releaseFile
      , [debugFile]
      , this.Options.closure
    );
    return optimizeTask;
  }
}