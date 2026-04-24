import type { PolicyItem } from "./types";

export function policyId(index: number): string {
  return `policy-${index}`;
}

export function withSectionIds(policies: PolicyItem[]): (PolicyItem & { sectionId: string })[] {
  return (policies || []).map((p, i) => ({
    ...p,
    sectionId: policyId(i),
  }));
}
