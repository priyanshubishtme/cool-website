window.LITTLE_UNIVERSE_DATA = Object.freeze({
  profile: {
    name: 'Priyanshu Bisht',
    brand: 'priyanshubishtme',
    ageCopy: 'Nineteen',
    location: 'Rudrapur, Uttarakhand, India',
    email: 'priyanshubisht.me@gmail.com',
    intro: 'Nineteen, a builder and creator, curious about tech, people, ideas and life.',
    roles: [
      { title: 'I build', text: 'Client-focused web products across frontend, backend, APIs and databases, from the first requirement to delivery.' },
      { title: 'I explore', text: 'AI and data science, including teaching machines things such as how to drive a car.' },
      { title: 'I create & connect', text: 'Making content, sharing ideas and giving back to juniors.' }
    ]
  },
  navigation: [
    { label: 'Home', route: '/' },
    { label: 'Projects', route: '/projects' },
    { label: 'About', route: '/about' },
    { label: 'Notes', route: '/notes' },
    { label: 'Books', route: '/books' },
    { label: 'Experience', route: '/experience' },
    { label: 'Achievements', route: '/achievements' },
    { label: 'Contact', route: '/contact' }
  ],
  guideActions: {
    work: { answer: 'I build useful web products from idea to delivery: interfaces, APIs, databases and the systems that connect them. I also explore AI and data science through hands-on experiments.' },
    drives: { answer: 'Curiosity drives me first. I like taking a difficult or unclear idea, making it understandable, and shipping something people can actually use.' },
    stack: { answer: 'My core stack is JavaScript, React.js, Node.js, Express.js, MongoDB, MySQL, Python, Git and data structures. I also work with FastAPI, NumPy and Gymnasium for experiments.' },
    purpose: { answer: 'My purpose is to keep learning by building, share what I learn, and make the path easier for people around me—especially juniors who are just starting.' },
    future: { answer: 'In five years, I see myself as a dependable product engineer and builder: leading meaningful systems, going deeper into AI, and creating work that is useful beyond a portfolio.' },
    motivation: { answer: 'Progress motivates me: a working feature, a clearer explanation, a hard problem becoming simple, or a small moment where something I built helps someone else.' }
  },
  landmarks: {
    '/projects': { id: 'workshop', label: 'Maker Workshop' },
    '/about': { id: 'lookout', label: 'Story Garden' },
    '/books': { id: 'library', label: 'Library' },
    '/notes': { id: 'library', label: 'Writing Desk' },
    '/experience': { id: 'workshop', label: 'Workshop Noticeboard' },
    '/education': { id: 'learning', label: 'Learning Station' },
    '/achievements': { id: 'pavilion', label: 'Trophy Pavilion' },
    '/contact': { id: 'post-office', label: 'Post Office' }
  },
  projects: [
    {
      slug: 'ashapure',
      title: 'AshaPure',
      subtitle: 'Smart milk delivery platform',
      type: 'Full-stack commerce platform',
      description: 'A MERN dairy e-commerce platform supporting shopping, checkout, orders, subscriptions, rewards and admin operations.',
      problem: 'A dairy storefront is not only a catalogue. Orders affect inventory, subscriptions affect billing, and rewards affect both. Those connected flows need to stay consistent for customers and administrators.',
      solution: 'A full-stack platform with role-aware authentication, shopping and checkout flows, order management, recurring subscriptions, rewards, and administrative operations.',
      role: 'Priyanshu owned the schema, routes, authentication and UI end to end, carrying requirements from data modelling through the final responsive interface.',
      tradeoffs: 'The implementation focused on integration rather than isolated feature count: shared entities and permissions had to remain predictable as orders, subscriptions, inventory and rewards changed together.',
      stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
      facts: [
        { value: '18', label: 'frontend routes' },
        { value: '25', label: 'REST endpoints' },
        { value: 'JWT', label: 'role-based access' },
        { value: '4', label: 'viewports tested' }
      ],
      visual: 'dairy',
      links: null
    },
    {
      slug: 'arena-self-driving',
      title: 'Arena Self-Driving',
      subtitle: 'Reinforcement-learning highway agent',
      type: 'Reinforcement learning experiment',
      description: 'An autonomous highway driving simulator where an agent learns with tabular SARSA.',
      problem: 'Training logs make it difficult to understand how a driving policy changes. The experiment needed a manageable state space and a way to observe learning as it happened.',
      solution: 'A discretized highway environment with five actions and a tabular SARSA agent. Human driving demonstrations warm-start training, while four metrics stream to a browser interface.',
      role: 'Priyanshu designed the state and action representation, recorded his own demonstrations, implemented the learning workflow, and connected live training metrics to the browser.',
      tradeoffs: 'Discretization makes tabular learning understandable and inspectable, but necessarily simplifies a continuous driving problem. The portfolio therefore presents this as an experiment, not production autonomy.',
      stack: ['Python', 'HighwayEnv', 'Gymnasium', 'NumPy', 'FastAPI', 'PyGame'],
      facts: [
        { value: '864', label: 'discretized states' },
        { value: '5', label: 'driving actions' },
        { value: '4,320', label: 'Q-table entries' },
        { value: '4', label: 'live metrics' }
      ],
      visual: 'highway',
      links: null
    }
  ],
  story: [
    { title: 'The signal — why I started coding', text: 'Computer science was the first subject where I could build rather than memorize. Hands-on work in classes 11 and 12 made the direction clear: make things, not only study them.' },
    { title: 'A beginning, not an end', text: 'My first hackathon project did not work as planned. Shipping something imperfect taught me more than waiting for a flawless result; failure became a starting point.' },
    { title: 'Learning to speak', text: 'After staying quiet in crowded rooms, an unprepared first introduction on stage became the beginning of a habit I am still building.' },
    { title: 'Eight minutes — Budget Lens', text: 'An eight-minute presentation and a sharper Q&A earned first prize: preparation and a clear point of view held up under pressure.' },
    { title: 'What drives me', text: 'Building useful things, learning in public and helping juniors. At nineteen, trying and adjusting matters more than waiting for certainty.' }
  ],
  experience: {
    role: 'Software Engineer Intern',
    company: 'ElvoraGo',
    period: 'September 2026–Present',
    responsibilities: [
      'Develop client-focused solutions across frontend, backend, APIs and databases, turning requirements into functional, scalable work.',
      'Lead client outreach and networking: prospecting, requirement gathering, project coordination and delivery.'
    ]
  },
  education: [
    { title: 'Bachelor of Computer Applications (AI & Data Science)', institution: 'Graphic Era Hill University', period: 'July 2024–July 2027', result: 'Supplied CGPA: 9.48' },
    { title: 'Intermediate / Senior Secondary', institution: 'Jaycees Public School', period: 'May 2022–May 2024', result: '86%' }
  ],
  skills: {
    Advanced: ['Java', 'JavaScript'],
    Intermediate: ['Python'],
    'Technologies & concepts': ['React.js', 'Node.js', 'MySQL', 'Git & GitHub', 'Data Structures & Algorithms']
  },
  achievements: [
    { event: 'CodeCraft 2025', result: 'First position · Coding', detail: 'Hack the Spring, Bhimtal.' },
    { event: 'Budget Lens 2026', result: 'First prize', detail: 'Eight minutes of presentation followed by a focused Q&A.' },
    { event: 'Design Spark 2026', result: 'Runner-up · Design', detail: 'Recognised for design thinking and execution.' },
    { event: 'Webathon 2.0', result: 'Result awaiting confirmation', detail: 'The supplied record conflicts between “second runner-up” and “2nd position,” so no medal is assigned yet.', uncertain: true },
    { event: 'Tech Quiz', result: 'Second position · Twice', detail: 'University-level technology quiz.' },
    { event: 'Watch the Code', result: 'National finalist', detail: 'National hackathon finalist.' },
    { event: 'Nirvan', result: 'National finalist', detail: 'National hackathon finalist.' },
    { event: 'Monthly Coding Series', result: 'Gold · Silver · Bronze', detail: 'Podium finishes across three university-level contests.' }
  ],
  social: [
    { label: 'LinkedIn', url: 'https://linkedin.com/in/priyanshubishtme' },
    { label: 'GitHub', url: 'https://github.com/priyanshubishtme' },
    { label: 'Instagram', url: 'https://instagram.com/priyanshubishtme' },
    { label: 'YouTube', url: 'https://youtube.com/@priyanshubishtme' },
    { label: 'LinkTree', url: 'https://linktr.ee/priyanshubisht.me' }
  ]
});
