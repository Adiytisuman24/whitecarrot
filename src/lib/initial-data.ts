import { Company, Job, Recruiter, DSAQuestion } from './types';

export const INITIAL_COMPANIES: Company[] = [
  {
    "id": "c1",
    "slug": "acme-corp",
    "name": "Acme Corp",
    "branding": {
      "primaryColor": "#0f172a",
      "secondaryColor": "#3b82f6",
      "fontFamily": "Inter",
      "logoUrl": "https://placehold.co/200x50/0f172a/ffffff?text=ACME",
      "heroImageUrl": "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
    },
    "sections": [
      {
        "id": "s1",
        "type": "hero",
        "title": "Build the Future",
        "content": "We are pioneering the next generation.",
        "order": 0
      },
      {
        "id": "s2",
        "type": "about",
        "title": "About Us",
        "content": "We are Acme.",
        "order": 1
      }
    ]
  },
  {
    "id": "c2",
    "slug": "globex",
    "name": "Globex Corp",
    "branding": {
      "primaryColor": "#dc2626",
      "secondaryColor": "#fca5a5",
      "fontFamily": "Roboto",
      "logoUrl": "https://placehold.co/200x50/dc2626/ffffff?text=Globex",
      "heroImageUrl": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80"
    },
    "sections": [
      {
        "id": "s1",
        "type": "hero",
        "title": "We Move the World",
        "content": "Globex is everywhere.",
        "order": 0
      }
    ]
  },
  {
    "id": "c3",
    "slug": "soylent-corp",
    "name": "Soylent Corp",
    "branding": {
      "primaryColor": "#059669",
      "secondaryColor": "#6ee7b7",
      "fontFamily": "Inter",
      "logoUrl": "https://placehold.co/200x50/059669/ffffff?text=Soylent",
      "heroImageUrl": "https://images.unsplash.com/photo-1518544806308-32f396f2a945?auto=format&fit=crop&q=80"
    },
    "sections": [
      {
        "id": "s1",
        "type": "hero",
        "title": "People First",
        "content": "Making food for the future.",
        "order": 0
      }
    ]
  },
  {
    "id": "c4",
    "slug": "umbrella-corp",
    "name": "Umbrella Corp",
    "branding": {
      "primaryColor": "#7f1d1d",
      "secondaryColor": "#f87171",
      "fontFamily": "Roboto",
      "logoUrl": "https://placehold.co/200x50/7f1d1d/ffffff?text=Umbrella",
      "heroImageUrl": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80"
    },
    "sections": [
      {
        "id": "s1",
        "type": "hero",
        "title": "Our Business is Life",
        "content": "Leading pharmaceutical research.",
        "order": 0
      }
    ]
  }
];

