import { auditsMeta } from "./meta/audits.js";
import { ensureDirectoryExists, executeProcess, readJsonFile } from '@code-pushup/utils';
import { PLUGIN_CONFIG_PATH, RUNNER_OUTPUT_PATH } from "./index.js";
import { dirname } from "path";
import { writeFile } from "fs/promises";
export async function executeRunner() {
    await ensureDirectoryExists(dirname(RUNNER_OUTPUT_PATH));
    const projectPath = await readJsonFile(PLUGIN_CONFIG_PATH);
    try {
        let { stdout, stderr } = await executeProcess({
            command: 'mix deps.audit',
            args: ['--format=json'],
            cwd: projectPath,
            ignoreExitCode: false
        });
        const resp = transformMixAuditOutput(stdout);
        await writeFile(RUNNER_OUTPUT_PATH, JSON.stringify(resp));
    }
    catch (err) {
        throw new Error(`Elixir audit plugin error: ${err}`);
    }
}
function transformMixAuditOutput(output) {
    console.log(output);
    let score = calculateScore(output.pass);
    let vulnerabilities = output.vulnerabilities.map((vuln) => {
        return {
            message: vuln.advisory.title,
            severity: 'error',
            source: {
                file: vuln.advisory.url
            }
        };
    });
    const { slug } = auditsMeta[0];
    let auditSlugs = [
        {
            slug,
            score,
            displayValue: score.toString(),
            value: score,
            details: {
                issues: vulnerabilities
            }
        }
    ];
    return auditSlugs;
}
function calculateScore(pass) {
    if (!pass)
        return 0;
    return 1;
}
export default executeRunner;
//# sourceMappingURL=runner.js.map