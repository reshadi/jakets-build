
import * as Typescript from "typescript";
import { TscCompileTask, TscOptions } from "./TscCompileTask";

export class ServerTscCompileTask<OptionsType extends TscOptions = TscOptions> extends TscCompileTask<OptionsType> {
  constructor(options?: OptionsType, compileSubDir?: string) {
    super(
      {
        tsc: {
          module: Typescript.ModuleKind.CommonJS,
          target: Typescript.ScriptTarget.ES2015,
        },
        ...options || {} as OptionsType
      },
      compileSubDir || "/server"
    );
  }
}