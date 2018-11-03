import * as Fs from "fs";
import * as Path from "path";
import * as Typescript from "typescript";

import * as Jakets from "jakets/Jakefile";
import { TscTask } from "jakets/lib/TscTask";
import * as Rollup from "jakets-rollup/lib/RollupTask";
import * as Closure from "jakets-closure/lib/ClosureTask";
import { FileTask } from "jakets/lib/task/FileTask";

const MakeRelative = Jakets.CreateMakeRelative(__dirname);


//NOTE: this has to be a file task, otherwise, other file tasks will always trigger
export const PreCompileTask = Jakets.FileTask(`${Jakets.BuildDir}/.precompile`, [MakeRelative("Jakefile.ts")], async function () {
  return Jakets.ExecAsync(`touch ${this.GetName()}`);
});

export function CopyFileTask(src: string, dest: string) {
  PreCompileTask.DependsOn([
    Jakets.FileTask(
      dest,
      [src, Jakets.DirectoryTask(Path.dirname(dest))],
      async () => {
        console.log(`cp ${src} ${dest}`);
        Fs.writeFileSync(dest, Fs.readFileSync(src));
      }
    )
  ]);
}

export class TscCompileTask {
  readonly CompileDir = MakeRelative(Jakets.BuildDir + "/compile");

  readonly DefaultTscOptions: Typescript.CompilerOptions = {
    // module: Typescript.ModuleKind.ES2015,
    // target: Typescript.ScriptTarget.ES5,
    outDir: this.CompileDir,

    moduleResolution: Typescript.ModuleResolutionKind.NodeJs,
    allowUnreachableCode: true,
    importHelpers: true,
    inlineSourceMap: true,
    noEmitOnError: true,
    // noImplicitAny: true,
    useStrict: true,
    noImplicitReturns: true,
    pretty: true,
    rootDir: Jakets.MakeRelativeToWorkingDir("."),
  };

  protected TscOptions(options: Typescript.CompilerOptions, defaultOptions: Typescript.CompilerOptions = this.DefaultTscOptions): Typescript.CompilerOptions {
    let opts = Object.assign({}, defaultOptions, options);
    return opts;
  }

  constructor(
    options?: Typescript.CompilerOptions,
    compileSubDir?: string
  ) {
    if (compileSubDir) {
      this.CompileDir += compileSubDir;
      this.DefaultTscOptions.outDir = this.CompileDir;
    }
    if (options) {
      this.DefaultTscOptions = this.TscOptions(options, this.DefaultTscOptions);
    }
  }

  Compile(
    name: string
    , filenames: string[]
    , dependencies?: Parameters<typeof TscTask>[2]
    , options?: Typescript.CompilerOptions
  ): FileTask {
    return TscTask(
      name
      , filenames
      , (dependencies || []).concat([PreCompileTask, Jakets.DirectoryTask(Path.dirname(this.CompileDir))])
      , this.TscOptions(options, this.DefaultTscOptions)
    );
  }
}

export class ServerTscCompileTask extends TscCompileTask {
  constructor() {
    super(
      {
        module: Typescript.ModuleKind.CommonJS,
        target: Typescript.ScriptTarget.ES2015,
      },
      "/server"
    );
  }
}
export const ServerTscTask = new ServerTscCompileTask();

export class ClientTscCompileTask extends TscCompileTask {
  readonly DebugDir: string;
  readonly ReleaseDir: string;

  readonly RollupOptions: Rollup.RollupOptions = {
    Bundle: {
      dest: "",
      format: "iife",
      // moduleName: "TopModule",
      // sourceMap: "inline",
      // useStrict: false
    }
  };

  readonly ClosureOptions: Closure.ClosureOptions = {
    // externs: ["extern_jquery.js", "extern_bootstrap.js"]
  };

  constructor() {
    super(
      {
        module: Typescript.ModuleKind.ES2015,
        // target: Typescript.ScriptTarget.ES5,
        target: Typescript.ScriptTarget.ES2015,
        lib: ["es2015", "dom", "scripthost"].map(l => `lib.${l}.d.ts`),
        // outDir: DebugDir,
      }
      , "/client"
    );
    this.DebugDir = this.CompileDir + "/debug";
    this.ReleaseDir = this.CompileDir + "/release";
    this.DefaultTscOptions.outDir = this.DebugDir;
  }

  Compile(
    name: string
    , filenames: string[]
    , dependencies?: Parameters<typeof TscTask>[2]
    , options?: Typescript.CompilerOptions
    , isRelease: boolean = true
  ): FileTask {
    let compileTask = super.Compile(
      "debug/tsc/" + name
      , filenames
      , dependencies
      , options
    );

    let filename = `${name}.js`;
    let debugFile = `${this.DebugDir}/${filename}`;

    let packageTask = Rollup.RollupTask(
      "debug/rollup/" + name
      , debugFile
      , filenames.map(f => Path.join(this.DebugDir, f.replace(".ts", ".js")))
      , [compileTask]
      , this.RollupOptions
    );

    if (!isRelease) {
      return packageTask;
    }

    let releaseFile = `${this.ReleaseDir}/${filename}`;

    let optimizeTask = Closure.ClosureTask(
      "release/closure/" + name
      , [packageTask.GetName(), Jakets.DirectoryTask(Path.dirname(this.ReleaseDir)).GetName()]
      , releaseFile
      , [debugFile]
      , this.ClosureOptions
    );
    return optimizeTask;
  }
}
export const ClientTscTask = new ClientTscCompileTask();

/**
 * default --> compile +-> server-----------+--+--> pre-compile
 *                     \-> client +-> debug /  |
 *                                \-> release /
 */
export const DebugTask = Jakets.GlobalTask("debug", [PreCompileTask]);
export const ReleaseTask = Jakets.GlobalTask("release", [PreCompileTask]);
export const ClientCompileTask = Jakets.GlobalTask("client", [DebugTask, ReleaseTask]);
export const ServerCompileTask = Jakets.GlobalTask("server", [PreCompileTask]);
export const CompileTask = Jakets.GlobalTask("compile", [ServerCompileTask, ClientCompileTask]);
Jakets.DefaultTask.DependsOn([CompileTask]);

