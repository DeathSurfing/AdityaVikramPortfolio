// Blog Data Management
// This file makes it easy to add new blog posts to your portfolio

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  publishedAt: string; // YYYY-MM-DD format
  readTime: string;
  featured: boolean;
  slug?: string; // Optional: for URL-friendly version of the title
  author?: string; // Optional: author name
  coverImage?: string; // Optional: cover image URL
}

// Add your blog posts here!
// Simply uncomment and fill in the template below for each new post
export const blogPosts: BlogPost[] = [
  // Template for new blog posts:
  // {
  //   id: 1,
  //   title: "Your Awesome Blog Title",
  //   excerpt: "A compelling summary of what readers will learn in this post. Keep it concise but informative.",
  //   content: `
  //     # Your Blog Title
  //     
  //     Write your full blog content here using markdown format.
  //     
  //     ## Section 1
  //     Your content here...
  //     
  //     ## Section 2
  //     More content...
  //     
  //     ## Conclusion
  //     Wrap up your thoughts...
  //   `,
  //   tags: ["React", "NextJS", "TypeScript"], // Relevant tags for your post
  //   publishedAt: "2024-01-15", // Publication date
  //   readTime: "5 min read", // Estimated reading time
  //   featured: true, // Set to true for featured posts (shown prominently)
  //   slug: "your-awesome-blog-title", // Optional: URL-friendly version
  //   author: "Aditya Vikram Mahendru", // Optional: author name
  //   coverImage: "/images/blog/your-post-image.jpg" // Optional: cover image
  // },
  
  // Add more posts by copying the template above and filling in the details
];

// Helper functions for blog management
export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getRegularPosts(): BlogPost[] {
  return blogPosts.filter(post => !post.featured);
}

export function getAllPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => 
    post.slug === slug || 
    post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') === slug
  );
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter(post => 
    post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
  );
}

// Quick start examples - uncomment these when you're ready to start blogging!
export const examplePosts: BlogPost[] = [
  // {
  //   id: 1,
  //   title: "My Journey into Full-Stack Development",
  //   excerpt: "How I transitioned from learning programming basics to building production applications that serve thousands of users.",
  //   content: `
  //     # My Journey into Full-Stack Development
  //     
  //     Starting out in programming can feel overwhelming. There are so many technologies, frameworks, and concepts to learn. Here's how I navigated my way from beginner to building production applications.
  //     
  //     ## The Beginning
  //     My journey started with simple HTML and CSS...
  //     
  //     ## Learning Backend Development
  //     Moving from frontend to backend was a big leap...
  //     
  //     ## Building Real Projects
  //     The real learning happened when I started building actual applications...
  //     
  //     ## Lessons Learned
  //     Here are the key insights from my journey...
  //   `,
  //   tags: ["Journey", "Learning", "Full-Stack"],
  //   publishedAt: "2024-01-15",
  //   readTime: "6 min read",
  //   featured: true,
  //   slug: "my-journey-into-fullstack-development"
  // },
  // {
  //   id: 2,
  //   title: "Building Scalable Payment Systems with FastAPI",
  //   excerpt: "Lessons learned from implementing payment processing for university events, handling 300+ transactions with 100% uptime.",
  //   content: `
  //     # Building Scalable Payment Systems with FastAPI
  //     
  //     Payment processing is critical for any application that handles money. Here's what I learned building a payment system that processed hundreds of transactions for university events.
  //     
  //     ## Architecture Overview
  //     The system needed to handle multiple payment methods...
  //     
  //     ## Integration with Cashfree
  //     Working with payment gateways requires careful attention to security...
  //     
  //     ## Error Handling and Reliability
  //     Payment systems must be bulletproof...
  //   `,
  //   tags: ["FastAPI", "Payments", "Backend", "Python"],
  //   publishedAt: "2024-01-10",
  //   readTime: "8 min read",
  //   featured: false,
  //   slug: "building-scalable-payment-systems-fastapi"
  // }
];
