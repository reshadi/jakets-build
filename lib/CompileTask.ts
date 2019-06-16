import * as Jakets from "jakets/Jakefile";

export class CompileTask<OptionsType> {
  readonly CompileDir = Jakets.MakeRelativeToWorkingDir(Jakets.BuildDir + "/compile");
  constructor(
    public readonly Options: OptionsType,
    compileSubDir?: string
  ) {
    if (compileSubDir) {
      this.CompileDir += compileSubDir;
    }
  }
}

//NOTE: this has to be a file task, otherwise, other file tasks will always trigger
export const PreCompileTask = Jakets.FileTask(
  `${Jakets.BuildDir}/.precompile`,
  [Jakets.MakeRelativeToWorkingDir("Jakefile.ts")],
  async function () {
    return Jakets.ExecAsync(`touch ${this.GetName()}`);
  }
);