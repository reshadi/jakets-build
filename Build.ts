import * as Fs from "fs";
import * as Jakets from "jakets/Jakefile";
import * as Path from "path";
import { ClientTscCompileTask } from "./lib/ClientTscCompileTask";
import { PreCompileTask } from "./lib/CompileTask";
import { ServerTscCompileTask } from "./lib/ServerTscCompileTask";


export function CopyFileTask(src: string, dest: string) {
  return Jakets.FileTask(
    dest,
    [src, Jakets.DirectoryTask(Path.dirname(dest))],
    async () => {
      console.log(`cp ${src} ${dest}`);
      Fs.writeFileSync(dest, Fs.readFileSync(src));
    }
  )
}


export const ServerTscTask = new ServerTscCompileTask();

export const ClientTscTask = new ClientTscCompileTask();

/**
 * default --> compile +-> server-----------+--+--> pre-compile
 *                     \-> client +-> debug /  |
 *                                \-> release /
 */
export { PreCompileTask } from "./lib/CompileTask";
export const DebugTask = Jakets.GlobalTask("debug", [PreCompileTask]);
export const ReleaseTask = Jakets.GlobalTask("release", [PreCompileTask]);
export const ClientCompileTask = Jakets.GlobalTask("client", [DebugTask, ReleaseTask]);
export const ServerCompileTask = Jakets.GlobalTask("server", [PreCompileTask]);
export const CompileTask = Jakets.GlobalTask("compile", [ServerCompileTask, ClientCompileTask]);
Jakets.DefaultTask.DependsOn([CompileTask]);

