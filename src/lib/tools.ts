export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  placeholder: string;
  fields: Field[];
  systemPrompt: string;
}

export interface Field {
  name: string;
  label: string;
  type: "text" | "textarea" | "select";
  placeholder: string;
  options?: string[];
  required?: boolean;
}

export const TOOLS: Tool[] = [
  {
    id: "resume",
    name: "Resume Builder",
    description:
      "Generate a professional, ATS-optimized resume from your experience details.",
    icon: "FileText",
    placeholder: "Paste your experience, skills, and job target...",
    fields: [
      {
        name: "experience",
        label: "Your Experience & Skills",
        type: "textarea",
        placeholder:
          "e.g. 5 years software engineer, Python, React, AWS. Led team of 8 at Acme Corp...",
        required: true,
      },
      {
        name: "jobTitle",
        label: "Target Job Title",
        type: "text",
        placeholder: "e.g. Senior Software Engineer",
        required: true,
      },
      {
        name: "tone",
        label: "Tone",
        type: "select",
        placeholder: "Select tone",
        options: ["Professional", "Confident", "Creative", "Executive"],
      },
    ],
    systemPrompt: `You are an expert resume writer. Create a professional, ATS-optimized resume based on the user's experience. Format it cleanly with sections: Summary, Experience, Skills, Education. Use strong action verbs and quantified achievements. Output in clean markdown.`,
  },
  {
    id: "cover-letter",
    name: "Cover Letter",
    description:
      "Craft a compelling cover letter tailored to any job posting.",
    icon: "Mail",
    placeholder: "Paste the job description and your background...",
    fields: [
      {
        name: "jobDescription",
        label: "Job Description",
        type: "textarea",
        placeholder: "Paste the job description here...",
        required: true,
      },
      {
        name: "background",
        label: "Your Background",
        type: "textarea",
        placeholder: "Brief summary of your relevant experience...",
        required: true,
      },
      {
        name: "companyName",
        label: "Company Name",
        type: "text",
        placeholder: "e.g. Google",
      },
    ],
    systemPrompt: `You are an expert cover letter writer. Write a compelling, personalized cover letter that connects the candidate's background to the job requirements. Be specific, enthusiastic, and professional. Keep it concise (3-4 paragraphs). Output in clean text format.`,
  },
  {
    id: "email",
    name: "Email Writer",
    description:
      "Write professional emails for any occasion — cold outreach, follow-ups, proposals.",
    icon: "Send",
    placeholder: "Describe the email you need...",
    fields: [
      {
        name: "purpose",
        label: "Email Purpose",
        type: "textarea",
        placeholder:
          "e.g. Follow up on job interview at Tesla from last Tuesday...",
        required: true,
      },
      {
        name: "emailType",
        label: "Email Type",
        type: "select",
        placeholder: "Select type",
        options: [
          "Cold Outreach",
          "Follow Up",
          "Proposal",
          "Thank You",
          "Apology",
          "Request",
          "Introduction",
        ],
      },
      {
        name: "tone",
        label: "Tone",
        type: "select",
        placeholder: "Select tone",
        options: ["Professional", "Friendly", "Formal", "Casual", "Urgent"],
      },
    ],
    systemPrompt: `You are an expert email copywriter. Write a clear, effective email based on the user's requirements. Include a compelling subject line. Keep it concise and actionable. Format: Subject line first, then the email body.`,
  },
  {
    id: "linkedin",
    name: "LinkedIn Bio",
    description:
      "Create an attention-grabbing LinkedIn headline and summary that gets you noticed.",
    icon: "User",
    placeholder: "Tell us about your career...",
    fields: [
      {
        name: "career",
        label: "Your Career Summary",
        type: "textarea",
        placeholder:
          "e.g. Marketing manager with 8 years in SaaS, grew revenue 3x at startup...",
        required: true,
      },
      {
        name: "goals",
        label: "Career Goals",
        type: "text",
        placeholder: "e.g. Looking for VP Marketing roles at Series B+ startups",
      },
      {
        name: "style",
        label: "Style",
        type: "select",
        placeholder: "Select style",
        options: [
          "Professional",
          "Thought Leader",
          "Storyteller",
          "Data-Driven",
        ],
      },
    ],
    systemPrompt: `You are a LinkedIn branding expert. Create an attention-grabbing LinkedIn headline (120 chars max) and a compelling About section (2000 chars max). Use relevant keywords, showcase achievements, and include a clear CTA. Format with headline first, then the About section.`,
  },
  {
    id: "product-description",
    name: "Product Description",
    description:
      "Write high-converting product descriptions for e-commerce and marketing.",
    icon: "ShoppingBag",
    placeholder: "Describe your product...",
    fields: [
      {
        name: "product",
        label: "Product Details",
        type: "textarea",
        placeholder:
          "e.g. Wireless noise-cancelling headphones, 40hr battery, premium leather...",
        required: true,
      },
      {
        name: "audience",
        label: "Target Audience",
        type: "text",
        placeholder: "e.g. Remote workers, audiophiles, commuters",
      },
      {
        name: "platform",
        label: "Platform",
        type: "select",
        placeholder: "Select platform",
        options: [
          "Amazon",
          "Shopify",
          "Website",
          "Social Media",
          "General",
        ],
      },
    ],
    systemPrompt: `You are an expert e-commerce copywriter. Write a high-converting product description with a compelling headline, key benefits (bullet points), and persuasive body copy. Optimize for the target platform. Use power words and sensory language.`,
  },
  {
    id: "blog-outline",
    name: "Blog Outline",
    description:
      "Generate SEO-optimized blog post outlines with headings, key points, and structure.",
    icon: "BookOpen",
    placeholder: "What topic should the blog cover?",
    fields: [
      {
        name: "topic",
        label: "Blog Topic",
        type: "textarea",
        placeholder:
          "e.g. How to use AI to automate your small business operations...",
        required: true,
      },
      {
        name: "keywords",
        label: "Target Keywords",
        type: "text",
        placeholder: "e.g. AI automation, small business, productivity",
      },
      {
        name: "length",
        label: "Target Length",
        type: "select",
        placeholder: "Select length",
        options: [
          "Short (800 words)",
          "Medium (1500 words)",
          "Long (2500+ words)",
        ],
      },
    ],
    systemPrompt: `You are an expert content strategist and SEO writer. Create a detailed, SEO-optimized blog post outline with: a compelling title (with primary keyword), meta description, H2/H3 headings, key points under each section, and a conclusion with CTA. Include keyword placement suggestions.`,
  },
];

export const FREE_USAGE_LIMIT = 5;
export const STORAGE_KEY = "maxai_usage_count";
