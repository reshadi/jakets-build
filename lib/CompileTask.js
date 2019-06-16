"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Jakets = require("jakets/Jakefile");
class CompileTask {
    constructor(Options, compileSubDir) {
        this.Options = Options;
        this.CompileDir = Jakets.MakeRelativeToWorkingDir(Jakets.BuildDir + "/compile");
        if (compileSubDir) {
            this.CompileDir += compileSubDir;
        }
    }
}
exports.CompileTask = CompileTask;
//NOTE: this has to be a file task, otherwise, other file tasks will always trigger
exports.PreCompileTask = Jakets.FileTask(`${Jakets.BuildDir}/.precompile`, [Jakets.MakeRelativeToWorkingDir("Jakefile.ts")], function () {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return Jakets.ExecAsync(`touch ${this.GetName()}`);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcGlsZVRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb21waWxlVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwwQ0FBMEM7QUFFMUMsTUFBYSxXQUFXO0lBRXRCLFlBQ2tCLE9BQW9CLEVBQ3BDLGFBQXNCO1FBRE4sWUFBTyxHQUFQLE9BQU8sQ0FBYTtRQUY3QixlQUFVLEdBQUcsTUFBTSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDLENBQUM7UUFLbEYsSUFBSSxhQUFhLEVBQUU7WUFDakIsSUFBSSxDQUFDLFVBQVUsSUFBSSxhQUFhLENBQUM7U0FDbEM7SUFDSCxDQUFDO0NBQ0Y7QUFWRCxrQ0FVQztBQUVELG1GQUFtRjtBQUN0RSxRQUFBLGNBQWMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUMzQyxHQUFHLE1BQU0sQ0FBQyxRQUFRLGNBQWMsRUFDaEMsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsYUFBYSxDQUFDLENBQUMsRUFDaEQ7O1FBQ0UsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFNBQVMsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQUEsQ0FDRixDQUFDIn0=