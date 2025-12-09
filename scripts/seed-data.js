const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const csvPath = path.join(__dirname, '../data.csv');
const outputPath = path.join(__dirname, '../src/lib/initial-data.ts');

const COMPANIES = [
  {
    id: 'c1',
    slug: 'acme-corp',
    name: 'Acme Corp',
    branding: {
        primaryColor: '#0f172a',
        secondaryColor: '#3b82f6',
        fontFamily: 'Inter',
        logoUrl: 'https://placehold.co/200x50/0f172a/ffffff?text=ACME',
        heroImageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80'
    },
    sections: [
        { id: 's1', type: 'hero', title: 'Build the Future', content: 'We are pioneering the next generation.', order: 0 },
        { id: 's2', type: 'about', title: 'About Us', content: 'We are Acme.', order: 1 }
    ]
  },
  {
    id: 'c2',
    slug: 'globex',
    name: 'Globex Corp',
    branding: {
        primaryColor: '#dc2626',
        secondaryColor: '#fca5a5',
        fontFamily: 'Roboto',
        logoUrl: 'https://placehold.co/200x50/dc2626/ffffff?text=Globex',
        heroImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80'
    },
    sections: [
        { id: 's1', type: 'hero', title: 'We Move the World', content: 'Globex is everywhere.', order: 0 }
    ]
  },
  {
    id: 'c3',
    slug: 'soylent-corp',
    name: 'Soylent Corp',
    branding: {
        primaryColor: '#059669',
        secondaryColor: '#6ee7b7',
        fontFamily: 'Inter',
        logoUrl: 'https://placehold.co/200x50/059669/ffffff?text=Soylent',
        heroImageUrl: 'https://images.unsplash.com/photo-1518544806308-32f396f2a945?auto=format&fit=crop&q=80'
    },
    sections: [
        { id: 's1', type: 'hero', title: 'People First', content: 'Making food for the future.', order: 0 }
    ]
  },
  {
    id: 'c4',
    slug: 'umbrella-corp',
    name: 'Umbrella Corp',
    branding: {
        primaryColor: '#7f1d1d',
        secondaryColor: '#f87171',
        fontFamily: 'Roboto',
        logoUrl: 'https://placehold.co/200x50/7f1d1d/ffffff?text=Umbrella',
        heroImageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&q=80'
    },
    sections: [
        { id: 's1', type: 'hero', title: 'Our Business is Life', content: 'Leading pharmaceutical research.', order: 0 }
    ]
  }
];

function inferSkills(title) {
    const t = title.toLowerCase();
    const skills = [];
    if (t.includes('engineer') || t.includes('developer')) skills.push('Software Development', 'Git');
    if (t.includes('react') || t.includes('frontend') || t.includes('full stack')) skills.push('React', 'TypeScript', 'CSS');
    if (t.includes('node') || t.includes('backend') || t.includes('full stack')) skills.push('Node.js', 'API Design');
    if (t.includes('manager')) skills.push('Leadership', 'Project Management');
    if (t.includes('designer')) skills.push('Figma', 'UI/UX', 'Prototyping');
    if (t.includes('sales')) skills.push('CRM', 'Communication', 'Negotiation');
    if (t.includes('analyst')) skills.push('Data Analysis', 'SQL', 'Excel');
    if (t.includes('marketing')) skills.push('SEO', 'Content Strategy', 'Social Media');
    if (t.includes('writer')) skills.push('Copywriting', 'Editing');
    
    // Add some randomization for variety
    if (Math.random() > 0.5) skills.push('Agile');
    if (Math.random() > 0.5) skills.push('Problem Solving');
    
    return [...new Set(skills)];
}

try {
    const content = fs.readFileSync(csvPath, 'utf8');
    const records = parse(content, { columns: true, skip_empty_lines: true });
    
    const jobs = records.map((row, index) => {
        // Randomly assign company
        const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
        
        return {
            id: `job-${index}`,
            companyId: company.id,
            title: row.title,
            location: row.location,
            type: (row.employment_type || row.job_type || 'Full-time').replace('Full time', 'Full-time').replace('Part time', 'Part-time'),
            workPolicy: row.work_policy || 'Hybrid',
            department: row.department || 'General',
            experienceLevel: row.experience_level || 'Mid-level',
            description: `We are looking for a ${row.title} to join our ${row.department} team.`,
            salaryRange: row.salary_range,
            publishedAt: new Date().toISOString(), // Use current time for freshness
            skills: inferSkills(row.title),
            slug: row.job_slug || `job-${index}`
        };
    });
    
    const fileContent = `import { Company, Job } from './types';

export const INITIAL_COMPANIES: Company[] = ${JSON.stringify(COMPANIES, null, 2)};

export const INITIAL_JOBS: Job[] = ${JSON.stringify(jobs, null, 2)};
`;

    fs.writeFileSync(outputPath, fileContent);
    console.log(`Generated ${jobs.length} jobs in ${outputPath}`);
    
} catch (err) {
    console.error('Error parsing CSV:', err);
    process.exit(1);
}
