export type PolicyItem = {
  id?: string;
  title: string;
  description: string;
  order?: number;
};

export type PolicyWithSectionId = PolicyItem & { sectionId: string };