export const INITIAL_JOBS: Job[] = [
  {
    "id": "job-0",
    "companyId": "c4",
    "title": "Full Stack Engineer",
    "location": "Berlin, Germany",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Full Stack Engineer to join our Product team.",
    "detailedJobDescription": "We are seeking an exceptional Full Stack Engineer to join our growing Product team. In this role, you will be responsible for designing, developing, and maintaining scalable web applications that serve millions of users worldwide.\n\nYou'll work closely with product managers, designers, and other engineers to build innovative features and improve our platform's performance and reliability. This is a unique opportunity to make a significant impact on our product and help shape the future of our technology stack.",
    "companyDescription": "Umbrella Corp is a leading pharmaceutical and biotechnology company dedicated to advancing healthcare through innovative research and development. With over 20 years of experience, we've been at the forefront of medical breakthroughs, improving lives globally.\n\nOur team of world-class scientists, engineers, and healthcare professionals work collaboratively in a culture that values innovation, integrity, and excellence. We offer a dynamic work environment where your contributions directly impact millions of lives.",
    "responsibilities": [
      "Design and develop scalable full-stack web applications using modern technologies",
      "Collaborate with cross-functional teams to define, design, and ship new features",
      "Write clean, maintainable, and well-documented code",
      "Optimize applications for maximum speed and scalability",
      "Participate in code reviews and mentor junior developers",
      "Troubleshoot and debug applications to ensure optimal performance"
    ],
    "requirements": [
      "5+ years of experience in full-stack development",
      "Strong proficiency in React, TypeScript, and Node.js",
      "Experience with RESTful APIs and microservices architecture",
      "Solid understanding of database design and optimization (SQL and NoSQL)",
      "Bachelor's degree in Computer Science or equivalent experience",
      "Excellent problem-solving skills and attention to detail",
      "Strong communication and teamwork abilities"
    ],
    "benefits": [
      "Competitive salary with performance bonuses",
      "Comprehensive health insurance (medical, dental, vision)",
      "Flexible remote work options",
      "Annual learning and development budget of $2000",
      "Stock options and equity participation",
      "30 days paid vacation plus public holidays",
      "Modern equipment and tools of your choice",
      "Regular team events and company retreats"
    ],
    "salaryRange": "€80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.242Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design"
    ],
    "slug": "full-stack-engineer-berlin"
  },
  {
    "id": "job-1",
    "companyId": "c4",
    "title": "Business Analyst",
    "location": "Riyadh, Saudi Arabia",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Business Analyst to join our Customer Success team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Problem Solving"
    ],
    "slug": "business-analyst-riyadh"
  },
  {
    "id": "job-2",
    "companyId": "c2",
    "title": "Software Engineer",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Sales",
    "experienceLevel": "Senior",
    "description": "We are looking for a Software Engineer to join our Sales team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "software-engineer-berlin"
  },
  {
    "id": "job-3",
    "companyId": "c1",
    "title": "Marketing Manager",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Marketing Manager to join our Engineering team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile",
      "Problem Solving"
    ],
    "slug": "marketing-manager-boston"
  },
  {
    "id": "job-4",
    "companyId": "c4",
    "title": "UX Researcher",
    "location": "Boston, United States",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Senior",
    "description": "We are looking for a UX Researcher to join our Engineering team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "ux-researcher-boston"
  },
  {
    "id": "job-5",
    "companyId": "c3",
    "title": "AI Product Manager",
    "location": "Athens, Greece",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Operations",
    "experienceLevel": "Junior",
    "description": "We are looking for a AI Product Manager to join our Operations team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Leadership",
      "Project Management",
      "Problem Solving"
    ],
    "slug": "ai-product-manager-athens"
  },
  {
    "id": "job-6",
    "companyId": "c1",
    "title": "Sales Development Representative",
    "location": "Berlin, Germany",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Marketing",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Sales Development Representative to join our Marketing team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation",
      "Agile"
    ],
    "slug": "sales-development-representative-berlin"
  },
  {
    "id": "job-7",
    "companyId": "c3",
    "title": "Frontend Engineer",
    "location": "Athens, Greece",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a Frontend Engineer to join our Engineering team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Agile"
    ],
    "slug": "frontend-engineer-athens"
  },
  {
    "id": "job-8",
    "companyId": "c3",
    "title": "Sales Development Representative",
    "location": "Cairo, Egypt",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Sales",
    "experienceLevel": "Senior",
    "description": "We are looking for a Sales Development Representative to join our Sales team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation"
    ],
    "slug": "sales-development-representative-cairo"
  },
  {
    "id": "job-9",
    "companyId": "c1",
    "title": "Data Analyst",
    "location": "Dubai, United Arab Emirates",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Data Analyst to join our Customer Success team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel"
    ],
    "slug": "data-analyst-dubai"
  },
  {
    "id": "job-10",
    "companyId": "c2",
    "title": "Solutions Consultant",
    "location": "Hyderabad, India",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a Solutions Consultant to join our Engineering team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Agile"
    ],
    "slug": "solutions-consultant-hyderabad"
  },
  {
    "id": "job-11",
    "companyId": "c2",
    "title": "Mobile Developer (Flutter)",
    "location": "Athens, Greece",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Operations team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "mobile-developer-(flutter)-athens"
  },
  {
    "id": "job-12",
    "companyId": "c1",
    "title": "Operations Associate",
    "location": "Bangalore, India",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Junior",
    "description": "We are looking for a Operations Associate to join our Analytics team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "operations-associate-bangalore"
  },
  {
    "id": "job-13",
    "companyId": "c1",
    "title": "QA Engineer",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Marketing",
    "experienceLevel": "Junior",
    "description": "We are looking for a QA Engineer to join our Marketing team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "qa-engineer-berlin"
  },
  {
    "id": "job-14",
    "companyId": "c4",
    "title": "UX Researcher",
    "location": "Berlin, Germany",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "R&D",
    "experienceLevel": "Senior",
    "description": "We are looking for a UX Researcher to join our R&D team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "ux-researcher-berlin"
  },
  {
    "id": "job-15",
    "companyId": "c3",
    "title": "Product Designer",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Operations",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Product Designer to join our Operations team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Figma",
      "UI/UX",
      "Prototyping",
      "Problem Solving"
    ],
    "slug": "product-designer-boston"
  },
  {
    "id": "job-16",
    "companyId": "c3",
    "title": "Full Stack Engineer",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Full Stack Engineer to join our Engineering team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design"
    ],
    "slug": "full-stack-engineer-dubai"
  },
  {
    "id": "job-17",
    "companyId": "c1",
    "title": "Product Designer",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Product Designer to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Figma",
      "UI/UX",
      "Prototyping",
      "Agile"
    ],
    "slug": "product-designer-istanbul"
  },
  {
    "id": "job-18",
    "companyId": "c2",
    "title": "Marketing Manager",
    "location": "Dubai, United Arab Emirates",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Marketing Manager to join our Engineering team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Problem Solving"
    ],
    "slug": "marketing-manager-dubai"
  },
  {
    "id": "job-19",
    "companyId": "c4",
    "title": "AI Product Manager",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Junior",
    "description": "We are looking for a AI Product Manager to join our Analytics team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Leadership",
      "Project Management"
    ],
    "slug": "ai-product-manager-cairo"
  },
  {
    "id": "job-20",
    "companyId": "c4",
    "title": "Marketing Manager",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Junior",
    "description": "We are looking for a Marketing Manager to join our Analytics team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile"
    ],
    "slug": "marketing-manager-boston"
  },
  {
    "id": "job-21",
    "companyId": "c4",
    "title": "Backend Developer",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Backend Developer to join our Product team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.253Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design",
      "Agile"
    ],
    "slug": "backend-developer-bangalore"
  },
  {
    "id": "job-22",
    "companyId": "c4",
    "title": "Technical Writer",
    "location": "Berlin, Germany",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Sales",
    "experienceLevel": "Junior",
    "description": "We are looking for a Technical Writer to join our Sales team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing"
    ],
    "slug": "technical-writer-berlin"
  },
  {
    "id": "job-23",
    "companyId": "c1",
    "title": "DevOps Engineer",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a DevOps Engineer to join our Customer Success team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "devops-engineer-dubai"
  },
  {
    "id": "job-24",
    "companyId": "c2",
    "title": "Customer Success Executive",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a Customer Success Executive to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "customer-success-executive-istanbul"
  },
  {
    "id": "job-25",
    "companyId": "c2",
    "title": "Marketing Manager",
    "location": "Cairo, Egypt",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Marketing Manager to join our Product team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile",
      "Problem Solving"
    ],
    "slug": "marketing-manager-cairo"
  },
  {
    "id": "job-26",
    "companyId": "c4",
    "title": "Sales Development Representative",
    "location": "Hyderabad, India",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Marketing",
    "experienceLevel": "Senior",
    "description": "We are looking for a Sales Development Representative to join our Marketing team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation",
      "Agile",
      "Problem Solving"
    ],
    "slug": "sales-development-representative-hyderabad"
  },
  {
    "id": "job-27",
    "companyId": "c1",
    "title": "Product Designer",
    "location": "Boston, United States",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Product Designer to join our Analytics team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Figma",
      "UI/UX",
      "Prototyping"
    ],
    "slug": "product-designer-boston"
  },
  {
    "id": "job-28",
    "companyId": "c4",
    "title": "Sales Development Representative",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Sales Development Representative to join our Operations team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation"
    ],
    "slug": "sales-development-representative-berlin"
  },
  {
    "id": "job-29",
    "companyId": "c1",
    "title": "Technical Writer",
    "location": "Athens, Greece",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Technical Writer to join our Product team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing",
      "Agile"
    ],
    "slug": "technical-writer-athens"
  },
  {
    "id": "job-30",
    "companyId": "c3",
    "title": "Backend Developer",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Backend Developer to join our IT Support team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design"
    ],
    "slug": "backend-developer-riyadh"
  },
  {
    "id": "job-31",
    "companyId": "c1",
    "title": "Operations Associate",
    "location": "Cairo, Egypt",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Sales",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Operations Associate to join our Sales team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "operations-associate-cairo"
  },
  {
    "id": "job-32",
    "companyId": "c1",
    "title": "Full Stack Engineer",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Full Stack Engineer to join our R&D team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design",
      "Agile",
      "Problem Solving"
    ],
    "slug": "full-stack-engineer-dubai"
  },
  {
    "id": "job-33",
    "companyId": "c3",
    "title": "UX Researcher",
    "location": "Hyderabad, India",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Senior",
    "description": "We are looking for a UX Researcher to join our R&D team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "ux-researcher-hyderabad"
  },
  {
    "id": "job-34",
    "companyId": "c3",
    "title": "Technical Writer",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Technical Writer to join our Product team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing"
    ],
    "slug": "technical-writer-dubai"
  },
  {
    "id": "job-35",
    "companyId": "c4",
    "title": "Software Engineer",
    "location": "Cairo, Egypt",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Software Engineer to join our Product team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "software-engineer-cairo"
  },
  {
    "id": "job-36",
    "companyId": "c1",
    "title": "QA Engineer",
    "location": "Riyadh, Saudi Arabia",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Senior",
    "description": "We are looking for a QA Engineer to join our R&D team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "qa-engineer-riyadh"
  },
  {
    "id": "job-37",
    "companyId": "c3",
    "title": "Full Stack Engineer",
    "location": "Cairo, Egypt",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Full Stack Engineer to join our Customer Success team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design"
    ],
    "slug": "full-stack-engineer-cairo"
  },
  {
    "id": "job-38",
    "companyId": "c1",
    "title": "Sales Development Representative",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "IT Support",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Sales Development Representative to join our IT Support team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation"
    ],
    "slug": "sales-development-representative-riyadh"
  },
  {
    "id": "job-39",
    "companyId": "c4",
    "title": "Full Stack Engineer",
    "location": "Cairo, Egypt",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "IT Support",
    "experienceLevel": "Senior",
    "description": "We are looking for a Full Stack Engineer to join our IT Support team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design",
      "Agile"
    ],
    "slug": "full-stack-engineer-cairo"
  },
  {
    "id": "job-40",
    "companyId": "c3",
    "title": "Business Analyst",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Marketing",
    "experienceLevel": "Senior",
    "description": "We are looking for a Business Analyst to join our Marketing team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Agile"
    ],
    "slug": "business-analyst-boston"
  },
  {
    "id": "job-41",
    "companyId": "c3",
    "title": "Product Designer",
    "location": "Boston, United States",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a Product Designer to join our Engineering team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Figma",
      "UI/UX",
      "Prototyping",
      "Agile",
      "Problem Solving"
    ],
    "slug": "product-designer-boston"
  },
  {
    "id": "job-42",
    "companyId": "c1",
    "title": "Backend Developer",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a Backend Developer to join our Customer Success team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design",
      "Agile",
      "Problem Solving"
    ],
    "slug": "backend-developer-cairo"
  },
  {
    "id": "job-43",
    "companyId": "c3",
    "title": "Marketing Manager",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Marketing Manager to join our Analytics team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile",
      "Problem Solving"
    ],
    "slug": "marketing-manager-riyadh"
  },
  {
    "id": "job-44",
    "companyId": "c4",
    "title": "UX Researcher",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Sales",
    "experienceLevel": "Junior",
    "description": "We are looking for a UX Researcher to join our Sales team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "ux-researcher-cairo"
  },
  {
    "id": "job-45",
    "companyId": "c2",
    "title": "Sales Development Representative",
    "location": "London, England, United Kingdom",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Sales Development Representative to join our Operations team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation"
    ],
    "slug": "sales-development-representative-london"
  },
  {
    "id": "job-46",
    "companyId": "c4",
    "title": "Customer Success Executive",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "R&D",
    "experienceLevel": "Senior",
    "description": "We are looking for a Customer Success Executive to join our R&D team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "customer-success-executive-riyadh"
  },
  {
    "id": "job-47",
    "companyId": "c2",
    "title": "Business Analyst",
    "location": "London, England, United Kingdom",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Business Analyst to join our Analytics team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Agile",
      "Problem Solving"
    ],
    "slug": "business-analyst-london"
  },
  {
    "id": "job-48",
    "companyId": "c4",
    "title": "Product Designer",
    "location": "Hyderabad, India",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Junior",
    "description": "We are looking for a Product Designer to join our R&D team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Figma",
      "UI/UX",
      "Prototyping",
      "Agile"
    ],
    "slug": "product-designer-hyderabad"
  },
  {
    "id": "job-49",
    "companyId": "c2",
    "title": "UX Researcher",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Design",
    "experienceLevel": "Junior",
    "description": "We are looking for a UX Researcher to join our Design team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "ux-researcher-bangalore"
  },
  {
    "id": "job-50",
    "companyId": "c3",
    "title": "Solutions Consultant",
    "location": "Bangalore, India",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Solutions Consultant to join our IT Support team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "solutions-consultant-bangalore"
  },
  {
    "id": "job-51",
    "companyId": "c2",
    "title": "Business Analyst",
    "location": "Athens, Greece",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Design",
    "experienceLevel": "Junior",
    "description": "We are looking for a Business Analyst to join our Design team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel"
    ],
    "slug": "business-analyst-athens"
  },
  {
    "id": "job-52",
    "companyId": "c1",
    "title": "Mobile Developer (Flutter)",
    "location": "Athens, Greece",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Design",
    "experienceLevel": "Junior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Design team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "mobile-developer-(flutter)-athens"
  },
  {
    "id": "job-53",
    "companyId": "c3",
    "title": "Marketing Manager",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "IT Support",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Marketing Manager to join our IT Support team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile"
    ],
    "slug": "marketing-manager-bangalore"
  },
  {
    "id": "job-54",
    "companyId": "c2",
    "title": "UX Researcher",
    "location": "Boston, United States",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "R&D",
    "experienceLevel": "Senior",
    "description": "We are looking for a UX Researcher to join our R&D team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "ux-researcher-boston"
  },
  {
    "id": "job-55",
    "companyId": "c4",
    "title": "Mobile Developer (Flutter)",
    "location": "Istanbul, Turkey",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Mobile Developer (Flutter) to join our R&D team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "mobile-developer-(flutter)-istanbul"
  },
  {
    "id": "job-56",
    "companyId": "c1",
    "title": "Frontend Engineer",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Engineering",
    "experienceLevel": "Senior",
    "description": "We are looking for a Frontend Engineer to join our Engineering team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS"
    ],
    "slug": "frontend-engineer-istanbul"
  },
  {
    "id": "job-57",
    "companyId": "c2",
    "title": "Operations Associate",
    "location": "Riyadh, Saudi Arabia",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Operations Associate to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "operations-associate-riyadh"
  },
  {
    "id": "job-58",
    "companyId": "c3",
    "title": "Software Engineer",
    "location": "Athens, Greece",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Sales",
    "experienceLevel": "Junior",
    "description": "We are looking for a Software Engineer to join our Sales team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "software-engineer-athens"
  },
  {
    "id": "job-59",
    "companyId": "c3",
    "title": "Frontend Engineer",
    "location": "Cairo, Egypt",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Sales",
    "experienceLevel": "Junior",
    "description": "We are looking for a Frontend Engineer to join our Sales team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Agile"
    ],
    "slug": "frontend-engineer-cairo"
  },
  {
    "id": "job-60",
    "companyId": "c2",
    "title": "Cloud Architect",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Cloud Architect to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "cloud-architect-dubai"
  },
  {
    "id": "job-61",
    "companyId": "c1",
    "title": "Business Analyst",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Business Analyst to join our IT Support team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Agile",
      "Problem Solving"
    ],
    "slug": "business-analyst-riyadh"
  },
  {
    "id": "job-62",
    "companyId": "c4",
    "title": "Full Stack Engineer",
    "location": "Hyderabad, India",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Marketing",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Full Stack Engineer to join our Marketing team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design",
      "Problem Solving"
    ],
    "slug": "full-stack-engineer-hyderabad"
  },
  {
    "id": "job-63",
    "companyId": "c3",
    "title": "Frontend Engineer",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Customer Success",
    "experienceLevel": "Senior",
    "description": "We are looking for a Frontend Engineer to join our Customer Success team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS"
    ],
    "slug": "frontend-engineer-riyadh"
  },
  {
    "id": "job-64",
    "companyId": "c2",
    "title": "Frontend Engineer",
    "location": "Istanbul, Turkey",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Frontend Engineer to join our IT Support team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Agile"
    ],
    "slug": "frontend-engineer-istanbul"
  },
  {
    "id": "job-65",
    "companyId": "c3",
    "title": "Customer Success Executive",
    "location": "Berlin, Germany",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Design",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Customer Success Executive to join our Design team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "customer-success-executive-berlin"
  },
  {
    "id": "job-66",
    "companyId": "c1",
    "title": "Technical Writer",
    "location": "Riyadh, Saudi Arabia",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Junior",
    "description": "We are looking for a Technical Writer to join our Analytics team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing"
    ],
    "slug": "technical-writer-riyadh"
  },
  {
    "id": "job-67",
    "companyId": "c1",
    "title": "Operations Associate",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Operations Associate to join our Product team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "operations-associate-dubai"
  },
  {
    "id": "job-68",
    "companyId": "c1",
    "title": "Software Engineer",
    "location": "London, England, United Kingdom",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "IT Support",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Software Engineer to join our IT Support team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "software-engineer-london"
  },
  {
    "id": "job-69",
    "companyId": "c4",
    "title": "QA Engineer",
    "location": "London, England, United Kingdom",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a QA Engineer to join our IT Support team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "qa-engineer-london"
  },
  {
    "id": "job-70",
    "companyId": "c3",
    "title": "Solutions Consultant",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Solutions Consultant to join our Product team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "solutions-consultant-dubai"
  },
  {
    "id": "job-71",
    "companyId": "c1",
    "title": "Marketing Manager",
    "location": "Hyderabad, India",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Marketing Manager to join our Product team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile",
      "Problem Solving"
    ],
    "slug": "marketing-manager-hyderabad"
  },
  {
    "id": "job-72",
    "companyId": "c3",
    "title": "Customer Success Executive",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Customer Success Executive to join our Engineering team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "customer-success-executive-cairo"
  },
  {
    "id": "job-73",
    "companyId": "c2",
    "title": "Full Stack Engineer",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Full Stack Engineer to join our IT Support team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design",
      "Agile",
      "Problem Solving"
    ],
    "slug": "full-stack-engineer-istanbul"
  },
  {
    "id": "job-74",
    "companyId": "c4",
    "title": "Customer Success Executive",
    "location": "Istanbul, Turkey",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a Customer Success Executive to join our Engineering team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "customer-success-executive-istanbul"
  },
  {
    "id": "job-75",
    "companyId": "c2",
    "title": "Backend Developer",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Operations",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Backend Developer to join our Operations team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design"
    ],
    "slug": "backend-developer-boston"
  },
  {
    "id": "job-76",
    "companyId": "c2",
    "title": "AI Product Manager",
    "location": "London, England, United Kingdom",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a AI Product Manager to join our Customer Success team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "Agile"
    ],
    "slug": "ai-product-manager-london"
  },
  {
    "id": "job-77",
    "companyId": "c3",
    "title": "Operations Associate",
    "location": "Cairo, Egypt",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "IT Support",
    "experienceLevel": "Senior",
    "description": "We are looking for a Operations Associate to join our IT Support team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "operations-associate-cairo"
  },
  {
    "id": "job-78",
    "companyId": "c4",
    "title": "Marketing Manager",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Design",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Marketing Manager to join our Design team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile",
      "Problem Solving"
    ],
    "slug": "marketing-manager-istanbul"
  },
  {
    "id": "job-79",
    "companyId": "c3",
    "title": "UX Researcher",
    "location": "Bangalore, India",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a UX Researcher to join our Product team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "ux-researcher-bangalore"
  },
  {
    "id": "job-80",
    "companyId": "c3",
    "title": "QA Engineer",
    "location": "Hyderabad, India",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Sales",
    "experienceLevel": "Senior",
    "description": "We are looking for a QA Engineer to join our Sales team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "qa-engineer-hyderabad"
  },
  {
    "id": "job-81",
    "companyId": "c4",
    "title": "Technical Writer",
    "location": "Boston, United States",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Technical Writer to join our Operations team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing",
      "Agile",
      "Problem Solving"
    ],
    "slug": "technical-writer-boston"
  },
  {
    "id": "job-82",
    "companyId": "c4",
    "title": "Operations Associate",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "R&D",
    "experienceLevel": "Junior",
    "description": "We are looking for a Operations Associate to join our R&D team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "operations-associate-boston"
  },
  {
    "id": "job-83",
    "companyId": "c4",
    "title": "QA Engineer",
    "location": "Hyderabad, India",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a QA Engineer to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "qa-engineer-hyderabad"
  },
  {
    "id": "job-84",
    "companyId": "c2",
    "title": "Cloud Architect",
    "location": "Hyderabad, India",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Marketing",
    "experienceLevel": "Junior",
    "description": "We are looking for a Cloud Architect to join our Marketing team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "cloud-architect-hyderabad"
  },
  {
    "id": "job-85",
    "companyId": "c3",
    "title": "Full Stack Engineer",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Junior",
    "description": "We are looking for a Full Stack Engineer to join our Analytics team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design",
      "Agile"
    ],
    "slug": "full-stack-engineer-cairo"
  },
  {
    "id": "job-86",
    "companyId": "c3",
    "title": "Customer Success Executive",
    "location": "Boston, United States",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Junior",
    "description": "We are looking for a Customer Success Executive to join our Analytics team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "customer-success-executive-boston"
  },
  {
    "id": "job-87",
    "companyId": "c2",
    "title": "Operations Associate",
    "location": "Bangalore, India",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "R&D",
    "experienceLevel": "Junior",
    "description": "We are looking for a Operations Associate to join our R&D team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "operations-associate-bangalore"
  },
  {
    "id": "job-88",
    "companyId": "c3",
    "title": "Full Stack Engineer",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Senior",
    "description": "We are looking for a Full Stack Engineer to join our Analytics team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design",
      "Agile",
      "Problem Solving"
    ],
    "slug": "full-stack-engineer-berlin"
  },
  {
    "id": "job-89",
    "companyId": "c3",
    "title": "QA Engineer",
    "location": "Hyderabad, India",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a QA Engineer to join our Customer Success team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "qa-engineer-hyderabad"
  },
  {
    "id": "job-90",
    "companyId": "c3",
    "title": "Mobile Developer (Flutter)",
    "location": "Dubai, United Arab Emirates",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Product team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "mobile-developer-(flutter)-dubai"
  },
  {
    "id": "job-91",
    "companyId": "c2",
    "title": "Data Analyst",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Product",
    "experienceLevel": "Junior",
    "description": "We are looking for a Data Analyst to join our Product team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Problem Solving"
    ],
    "slug": "data-analyst-bangalore"
  },
  {
    "id": "job-92",
    "companyId": "c4",
    "title": "Full Stack Engineer",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Full Stack Engineer to join our Engineering team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Node.js",
      "API Design"
    ],
    "slug": "full-stack-engineer-boston"
  },
  {
    "id": "job-93",
    "companyId": "c3",
    "title": "Business Analyst",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Business Analyst to join our Operations team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Agile",
      "Problem Solving"
    ],
    "slug": "business-analyst-dubai"
  },
  {
    "id": "job-94",
    "companyId": "c2",
    "title": "UX Researcher",
    "location": "Bangalore, India",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a UX Researcher to join our Analytics team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "ux-researcher-bangalore"
  },
  {
    "id": "job-95",
    "companyId": "c4",
    "title": "Frontend Engineer",
    "location": "London, England, United Kingdom",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Frontend Engineer to join our Product team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Agile",
      "Problem Solving"
    ],
    "slug": "frontend-engineer-london"
  },
  {
    "id": "job-96",
    "companyId": "c3",
    "title": "Cloud Architect",
    "location": "Cairo, Egypt",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Cloud Architect to join our Operations team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "cloud-architect-cairo"
  },
  {
    "id": "job-97",
    "companyId": "c3",
    "title": "QA Engineer",
    "location": "Berlin, Germany",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a QA Engineer to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "qa-engineer-berlin"
  },
  {
    "id": "job-98",
    "companyId": "c3",
    "title": "Machine Learning Engineer",
    "location": "Boston, United States",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Sales",
    "experienceLevel": "Senior",
    "description": "We are looking for a Machine Learning Engineer to join our Sales team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "machine-learning-engineer-boston"
  },
  {
    "id": "job-99",
    "companyId": "c4",
    "title": "Customer Success Executive",
    "location": "Bangalore, India",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Customer Success Executive to join our Analytics team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "customer-success-executive-bangalore"
  },
  {
    "id": "job-100",
    "companyId": "c1",
    "title": "DevOps Engineer",
    "location": "Berlin, Germany",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Sales",
    "experienceLevel": "Junior",
    "description": "We are looking for a DevOps Engineer to join our Sales team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "devops-engineer-berlin"
  },
  {
    "id": "job-101",
    "companyId": "c1",
    "title": "Customer Success Executive",
    "location": "Cairo, Egypt",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a Customer Success Executive to join our Customer Success team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "customer-success-executive-cairo"
  },
  {
    "id": "job-102",
    "companyId": "c4",
    "title": "Business Analyst",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Business Analyst to join our Customer Success team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Problem Solving"
    ],
    "slug": "business-analyst-istanbul"
  },
  {
    "id": "job-103",
    "companyId": "c1",
    "title": "Marketing Manager",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Marketing",
    "experienceLevel": "Senior",
    "description": "We are looking for a Marketing Manager to join our Marketing team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media",
      "Agile",
      "Problem Solving"
    ],
    "slug": "marketing-manager-dubai"
  },
  {
    "id": "job-104",
    "companyId": "c1",
    "title": "Cloud Architect",
    "location": "Hyderabad, India",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Cloud Architect to join our Operations team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "cloud-architect-hyderabad"
  },
  {
    "id": "job-105",
    "companyId": "c1",
    "title": "Customer Success Executive",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a Customer Success Executive to join our Engineering team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "customer-success-executive-bangalore"
  },
  {
    "id": "job-106",
    "companyId": "c2",
    "title": "Mobile Developer (Flutter)",
    "location": "Berlin, Germany",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Operations",
    "experienceLevel": "Junior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Operations team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "mobile-developer-(flutter)-berlin"
  },
  {
    "id": "job-107",
    "companyId": "c4",
    "title": "Business Analyst",
    "location": "Bangalore, India",
    "type": "Contract",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Senior",
    "description": "We are looking for a Business Analyst to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Problem Solving"
    ],
    "slug": "business-analyst-bangalore"
  },
  {
    "id": "job-108",
    "companyId": "c3",
    "title": "UX Researcher",
    "location": "Dubai, United Arab Emirates",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a UX Researcher to join our R&D team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "ux-researcher-dubai"
  },
  {
    "id": "job-109",
    "companyId": "c2",
    "title": "DevOps Engineer",
    "location": "London, England, United Kingdom",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a DevOps Engineer to join our R&D team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "devops-engineer-london"
  },
  {
    "id": "job-110",
    "companyId": "c4",
    "title": "Mobile Developer (Flutter)",
    "location": "Riyadh, Saudi Arabia",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Marketing",
    "experienceLevel": "Junior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Marketing team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile"
    ],
    "slug": "mobile-developer-(flutter)-riyadh"
  },
  {
    "id": "job-111",
    "companyId": "c2",
    "title": "UX Researcher",
    "location": "Athens, Greece",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a UX Researcher to join our Engineering team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "ux-researcher-athens"
  },
  {
    "id": "job-112",
    "companyId": "c4",
    "title": "Frontend Engineer",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Frontend Engineer to join our R&D team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Agile"
    ],
    "slug": "frontend-engineer-istanbul"
  },
  {
    "id": "job-113",
    "companyId": "c2",
    "title": "AI Product Manager",
    "location": "Boston, United States",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a AI Product Manager to join our Engineering team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "Agile",
      "Problem Solving"
    ],
    "slug": "ai-product-manager-boston"
  },
  {
    "id": "job-114",
    "companyId": "c1",
    "title": "Technical Writer",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Technical Writer to join our Analytics team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing"
    ],
    "slug": "technical-writer-dubai"
  },
  {
    "id": "job-115",
    "companyId": "c3",
    "title": "Machine Learning Engineer",
    "location": "Istanbul, Turkey",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a Machine Learning Engineer to join our Operations team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "machine-learning-engineer-istanbul"
  },
  {
    "id": "job-116",
    "companyId": "c2",
    "title": "AI Product Manager",
    "location": "Boston, United States",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a AI Product Manager to join our R&D team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "Agile"
    ],
    "slug": "ai-product-manager-boston"
  },
  {
    "id": "job-117",
    "companyId": "c1",
    "title": "Mobile Developer (Flutter)",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Design",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Design team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "mobile-developer-(flutter)-berlin"
  },
  {
    "id": "job-118",
    "companyId": "c1",
    "title": "Software Engineer",
    "location": "Bangalore, India",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Marketing",
    "experienceLevel": "Junior",
    "description": "We are looking for a Software Engineer to join our Marketing team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "software-engineer-bangalore"
  },
  {
    "id": "job-119",
    "companyId": "c1",
    "title": "Sales Development Representative",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Senior",
    "description": "We are looking for a Sales Development Representative to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "CRM",
      "Communication",
      "Negotiation",
      "Agile"
    ],
    "slug": "sales-development-representative-bangalore"
  },
  {
    "id": "job-120",
    "companyId": "c3",
    "title": "Backend Developer",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Marketing",
    "experienceLevel": "Senior",
    "description": "We are looking for a Backend Developer to join our Marketing team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design",
      "Agile",
      "Problem Solving"
    ],
    "slug": "backend-developer-dubai"
  },
  {
    "id": "job-121",
    "companyId": "c2",
    "title": "Mobile Developer (Flutter)",
    "location": "Berlin, Germany",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Customer Success team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "mobile-developer-(flutter)-berlin"
  },
  {
    "id": "job-122",
    "companyId": "c4",
    "title": "Machine Learning Engineer",
    "location": "Istanbul, Turkey",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "IT Support",
    "experienceLevel": "Senior",
    "description": "We are looking for a Machine Learning Engineer to join our IT Support team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "machine-learning-engineer-istanbul"
  },
  {
    "id": "job-123",
    "companyId": "c3",
    "title": "Business Analyst",
    "location": "Bangalore, India",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Junior",
    "description": "We are looking for a Business Analyst to join our Engineering team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Agile"
    ],
    "slug": "business-analyst-bangalore"
  },
  {
    "id": "job-124",
    "companyId": "c1",
    "title": "Data Analyst",
    "location": "Athens, Greece",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Data Analyst to join our IT Support team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Agile",
      "Problem Solving"
    ],
    "slug": "data-analyst-athens"
  },
  {
    "id": "job-125",
    "companyId": "c3",
    "title": "AI Product Manager",
    "location": "London, England, United Kingdom",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a AI Product Manager to join our Engineering team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "Problem Solving"
    ],
    "slug": "ai-product-manager-london"
  },
  {
    "id": "job-126",
    "companyId": "c3",
    "title": "Backend Developer",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Backend Developer to join our IT Support team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design",
      "Problem Solving"
    ],
    "slug": "backend-developer-dubai"
  },
  {
    "id": "job-127",
    "companyId": "c4",
    "title": "Data Analyst",
    "location": "Hyderabad, India",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Data Analyst to join our Analytics team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel"
    ],
    "slug": "data-analyst-hyderabad"
  },
  {
    "id": "job-128",
    "companyId": "c4",
    "title": "Backend Developer",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Senior",
    "description": "We are looking for a Backend Developer to join our Engineering team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Node.js",
      "API Design",
      "Agile"
    ],
    "slug": "backend-developer-berlin"
  },
  {
    "id": "job-129",
    "companyId": "c1",
    "title": "Mobile Developer (Flutter)",
    "location": "Riyadh, Saudi Arabia",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Junior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Operations team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Agile",
      "Problem Solving"
    ],
    "slug": "mobile-developer-(flutter)-riyadh"
  },
  {
    "id": "job-130",
    "companyId": "c3",
    "title": "QA Engineer",
    "location": "Istanbul, Turkey",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Analytics",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a QA Engineer to join our Analytics team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "qa-engineer-istanbul"
  },
  {
    "id": "job-131",
    "companyId": "c2",
    "title": "QA Engineer",
    "location": "Athens, Greece",
    "type": "Full-time",
    "workPolicy": "Remote",
    "department": "Operations",
    "experienceLevel": "Senior",
    "description": "We are looking for a QA Engineer to join our Operations team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "qa-engineer-athens"
  },
  {
    "id": "job-132",
    "companyId": "c3",
    "title": "Operations Associate",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "R&D",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Operations Associate to join our R&D team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Problem Solving"
    ],
    "slug": "operations-associate-cairo"
  },
  {
    "id": "job-133",
    "companyId": "c3",
    "title": "Technical Writer",
    "location": "Bangalore, India",
    "type": "Full-time",
    "workPolicy": "On-site",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Technical Writer to join our IT Support team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Copywriting",
      "Editing",
      "Agile",
      "Problem Solving"
    ],
    "slug": "technical-writer-bangalore"
  },
  {
    "id": "job-134",
    "companyId": "c1",
    "title": "Solutions Consultant",
    "location": "Athens, Greece",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Operations",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Solutions Consultant to join our Operations team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "solutions-consultant-athens"
  },
  {
    "id": "job-135",
    "companyId": "c1",
    "title": "QA Engineer",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "Customer Success",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a QA Engineer to join our Customer Success team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "qa-engineer-dubai"
  },
  {
    "id": "job-136",
    "companyId": "c3",
    "title": "Software Engineer",
    "location": "Boston, United States",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "R&D",
    "experienceLevel": "Junior",
    "description": "We are looking for a Software Engineer to join our R&D team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "software-engineer-boston"
  },
  {
    "id": "job-137",
    "companyId": "c3",
    "title": "Customer Success Executive",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Product",
    "experienceLevel": "Senior",
    "description": "We are looking for a Customer Success Executive to join our Product team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "customer-success-executive-dubai"
  },
  {
    "id": "job-138",
    "companyId": "c2",
    "title": "QA Engineer",
    "location": "London, England, United Kingdom",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Marketing",
    "experienceLevel": "Senior",
    "description": "We are looking for a QA Engineer to join our Marketing team.",
    "salaryRange": "INR 8L–15L / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git"
    ],
    "slug": "qa-engineer-london"
  },
  {
    "id": "job-139",
    "companyId": "c2",
    "title": "Machine Learning Engineer",
    "location": "Bangalore, India",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Design",
    "experienceLevel": "Junior",
    "description": "We are looking for a Machine Learning Engineer to join our Design team.",
    "salaryRange": "USD 80K–120K / year",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "machine-learning-engineer-bangalore"
  },
  {
    "id": "job-140",
    "companyId": "c2",
    "title": "Solutions Consultant",
    "location": "Bangalore, India",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "IT Support",
    "experienceLevel": "Junior",
    "description": "We are looking for a Solutions Consultant to join our IT Support team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile"
    ],
    "slug": "solutions-consultant-bangalore"
  },
  {
    "id": "job-141",
    "companyId": "c2",
    "title": "Mobile Developer (Flutter)",
    "location": "Hyderabad, India",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a Mobile Developer (Flutter) to join our Customer Success team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "mobile-developer-(flutter)-hyderabad"
  },
  {
    "id": "job-142",
    "companyId": "c2",
    "title": "Frontend Engineer",
    "location": "Istanbul, Turkey",
    "type": "Contract",
    "workPolicy": "On-site",
    "department": "Product",
    "experienceLevel": "Junior",
    "description": "We are looking for a Frontend Engineer to join our Product team.",
    "salaryRange": "AED 8K–12K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Problem Solving"
    ],
    "slug": "frontend-engineer-istanbul"
  },
  {
    "id": "job-143",
    "companyId": "c3",
    "title": "QA Engineer",
    "location": "Cairo, Egypt",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "Customer Success",
    "experienceLevel": "Junior",
    "description": "We are looking for a QA Engineer to join our Customer Success team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "Problem Solving"
    ],
    "slug": "qa-engineer-cairo"
  },
  {
    "id": "job-144",
    "companyId": "c3",
    "title": "Business Analyst",
    "location": "Dubai, United Arab Emirates",
    "type": "Part-time",
    "workPolicy": "Remote",
    "department": "R&D",
    "experienceLevel": "Junior",
    "description": "We are looking for a Business Analyst to join our R&D team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Data Analysis",
      "SQL",
      "Excel",
      "Problem Solving"
    ],
    "slug": "business-analyst-dubai"
  },
  {
    "id": "job-145",
    "companyId": "c4",
    "title": "Operations Associate",
    "location": "Berlin, Germany",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "Product",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Operations Associate to join our Product team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [],
    "slug": "operations-associate-berlin"
  },
  {
    "id": "job-146",
    "companyId": "c2",
    "title": "Frontend Engineer",
    "location": "Athens, Greece",
    "type": "Part-time",
    "workPolicy": "On-site",
    "department": "Sales",
    "experienceLevel": "Senior",
    "description": "We are looking for a Frontend Engineer to join our Sales team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Software Development",
      "Git",
      "React",
      "TypeScript",
      "CSS",
      "Agile"
    ],
    "slug": "frontend-engineer-athens"
  },
  {
    "id": "job-147",
    "companyId": "c2",
    "title": "Marketing Manager",
    "location": "Athens, Greece",
    "type": "Full-time",
    "workPolicy": "Hybrid",
    "department": "IT Support",
    "experienceLevel": "Senior",
    "description": "We are looking for a Marketing Manager to join our IT Support team.",
    "salaryRange": "SAR 10K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Leadership",
      "Project Management",
      "SEO",
      "Content Strategy",
      "Social Media"
    ],
    "slug": "marketing-manager-athens"
  },
  {
    "id": "job-148",
    "companyId": "c2",
    "title": "Product Designer",
    "location": "Dubai, United Arab Emirates",
    "type": "Contract",
    "workPolicy": "Hybrid",
    "department": "R&D",
    "experienceLevel": "Junior",
    "description": "We are looking for a Product Designer to join our R&D team.",
    "salaryRange": "USD 4K–6K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Figma",
      "UI/UX",
      "Prototyping",
      "Problem Solving"
    ],
    "slug": "product-designer-dubai"
  },
  {
    "id": "job-149",
    "companyId": "c3",
    "title": "Solutions Consultant",
    "location": "Boston, United States",
    "type": "Part-time",
    "workPolicy": "Hybrid",
    "department": "Engineering",
    "experienceLevel": "Mid-level",
    "description": "We are looking for a Solutions Consultant to join our Engineering team.",
    "salaryRange": "AED 12K–18K / month",
    "publishedAt": "2025-12-08T18:10:21.254Z",
    "skills": [
      "Agile",
      "Problem Solving"
    ],
    "slug": "solutions-consultant-boston"
  }
];

