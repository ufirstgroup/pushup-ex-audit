import { createRunnerConfig } from './lib/index.js';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { auditsMeta } from './lib/meta/audits.js';
export const pluginMeta = {
    slug: 'elixir-deps',
    title: 'Elixir Deps',
    icon: 'elixir',
    description: 'Ufirst Group plugin to run an audit using mix deps.audit task'
};
const runnerScriptPath = join(fileURLToPath(dirname(import.meta.url)), 'bin.js');
export async function create(options) {
    return {
        ...pluginMeta,
        audits: auditsMeta,
        runner: await createRunnerConfig(runnerScriptPath, options),
    };
}
export default create;
//# sourceMappingURL=index.js.map