import { AuditOutput, AuditOutputs } from "@code-pushup/models";
import { auditsMeta } from "./meta/audits.js";
import {
	ensureDirectoryExists,
	executeProcess,
	readJsonFile
} from '@code-pushup/utils';
import { PLUGIN_CONFIG_PATH, RUNNER_OUTPUT_PATH } from "./index.js";
import { dirname } from "path";
import { writeFile } from "fs/promises";
import { MixAuditResultType } from "../types/audit.result.type.js";

export async function executeRunner(): Promise<void>{
	await ensureDirectoryExists(dirname(RUNNER_OUTPUT_PATH));
	const projectPath = await readJsonFile<string>(PLUGIN_CONFIG_PATH);
	
	try{
		let {stdout, stderr} = await executeProcess({
		command: 'mix deps.audit',
		args: ['--format=json'],
		cwd: projectPath,
		ignoreExitCode: false
	})
	const resp = transformMixAuditOutput(stdout as any);
	await writeFile(RUNNER_OUTPUT_PATH, JSON.stringify(resp));
	}catch(err){
		throw new Error(`Elixir audit plugin error: ${err}`)
	}
}

function transformMixAuditOutput(output: MixAuditResultType): AuditOutputs{
		console.log(output)
		let score = calculateScore(output.pass);
		let vulnerabilities = output.vulnerabilities.map((vuln)=> {
			return {
				message: vuln.advisory.title,
				severity: 'error',
				source: {
					file: vuln.advisory.url
				}
			}
		}) 
		const { slug } = auditsMeta[0];
		let auditSlugs = [
			{
				slug,
				score,
				displayValue: score.toString(),
				value: score,
				details: {
					issues: vulnerabilities as any
				}
				// details: output.vulnerabilities
			} satisfies AuditOutput
		]
		return auditSlugs;
}

function calculateScore(pass: boolean){
	if (!pass) return 0;
	return 1
}


export default executeRunner;