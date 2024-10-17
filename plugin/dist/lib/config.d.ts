import { RunnerConfig } from '@code-pushup/models';
import { ElixirAuditPluginOptions } from '../types/index.js';
declare function createRunnerConfig(runnerScriptPath: string, options: ElixirAuditPluginOptions): Promise<RunnerConfig>;
export default createRunnerConfig;
