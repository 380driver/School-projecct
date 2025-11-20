
import { SectionData } from './types';

export const NAV_ITEMS = [
  { label: 'Overview', id: 'abstract' },
  { label: 'Evolution', id: 'explanation' },
  { label: 'Analysis', id: 'analysis' },
  { label: 'Future', id: 'recommendations' },
];

export const CONTENT_SECTIONS: SectionData[] = [
  {
    id: 'abstract',
    title: 'The Digital Landscape',
    subtitle: 'Innovation vs. Risk in US Banking',
    type: 'text',
    content: [
      "Digital innovation is reshaping the U.S. banking sector, forcing institutions to reimagine service delivery while managing cybersecurity, privacy, and regulatory risks.",
      "This case study explores how banks like Capital One leverage technologies such as digital identity, embedded finance, and AI-driven personalization to enhance customer experience and financial inclusion."
    ],
    highlights: [
      "Cybersecurity & Data Privacy",
      "AI-Driven Personalization",
      "Financial Inclusion",
      "Regulatory Compliance"
    ],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'intro',
    title: 'Introduction',
    type: 'text',
    content: [
      "The digitalization of banking services in the United States has significantly reshaped the sector. Adoption of mobile platforms, cloud computing, and AI has improved operational efficiency.",
      "These transformations play a vital role in expanding financial inclusion to underserved populations. Using Capital One as our primary subject, we examine how major US banks balance innovation with resilience."
    ],
    imageUrl: "https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'explanation',
    title: 'The Capital One Evolution',
    subtitle: 'From Information-Based Strategy to Cloud Native',
    type: 'grid',
    content: "Founded in 1994 by Richard Fairbanks and Nigel Morris, Capital One was envisioned not as a bank, but as an information-driven technology firm.",
    highlights: [
      "1994: The Beginning - Pioneering the Information-Based Strategy (IBS) to predict credit risk using data.",
      "2015: Cloud Migration - The first major US bank to announce a full migration to the public cloud with AWS.",
      "2017: Project Eno - Launching an AI assistant for real-time fraud alerts and virtual card numbers.",
      "DevExchange - Opening APIs to developers, fostering an open banking ecosystem."
    ],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'sdg',
    title: 'Sustainable Impact',
    type: 'list',
    content: "Beyond fintech, Capital One supports United Nations Sustainable Development Goals (SDGs).",
    highlights: [
      "SDG 1 & 10: Reducing poverty and inequality through Credit Wise and credit access programs.",
      "SDG 8: Decent work and economic growth by investing in Community Development Financial Institutions (CDFIs).",
      "Housing: Billions committed to affordable housing and workforce development."
    ],
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'analysis',
    title: 'Critical Analysis',
    subtitle: 'Navigating the Trump-Era Policy Shift',
    type: 'text',
    content: [
      "Capital One's innovation relies on robust internal controls. However, the political landscape introduces complexity.",
      "Trump-era regulatory proposals emphasize deregulation and weakening the CFPB. While this accelerates Fintech experimentation, it shifts safety responsibilities onto the banks.",
      "Capital One has responded by reinforcing self-regulation, adopting zero-trust frameworks, and ensuring ethical AI governance regardless of federal guardrail relaxation."
    ],
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'recommendations',
    title: 'The Future Path',
    type: 'list',
    content: "To maintain leadership and trust, Capital One must balance rapid growth with ironclad security.",
    highlights: [
      "Quantum-Resistant Cybersecurity: Investing in next-gen defense.",
      "Open-Banking Security: Securing API integrations.",
      "ESG-Aligned Products: Expanding digital tools for financial health."
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];
