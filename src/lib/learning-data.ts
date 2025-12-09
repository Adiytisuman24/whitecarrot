
export interface LearningModule {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    aiSummary: string;
}

export interface LearningPath {
    id: string;
    name: string;
    modules: LearningModule[];
}

export interface Branch {
    id: string;
    name: string;
    paths: LearningPath[];
}

export const LEARNING_DATA: Branch[] = [
    {
        id: 'cs',
        name: 'Computer Science',
        paths: [
            {
                id: 'fullstack',
                name: 'MERN Stack Development',
                modules: [
                    { id: 'm1', title: 'React.js Essentials', duration: '45m', videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk?si=K-v0z3b8t_0j6g3-', description: 'Master components, state, and props.', aiSummary: 'Focus on Hooks and Virtual DOM.' },
                    { id: 'm2', title: 'Node.js & Express', duration: '50m', videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE', description: 'Build REST APIs with Node.', aiSummary: 'Understand Event Loop and Middleware.' },
                    { id: 'm3', title: 'MongoDB & Mongoose', duration: '40m', videoUrl: 'https://www.youtube.com/embed/W-qaQ0gXQAE', description: 'NoSQL Database Modeling.', aiSummary: 'Learn Schema Design and indexing.' }
                ]
            },
            {
                id: 'dsa',
                name: 'Data Structures & Algorithms',
                modules: [
                    { id: 'd1', title: 'Graph Algorithms', duration: '60m', videoUrl: 'https://www.youtube.com/embed/09_LlHjoEiY', description: 'BFS, DFS, and Dijkstra.', aiSummary: 'Crucial for interviews at Google/Amazon.' },
                    { id: 'd2', title: 'Dynamic Programming', duration: '55m', videoUrl: 'https://www.youtube.com/embed/oBt53YbR9Kk', description: 'Solving optimization problems.', aiSummary: 'Master Memoization and Tabulation.' }
                ]
            },
            {
                id: 'ai',
                name: 'AI & AGI',
                modules: [
                    { id: 'a1', title: 'Neural Networks Intro', duration: '45m', videoUrl: 'https://www.youtube.com/embed/aircAruvnKk', description: 'Basics of Deep Learning.', aiSummary: 'Understand Backpropagation concepts.' },
                    { id: 'a2', title: 'LLMs & Transformers', duration: '40m', videoUrl: 'https://www.youtube.com/embed/zjkBMFhNj_g', description: 'How GPT works.', aiSummary: 'Attention mechanism is key.' }
                ]
            }
        ]
    },
    {
        id: 'ee',
        name: 'Electrical Engineering',
        paths: [
            {
                id: 'power',
                name: 'Power Systems',
                modules: [
                    { id: 'p1', title: 'Power Distribution', duration: '45m', videoUrl: 'https://www.youtube.com/embed/-Zk8j3XN0gE', description: 'Modern distribution & automation.', aiSummary: 'Focus on Grid stability and Load flow.' },
                    { id: 'p2', title: 'Transmission Lines', duration: '50m', videoUrl: 'https://www.youtube.com/embed/I746k5qQvKk', description: 'High voltage transmission.', aiSummary: 'Understanding impedance and losses.' }
                ]
            },
            {
                id: 'circuits',
                name: 'Circuits & Signal Processing',
                modules: [
                    { id: 'c1', title: 'Circuit Analysis', duration: '40m', videoUrl: 'https://www.youtube.com/embed/i8F7i7Zg1Wk', description: 'KVL, KCL and Thevenin.', aiSummary: 'Master basic circuit laws.' }
                ]
            }
        ]
    },
    {
        id: 'aero',
        name: 'Aerospace Engineering',
        paths: [
            {
                id: 'fluids',
                name: 'Fluid Dynamics',
                modules: [
                    { id: 'f1', title: 'Intro to Aerodynamics', duration: '55m', videoUrl: 'https://www.youtube.com/embed/5ltjznl_k8o', description: 'Bernoullis principle and lift.', aiSummary: 'Key concept: Pressure difference creates lift.' }
                ]
            },
            {
                id: 'prop',
                name: 'Propulsion Systems',
                modules: [
                    { id: 'pr1', title: 'Jet Engine Basics', duration: '60m', videoUrl: 'https://www.youtube.com/embed/NVj2G3bM_yM', description: 'How turbojets work.', aiSummary: 'Thermodynamic cycles (Brayton cycle).' }
                ]
            }
        ]
    },
    {
        id: 'admin',
        name: 'MBA & Finance',
        paths: [
            {
                id: 'fin',
                name: 'Financial Modeling',
                modules: [
                    { id: 'fm1', title: 'Excel for Finance', duration: '30m', videoUrl: 'https://www.youtube.com/embed/nmbaHjD9MRE', description: 'Building valuation models.', aiSummary: 'Focus on DCF and Sensitivity Analysis.' }
                ]
            }
        ]
    }
];

export const HACKATHONS = [
    {
        id: 'h1',
        title: 'Global AI Championship',
        company: 'Google',
        date: 'Feb 15 - Feb 17, 2026',
        prize: '$50,000',
        tags: ['AI', 'Python', 'Global'],
        status: 'Registrations Open',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png'
    },
    {
        id: 'h2',
        title: 'Smart Cities Hackathon',
        company: 'Amazon AWS',
        date: 'Feb 28 - Mar 02, 2026',
        prize: '$25,000 + Credits',
        tags: ['IoT', 'Cloud', 'Smart City'],
        status: 'Open Soon',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png'
    },
    {
        id: 'h3',
        title: 'FinTech Innovation Drive',
        company: 'Goldman Sachs',
        date: 'Mar 10, 2026',
        prize: 'Internship Opportunity',
        tags: ['Finance', 'Blockchain', 'Web3'],
        status: 'Upcoming',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Goldman_Sachs.svg/1200px-Goldman_Sachs.svg.png'
    },
    {
        id: 'h4',
        title: 'Space Apps Challenge',
        company: 'NASA',
        date: 'Mar 20, 2026',
        prize: 'Visit NASA HQ',
        tags: ['Aerospace', 'Data Science'],
        status: 'Upcoming',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/1200px-NASA_logo.svg.png'
    }
];
