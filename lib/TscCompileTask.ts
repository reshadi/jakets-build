import * as Jakets from "jakets/Jakefile";
import { FileTask } from "jakets/lib/task/FileTask";
import { TscTask } from "jakets/lib/TscTask";
import * as Path from "path";
import * as Typescript from "typescript";
import { CompileTask, PreCompileTask } from "./CompileTask";


export interface TscOptions {
  tsc?: Typescript.CompilerOptions
}

export class TscCompileTask<OptionsType extends TscOptions = TscOptions> extends CompileTask<OptionsType> {

  constructor(options?: OptionsType, compileSubDir?: string) {
    super(
      {
        tsc: {
          // module: Typescript.ModuleKind.ES2015,
          // target: Typescript.ScriptTarget.ES5,
          // outDir: this.CompileDir,

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
        },
        ...options || {} as OptionsType
      }
      , compileSubDir
    );
    this.Options.tsc.outDir = this.CompileDir;
  }

  Compile(
    name: string
    , filenames: string[]
    , dependencies?: Parameters<typeof TscTask>[2]
  ): FileTask {
    return TscTask(
      name
      , filenames
      , (dependencies || []).concat([PreCompileTask, Jakets.DirectoryTask(Path.dirname(this.CompileDir))])
      , this.Options.tsc
    );
  }
}