"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Typescript = require("typescript");
const TscCompileTask_1 = require("./TscCompileTask");
class ServerTscCompileTask extends TscCompileTask_1.TscCompileTask {
    constructor(options, compileSubDir) {
        super(Object.assign({ tsc: {
                module: Typescript.ModuleKind.CommonJS,
                target: Typescript.ScriptTarget.ES2015,
            } }, options || {}), compileSubDir || "/server");
    }
}
exports.ServerTscCompileTask = ServerTscCompileTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyVHNjQ29tcGlsZVRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZXJ2ZXJUc2NDb21waWxlVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHlDQUF5QztBQUN6QyxxREFBOEQ7QUFFOUQsTUFBYSxvQkFBa0UsU0FBUSwrQkFBMkI7SUFDaEgsWUFBWSxPQUFxQixFQUFFLGFBQXNCO1FBQ3ZELEtBQUssaUJBRUQsR0FBRyxFQUFFO2dCQUNILE1BQU0sRUFBRSxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVE7Z0JBQ3RDLE1BQU0sRUFBRSxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU07YUFDdkMsSUFDRSxPQUFPLElBQUksRUFBaUIsR0FFakMsYUFBYSxJQUFJLFNBQVMsQ0FDM0IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQWJELG9EQWFDIn0=