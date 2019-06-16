"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const Typescript = require("typescript");
const Jakets = require("jakets/Jakefile");
const Rollup = require("jakets-rollup/lib/RollupTask");
const Closure = require("jakets-closure/lib/ClosureTask");
const TscCompileTask_1 = require("./TscCompileTask");
class ClientTscCompileTask extends TscCompileTask_1.TscCompileTask {
    constructor(options, compileSubDir) {
        super(Object.assign({ tsc: {
                module: Typescript.ModuleKind.ES2015,
                target: Typescript.ScriptTarget.ES5,
                // target: Typescript.ScriptTarget.ES2015,
                lib: ["es2015", "dom", "scripthost"].map(l => `lib.${l}.d.ts`),
            }, rollup: {
                Bundle: {
                    // dest: "",
                    format: "iife",
                }
            }, closure: {
            // externs: ["extern_jquery.js", "extern_bootstrap.js"]
            } }, options || {}), compileSubDir || "/client");
        this.DebugDir = this.CompileDir + "/debug";
        this.ReleaseDir = this.CompileDir + "/release";
        // this.Options.tsc.outDir = this.DebugDir;
    }
    Compile(name, filenames, dependencies, options) {
        let debugDir = `${this.DebugDir}/${name}`;
        /**
         * We have to make a copy of all the options in case any of the following functions change them.
         * Also, note that ... is a shallow clone, not a deep clone
         */
        let clientOptions = {
            tsc: Object.assign({}, this.Options.tsc, { outDir: debugDir }, options && options.tsc),
            rollup: Object.assign({}, this.Options.rollup, options && options.rollup),
            closure: Object.assign({}, this.Options.closure, options && options.closure),
        };
        if (clientOptions.tsc.outDir) {
            debugDir = clientOptions.tsc.outDir;
        }
        let filename = `${name}.js`;
        let debugFile = `${debugDir}/${filename}`;
        let compileTask = super.Compile("debug/tsc/" + name, filenames, dependencies, clientOptions);
        let jsFile = new jake.FileList();
        jsFile.include(debugDir + "/**/*.js");
        let packageTask = Rollup.RollupTask("debug/rollup/" + name, debugFile, filenames.map(f => Path.join(debugDir, f.replace(".ts", ".js")))
        // , jsFiles.toArray()
        , [compileTask], clientOptions.rollup);
        if (clientOptions.closure === null) {
            return packageTask;
        }
        let releaseDir = `${this.ReleaseDir}/${name}`;
        let releaseFile = `${releaseDir}/${filename}`;
        let optimizeTask = Closure.ClosureTask("release/closure/" + name, [packageTask.GetName(), Jakets.DirectoryTask(Path.dirname(releaseFile)).GetName()], releaseFile, [debugFile], clientOptions.closure);
        return optimizeTask;
    }
}
exports.ClientTscCompileTask = ClientTscCompileTask;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2xpZW50VHNjQ29tcGlsZVRhc2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDbGllbnRUc2NDb21waWxlVGFzay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDZCQUE2QjtBQUM3Qix5Q0FBeUM7QUFFekMsMENBQTBDO0FBRTFDLHVEQUF1RDtBQUN2RCwwREFBMEQ7QUFFMUQscURBQThEO0FBUzlELE1BQWEsb0JBQTJELFNBQVEsK0JBQTJCO0lBSXpHLFlBQVksT0FBcUIsRUFBRSxhQUFzQjtRQUN2RCxLQUFLLGlCQUVELEdBQUcsRUFBRTtnQkFDSCxNQUFNLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNO2dCQUNwQyxNQUFNLEVBQUUsVUFBVSxDQUFDLFlBQVksQ0FBQyxHQUFHO2dCQUNuQywwQ0FBMEM7Z0JBQzFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQzthQUUvRCxFQUNELE1BQU0sRUFBRTtnQkFDTixNQUFNLEVBQUU7b0JBQ04sWUFBWTtvQkFDWixNQUFNLEVBQUUsTUFBTTtpQkFJZjthQUNGLEVBQ0QsT0FBTyxFQUFFO1lBQ1AsdURBQXVEO2FBQ3hELElBQ0UsT0FBTyxJQUFJLEVBQWlCLEdBRWpDLGFBQWEsSUFBSSxTQUFTLENBQzNCLENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO1FBQzNDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDL0MsMkNBQTJDO0lBQzdDLENBQUM7SUFFRCxPQUFPLENBQ0wsSUFBWSxFQUNWLFNBQW1CLEVBQ25CLFlBQTRDLEVBQzVDLE9BQTBCO1FBRTVCLElBQUksUUFBUSxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUUxQzs7O1dBR0c7UUFDSCxJQUFJLGFBQWEsR0FBRztZQUNsQixHQUFHLG9CQUNFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUNuQixNQUFNLEVBQUUsUUFBUSxJQUNiLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUMxQjtZQUNELE1BQU0sb0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ25CLE9BQU8sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUM3QjtZQUNELE9BQU8sb0JBQ0YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQ3BCLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUM5QjtTQUNGLENBQUM7UUFFRixJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQzVCLFFBQVEsR0FBRyxhQUFhLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztTQUNyQztRQUNELElBQUksUUFBUSxHQUFHLEdBQUcsSUFBSSxLQUFLLENBQUM7UUFDNUIsSUFBSSxTQUFTLEdBQUcsR0FBRyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7UUFFMUMsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FDN0IsWUFBWSxHQUFHLElBQUksRUFDakIsU0FBUyxFQUNULFlBQVksRUFDWixhQUFhLENBQ2hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNqQyxNQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsR0FBQyxVQUFVLENBQUMsQ0FBQztRQUVwQyxJQUFJLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUNqQyxlQUFlLEdBQUcsSUFBSSxFQUNwQixTQUFTLEVBQ1QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDbEUsc0JBQXNCO1VBQ3BCLENBQUMsV0FBVyxDQUFDLEVBQ2IsYUFBYSxDQUFDLE1BQU0sQ0FDdkIsQ0FBQztRQUVGLElBQUksYUFBYSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDbEMsT0FBTyxXQUFXLENBQUM7U0FDcEI7UUFFRCxJQUFJLFVBQVUsR0FBRyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFLENBQUM7UUFDOUMsSUFBSSxXQUFXLEdBQUcsR0FBRyxVQUFVLElBQUksUUFBUSxFQUFFLENBQUM7UUFFOUMsSUFBSSxZQUFZLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FDcEMsa0JBQWtCLEdBQUcsSUFBSSxFQUN2QixDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUNsRixXQUFXLEVBQ1gsQ0FBQyxTQUFTLENBQUMsRUFDWCxhQUFhLENBQUMsT0FBTyxDQUN4QixDQUFDO1FBQ0YsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztDQUNGO0FBeEdELG9EQXdHQyJ9