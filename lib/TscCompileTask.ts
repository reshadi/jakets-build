import * as Jakets from "jakets/Jakefile";
import { FileTask } from "jakets/lib/task/FileTask";
import { TscTask } from "jakets/lib/TscTask";
import * as Path from "path";
import * as Typescript from "typescript";
import { CompileTask, PreCompileTask } from "./CompileTask";


export interface TscOptions {
  tsc?: Typescript.CompilerOptions
}

export class TscCompileTask<OptionsType extends TscOptions = TscOptions> extends CompileTask<OptionsType & Required<TscOptions>> {

  constructor(options?: OptionsType, compileSubDir?: string) {
    super(
      {
        ...options || {} as OptionsType,
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
          ...options && options.tsc
        },
      }
      , compileSubDir
    );
    this.Options.tsc.outDir = this.CompileDir;
  }

  Compile(
    name: string
    , filenames: string[]
    , dependencies?: Parameters<typeof TscTask>[2]
    , options?: TscOptions
  ): FileTask {
    let tscOptions = {
      ...this.Options.tsc,
      ...options && options.tsc
    };
    return TscTask(
      name
      , filenames
      , (dependencies || []).concat([PreCompileTask, Jakets.DirectoryTask(tscOptions.outDir || this.CompileDir)])
      , tscOptions
    );
  }
}