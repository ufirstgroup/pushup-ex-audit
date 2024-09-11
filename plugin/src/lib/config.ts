import { RunnerConfig } from '@code-pushup/models';
import { dirname } from 'path';
import {
	ensureDirectoryExists, filePathToCliArg
} from '@code-pushup/utils';
import { writeFile } from 'fs/promises';
import { ElixirAuditPluginOptions } from '../types/index.js';
import { PLUGIN_CONFIG_PATH, RUNNER_OUTPUT_PATH } from './index.js';




async function createRunnerConfig(runnerScriptPath: string, options: ElixirAuditPluginOptions): Promise<RunnerConfig> {
	const {path} = options;

	await ensureDirectoryExists(dirname(RUNNER_OUTPUT_PATH));
	await ensureDirectoryExists(dirname(PLUGIN_CONFIG_PATH));
	await writeFile(RUNNER_OUTPUT_PATH, JSON.stringify({}));
  	await writeFile(PLUGIN_CONFIG_PATH, JSON.stringify(path));

	return {
		command: `node`,
		args: [filePathToCliArg(runnerScriptPath)],
		outputFile: RUNNER_OUTPUT_PATH,
	} as RunnerConfig;
  }

export default createRunnerConfig;

