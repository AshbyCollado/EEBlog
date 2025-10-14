export interface Link {
    title: string;
    url: string;
    description: string;
    savedToWayback: boolean;
    effect?: string;
}

export interface Category {
    name: string;
    links: Link[];
    color?: string;
    effect?: string;
}

export const linkArchive: Category[] = [
    {
        name: "Web Development",
        color: "#4A90E2", // A nice, calm blue
        effect: 'flame-text',
        links: [
            {
                title: "Astro Docs",
                url: "https://docs.astro.build/en/getting-started/",
                description: "The official documentation for Astro.",
                savedToWayback: true,
                effect: 'retro-wave-text',
            },
            {
                title: "Tailwind CSS",
                url: "https://tailwindcss.com/docs/installation",
                description: "A utility-first CSS framework.",
                savedToWayback: false,
                effect: 'threedee-text',
            },
            {
                title: "Smashing Magazine",
                url: "https://www.smashingmagazine.com/",
                description: "A leading magazine for professional web designers and developers.",
                savedToWayback: true,
                effect: 'comic-text',
            },
            {
                title: "Lorem Ipsum Dolor",
                url: "#",
                description: "A placeholder link for testing purposes.",
                savedToWayback: false,
            },
        ],
    },
    {
        name: "Design",
        color: "#E5A4CB", // A soft pink
        effect: 'neon-glow',
        links: [
            {
                title: "Figma",
                url: "https://www.figma.com/",
                description: "A collaborative interface design tool.",
                savedToWayback: true,
                effect: 'anaglyph-text',
            },
            {
                title: "Coolors",
                url: "https://coolors.co/",
                description: "A fast and easy color palette generator.",
                savedToWayback: false,
                effect: 'rainbow-text',
            },
            {
                title: "Sit Amet Consectetur",
                url: "#",
                description: "Another placeholder to see how the layout holds up.",
                savedToWayback: true,
            },
        ],
    },
    {
        name: "Productivity",
        color: "#50E3C2", // A vibrant teal
        effect: 'expanding-text',
        links: [
            {
                title: "Obsidian",
                url: "https://obsidian.md/",
                description: "A powerful knowledge base on top of a local folder of plain text Markdown files.",
                savedToWayback: true,
                effect: 'shiny-text',
            },
            {
                title: "Notion",
                url: "https://www.notion.so/",
                description: "The connected workspace where better, faster work happens.",
                savedToWayback: false,
                effect: 'matrix-text',
            },
            {
                title: "Adipiscing Elit",
                url: "#",
                description: "More placeholder content for the productivity section.",
                savedToWayback: false,
            },
        ],
    },
    {
        name: "Miscellaneous",
        color: "#F5A623", // A warm orange
        effect: 'marquee-text',
        links: [
            {
                title: "The Internet Archive",
                url: "https://archive.org/",
                description: "A digital library of Internet sites and other cultural artifacts in digital form.",
                savedToWayback: true,
                effect: 'drop-shadow-text',
            },
            {
                title: "Sed Do Eiusmod",
                url: "#",
                description: "A miscellaneous link to round out the collection.",
                savedToWayback: true,
            },
        ],
    },
];
