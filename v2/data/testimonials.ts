export interface ProfessionalTestimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

export const professionalTestimonials: ProfessionalTestimonial[] = [
  {
    quote: "Aditya is one of the most creative individuals I've worked with.",
    name: 'G. Lohith Reddy',
    designation: 'General Secretary at Woxsen University Student Council',
    src: '/testimonials/Lohith.webp',
  },
  {
    quote: 'His problem-solving skills and UI sense are top-notch.',
    name: 'Melvin Johnson',
    designation: 'Intern at AI Research Center Woxsen University',
    src: '/testimonials/melvin.webp',
  },
  {
    quote: 'He blends design and code like an artist.',
    name: 'Mitansh Seghal',
    designation: 'Software Engineer',
    src: '/testimonials/mitansh.webp',
  },
];
