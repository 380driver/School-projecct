
import { SectionData } from './types';

export const NAV_ITEMS = [
  { label: 'Overview', id: 'abstract' },
  { label: 'Evolution', id: 'explanation' },
  { label: 'Analysis', id: 'analysis' },
  { label: 'Future', id: 'recommendations' },
  { label: 'Risk Lab', id: 'risk-assessment' },
  { label: 'Credit Sim', id: 'credit-simulator' },
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
      {
        title: "Cybersecurity & Data Privacy",
        description: "As banks digitize, the attack surface grows. Capital One employs cloud-native security and zero-trust frameworks to protect sensitive customer data against increasingly sophisticated cyber threats."
      },
      {
        title: "AI-Driven Personalization",
        description: "Using real-time behavioral analytics and machine learning, banks can offer tailored financial advice, fraud alerts, and product recommendations, moving away from generic banking services."
      },
      {
        title: "Financial Inclusion",
        description: "Digital transformation reduces the cost of serving customers, allowing banks to reach underserved populations through mobile-first banking and accessible credit building tools."
      },
      {
        title: "Regulatory Compliance",
        description: "Navigating the complex web of financial regulations (like Dodd-Frank) while innovating requires a delicate balance, especially with shifting political landscapes impacting enforcement."
      }
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
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'explanation',
    title: 'The Capital One Evolution',
    subtitle: 'From Information-Based Strategy to Cloud Native',
    type: 'grid',
    content: "Founded in 1994 by Richard Fairbanks and Nigel Morris, Capital One was envisioned not as a bank, but as an information-driven technology firm.",
    highlights: [
      {
        title: "1994: The Beginning",
        description: "Capital One pioneered the Information-Based Strategy (IBS), utilizing data analytics and statistical modeling to tailor credit card offerings rather than relying on traditional demographic categories."
      },
      {
        title: "2015: Cloud Migration",
        description: "Capital One became the first major US bank to announce a full migration to the public cloud (AWS). This bold move enabled faster product innovation, on-demand scalability, and enhanced security capabilities.",
        link: "https://aws.amazon.com/solutions/case-studies/capital-one-all-in-on-aws/"
      },
      {
        title: "2017: Project Eno",
        description: "Launch of Eno, an AI-powered virtual assistant that monitors accounts 24/7, creates virtual card numbers for safe online shopping, and proactively alerts customers about unusual charges.",
        link: "https://www.capitalone.com/digital/tools/eno/"
      },
      {
        title: "DevExchange Ecosystem",
        description: "Capital One opened its APIs to third-party developers via DevExchange, fostering an open banking environment where external apps can securely integrate with bank data to create new value.",
        link: "https://developer.capitalone.com/home"
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 'sdg',
    title: 'Sustainable Impact',
    type: 'list',
    content: "Beyond fintech, Capital One supports United Nations Sustainable Development Goals (SDGs).",
    highlights: [
      {
        title: "SDG 1 & 10: Poverty & Inequality",
        description: "Through tools like CreditWise and various credit access programs, the bank helps low-end consumers build credit history, directly addressing poverty and reducing financial inequality."
      },
      {
        title: "SDG 8: Economic Growth",
        description: "By investing in Community Development Financial Institutions (CDFIs) and small businesses, Capital One stimulates local economies and supports decent work, especially in low-income areas."
      },
      {
        title: "Community Investment",
        description: "The bank has committed billions to affordable housing programs, workforce development initiatives, and financial literacy training across the United States."
      }
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
      {
        title: "Quantum-Resistant Cybersecurity",
        description: "As computing power grows, current encryption methods risk becoming obsolete. Investing in post-quantum cryptography is essential to secure future financial data."
      },
      {
        title: "Open-Banking Security",
        description: "With more third-party integrations, the risk of data leaks increases. Strengthening the security protocols around API endpoints is crucial for maintaining customer trust."
      },
      {
        title: "ESG-Aligned Products",
        description: "Future growth lies in aligning digital products with Environmental, Social, and Governance goals, such as green financing options and tools that track carbon footprints."
      }
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
  }
];
