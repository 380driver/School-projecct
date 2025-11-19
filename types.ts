
export interface SectionData {
  id: string;
  title: string;
  subtitle?: string;
  content: string | string[];
  highlights?: string[];
  imageUrl?: string;
  type: 'hero' | 'text' | 'grid' | 'list';
}

export interface NavItem {
  label: string;
  id: string;
}