export const INITIAL_CANDIDATES: import('./types').Candidate[] = [
  {
    id: "john-doe-123",
    name: "John Doe",
    email: "john.doe@example.com",
    emailVerified: true,
    role: "Full Stack Developer",
    bio: "Passionate Full Stack Developer with 4+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies. Love solving complex problems and mentoring junior developers.",
    skills: ["React", "Node.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "AWS", "Docker", "Git", "API Design"],
    resumeUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    location: "Berlin, Germany",
    experienceLevel: "Mid-level",
    certifications: ["AWS Certified Solutions Architect", "Meta Frontend Developer", "MongoDB Certified Developer"],
    registeredHackathons: ["hack-1"],
    githubUrl: "https://github.com/johndoe",
    college: {
        name: "Technical University of Berlin",
        isVerified: true,
        cgpa: 3.8,
        degree: "Bachelor of Science in Computer Science",
        batch: "2019-2023"
    },
    codingProfiles: [
        {
            platform: "LeetCode",
            rank: "Top 5%",
            url: "https://leetcode.com/johndoe",
            stats: { easy: 120, medium: 85, hard: 10, total: 215 }
        },
        {
            platform: "HackerRank",
            rank: "5 Star",
            url: "https://hackerrank.com/johndoe",
            stats: { easy: 50, medium: 30, hard: 5, total: 85 }
        }
    ],
    projects: [
        {
            name: "E-Commerce Platform",
            description: "A full-featured online store built with Next.js and Stripe. Includes product catalog, shopping cart, payment processing, and admin dashboard.",
            url: "https://github.com/johndoe/ecommerce"
        },
        {
            name: "Task Management App",
            description: "Real-time collaborative task board using Socket.io and React. Features include drag-and-drop, real-time updates, and team collaboration.",
            url: "https://github.com/johndoe/task-app"
        },
        {
            name: "AI Chat Assistant",
            description: "ChatGPT-powered customer support bot with context awareness and multi-language support.",
            url: "https://github.com/johndoe/ai-chat"
        }
    ],
    testResults: [
        { testName: "JavaScript Fundamentals", score: 92, date: "2024-11-15" },
        { testName: "React Advanced Concepts", score: 88, date: "2024-11-20" }
    ]
  }
];

export const INITIAL_RECRUITERS: Recruiter[] = [
  {
    id: "rec-1",
    email: "hr@acmecorp.com",
    username: "sarahjohnson",
    password: "password123",
    companyId: "c1",
    name: "Sarah Johnson",
    role: "HR"
  },
  {
    id: "rec-2",
    email: "hr@globex.com",
    username: "michaelchen",
    password: "password123",
    companyId: "c2",
    name: "Michael Chen",
    role: "HR"
  },
  {
    id: "rec-3",
    email: "hr@soylentcorp.com",
    username: "emilyrodriguez",
    password: "password123",
    companyId: "c3",
    name: "Emily Rodriguez",
    role: "HR"
  },
  {
    id: "rec-4",
    email: "hr@umbrellacorp.com",
    username: "davidkim",
    password: "password123",
    companyId: "c4",
    name: "David Kim",
    role: "HR"
  }
];

export const INITIAL_DSA_QUESTIONS: DSAQuestion[] = [
  {
    id: "dsa-1",
    companyId: "c4",
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\nExample 1:\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\nExample 2:\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\nExample 3:\nInput: nums = [3,3], target = 6\nOutput: [0,1]",
    difficulty: "Easy",
    timeLimit: 30,
    hints: [
      "Try using a hash map to store the numbers you've seen so far",
      "For each number, check if (target - current number) exists in the hash map",
      "The time complexity should be O(n)"
    ],
    testCases: [
      {
        input: "[2,7,11,15], 9",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "[3,2,4], 6",
        expectedOutput: "[1,2]",
        isHidden: false
      },
      {
        input: "[3,3], 6",
        expectedOutput: "[0,1]",
        isHidden: false
      },
      {
        input: "[1,5,3,7,9], 10",
        expectedOutput: "[1,3]",
        isHidden: true
      }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
    // Write your code here
    
}`,
      python: `def twoSum(nums, target):
    # Write your code here
    pass`,
      java: `public int[] twoSum(int[] nums, int target) {
    // Write your code here
    
}`
    },
    tags: ["Array", "Hash Table"],
    createdBy: "rec-4",
    createdAt: "2025-12-09T10:00:00.000Z"
  },
  {
    id: "dsa-2",
    companyId: "c4",
    title: "Valid Parentheses",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\nExample 1:\nInput: s = \"()\"\nOutput: true\n\nExample 2:\nInput: s = \"()[]{}\"\nOutput: true\n\nExample 3:\nInput: s = \"(]\"\nOutput: false",
    difficulty: "Easy",
    timeLimit: 25,
    hints: [
      "Use a stack data structure",
      "When you encounter an opening bracket, push it to the stack",
      "When you encounter a closing bracket, check if it matches the top of the stack",
      "At the end, the stack should be empty"
    ],
    testCases: [
      {
        input: "\"()\"",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "\"()[]{}\"",
        expectedOutput: "true",
        isHidden: false
      },
      {
        input: "\"(]\"",
        expectedOutput: "false",
        isHidden: false
      },
      {
        input: "\"([)]\"",
        expectedOutput: "false",
        isHidden: true
      },
      {
        input: "\"{[]}\"",
        expectedOutput: "true",
        isHidden: true
      }
    ],
    starterCode: {
      javascript: `function isValid(s) {
    // Write your code here
    
}`,
      python: `def isValid(s):
    # Write your code here
    pass`,
      java: `public boolean isValid(String s) {
    // Write your code here
    
}`
    },
    tags: ["String", "Stack"],
    createdBy: "rec-4",
    createdAt: "2025-12-09T11:00:00.000Z"
  },
  {
    id: "dsa-3",
    companyId: "c1",
    title: "Merge Two Sorted Lists",
    description: "You are given the heads of two sorted linked lists list1 and list2.\n\nMerge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.\n\nExample 1:\nInput: list1 = [1,2,4], list2 = [1,3,4]\nOutput: [1,1,2,3,4,4]\n\nExample 2:\nInput: list1 = [], list2 = []\nOutput: []\n\nExample 3:\nInput: list1 = [], list2 = [0]\nOutput: [0]",
    difficulty: "Medium",
    timeLimit: 45,
    hints: [
      "Use a dummy node to simplify edge cases",
      "Compare the values of the current nodes from both lists",
      "Attach the smaller node to the result and move forward",
      "Don't forget to handle the remaining nodes"
    ],
    testCases: [
      {
        input: "[1,2,4], [1,3,4]",
        expectedOutput: "[1,1,2,3,4,4]",
        isHidden: false
      },
      {
        input: "[], []",
        expectedOutput: "[]",
        isHidden: false
      },
      {
        input: "[], [0]",
        expectedOutput: "[0]",
        isHidden: false
      }
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
    // Write your code here
    
}`,
      python: `def mergeTwoLists(list1, list2):
    # Write your code here
    pass`
    },
    tags: ["Linked List", "Recursion"],
    createdBy: "rec-1",
    createdAt: "2025-12-09T12:00:00.000Z"
  }
];
