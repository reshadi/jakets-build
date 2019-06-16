"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Jakets = require("jakets/Jakefile");
const TscTask_1 = require("jakets/lib/TscTask");
const Typescript = require("typescript");
const CompileTask_1 = require("./CompileTask");
class TscCompileTask extends CompileTask_1.CompileTask {
    constructor(options, compileSubDir) {
        super(Object.assign({}, options || {}, { tsc: Object.assign({ 
                // module: Typescript.ModuleKind.ES2015,
                // target: Typescript.ScriptTarget.ES5,
                // outDir: this.CompileDir,
                moduleResolution: Typescript.ModuleResolutionKind.NodeJs, allowUnreachableCode: true, importHelpers: true, inlineSourceMap: true, noEmitOnError: true, 
                // noImplicitAny: true,
                useStrict: true, noImplicitReturns: true, pretty: true, rootDir: Jakets.MakeRelativeToWorkingDir(".") }, options && options.tsc) }), compileSubDir);
        this.Options.tsc.outDir = this.CompileDir;
    }
    Compile(name, filenames, dependencies, options) {
        let tscOptions = Object.assign({}, this.Options.tsc, options && options.tsc);
        return TscTask_1.TscTask(name, filenames, (dependencies || []).concat([CompileTask_1.PreCompileTask, Jakets.DirectoryTask(tscOptions.outDir || this.CompileDir)]), tscOptions);
    }
}
exports.TscCompileTask = TscCompileTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHNjQ29tcGlsZVRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUc2NDb21waWxlVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDBDQUEwQztBQUUxQyxnREFBNkM7QUFFN0MseUNBQXlDO0FBQ3pDLCtDQUE0RDtBQU81RCxNQUFhLGNBQTRELFNBQVEseUJBQStDO0lBRTlILFlBQVksT0FBcUIsRUFBRSxhQUFzQjtRQUN2RCxLQUFLLG1CQUVFLE9BQU8sSUFBSSxFQUFpQixJQUMvQixHQUFHO2dCQUNELHdDQUF3QztnQkFDeEMsdUNBQXVDO2dCQUN2QywyQkFBMkI7Z0JBRTNCLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLEVBQ3hELG9CQUFvQixFQUFFLElBQUksRUFDMUIsYUFBYSxFQUFFLElBQUksRUFDbkIsZUFBZSxFQUFFLElBQUksRUFDckIsYUFBYSxFQUFFLElBQUk7Z0JBQ25CLHVCQUF1QjtnQkFDdkIsU0FBUyxFQUFFLElBQUksRUFDZixpQkFBaUIsRUFBRSxJQUFJLEVBQ3ZCLE1BQU0sRUFBRSxJQUFJLEVBQ1osT0FBTyxFQUFFLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsSUFDMUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLE1BRzNCLGFBQWEsQ0FDaEIsQ0FBQztRQUNGLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQzVDLENBQUM7SUFFRCxPQUFPLENBQ0wsSUFBWSxFQUNWLFNBQW1CLEVBQ25CLFlBQTRDLEVBQzVDLE9BQW9CO1FBRXRCLElBQUksVUFBVSxxQkFDVCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFDaEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQzFCLENBQUM7UUFDRixPQUFPLGlCQUFPLENBQ1osSUFBSSxFQUNGLFNBQVMsRUFDVCxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyw0QkFBYyxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUN6RyxVQUFVLENBQ2IsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTlDRCx3Q0E4Q0MifQ==