export type Image = {
    src: string;
    alt?: string;
    caption?: string;
};

export type Link = {
    text: string;
    href: string;
};

export type Hero = {
    title?: string;
    text?: string;
    image?: Image;
    actions?: Link[];
};

export type Subscribe = {
    title?: string;
    text?: string;
    formUrl: string;
};

export type SiteConfig = {
    website: string;
    logo?: Image;
    title?: string;
    subtitle?: string;
    description: string;
    image?: Image;
    headerNavLinks?: Link[];
    footerNavLinks?: Link[];
    socialLinks?: Link[];
    hero?: Hero;
    subscribe?: Subscribe;
    postsPerPage?: number;
    projectsPerPage?: number;
};

const siteConfig: SiteConfig = {
    website: 'https://ashby.dev',
    title: '',
    description: 'Ashby Samba\'s blog',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Dante - Astro.js and Tailwind CSS theme'
    },
    headerNavLinks: [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Projects',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        }
    ],
    footerNavLinks: [
        {
            text: 'About',
            href: '#'
        },
        {
            text: 'Contact',
            href: '/contact'
        },
        {
            text: 'Terms',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'LinkedIn',
            href: '#'
        },
        {
            text: 'Reddit',
            href: '#'
        },
        {
            text: 'X/Twitter',
            href: '#'
        }
    ],
    hero: {
        title: 'Ashby Samba',
        text: "I'm an electrical engineer with a passion for personal projects, but I've often struggled to see them through. I created this blog as a public commitment to keep myself motivated and to document my journey. My hope is that it serves as both a personal engineering notebook and a resource for others interested in electrical engineering and its related fields.",
        image: {
            src: '/hero.jpg',
            alt: 'A person sitting at a desk in front of a computer'
        }
    },
    /* subscribe: {
        title: 'Subscribe to Dante Newsletter',
        text: 'One update per week. All the latest posts directly in your inbox.',
        formUrl: '#'
    }, */
    postsPerPage: 4,
    projectsPerPage: 4
};

export default siteConfig;
