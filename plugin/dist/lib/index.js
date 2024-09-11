import createRunnerConfig from "./config.js";
import executeRunner from "./runner.js";
import { auditsMeta } from "./meta/audits.js";
import { pluginWorkDir } from "@code-pushup/utils";
import { join } from "path";
export const WORKDIR = pluginWorkDir('elixirAudit');
export const RUNNER_OUTPUT_PATH = join(WORKDIR, 'runner-output.json');
export const PLUGIN_CONFIG_PATH = join(WORKDIR, 'plugin-config.json');
export { createRunnerConfig, executeRunner, auditsMeta };
//# sourceMappingURL=index.js.map