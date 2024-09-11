import { dirname } from 'path';
import { ensureDirectoryExists, filePathToCliArg } from '@code-pushup/utils';
import { writeFile } from 'fs/promises';
import { PLUGIN_CONFIG_PATH, RUNNER_OUTPUT_PATH } from './index.js';
async function createRunnerConfig(runnerScriptPath, options) {
    const { path } = options;
    await ensureDirectoryExists(dirname(PLUGIN_CONFIG_PATH));
    await ensureDirectoryExists(dirname(RUNNER_OUTPUT_PATH));
    await writeFile(PLUGIN_CONFIG_PATH, JSON.stringify(path));
    await writeFile(RUNNER_OUTPUT_PATH, JSON.stringify({}));
    return {
        command: `node`,
        args: [filePathToCliArg(runnerScriptPath)],
        outputFile: RUNNER_OUTPUT_PATH,
    };
}
export default createRunnerConfig;
//# sourceMappingURL=config.js.map