export type MixAuditResultType = {
	pass:            boolean;
    vulnerabilities: MixVulnerabilityType[];
}

export type MixVulnerabilityType = {
    advisory:   MixAdvisoryType;
    dependency: MixDependencyType;
}

export interface MixAdvisoryType {
    description:               string;
    disclosure_date:           Date;
    first_patched_versions:    string[];
    id:                        string;
    package:                   string;
    severity:                  string;
    title:                     string;
    url:                       string;
    vulnerable_version_ranges: string[];
}

export interface MixDependencyType {
    lockfile: string;
    package:  string;
    version:  string;
}