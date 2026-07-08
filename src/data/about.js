import { imageUrl } from "../utils/imageUrl";

export const aboutData = {
  profile: {
    name: "Cindy Hung",
    subtitle: "Student @NCCU\nTaipei, Taiwan",
    bio: "I love transforming innovative ideas into reality. I’ve dedicated my studies to interdisciplinary learning, aiming to integrate technology and social science to address challenges from a human-centered perspective in our rapidly evolving society ✨ 🌎 🌱"
  },
  photos: [
    { id: 1, src: imageUrl("Innofest2.JPG"), caption: "Innofest Demo 2025" },
    { id: 2, src: imageUrl("Innofest1.JPG"), caption: "Innofest  Exhibition 2025" },
    { id: 3, src: imageUrl("da_final.jpeg"), caption: "NCCU DA 5.0 Final Presentation" }
  ],
  roadmap: [
    {
      id: 1,
      role: "Surface PM Intern",
      company: "Microsoft",
      date: "Jul. 2026 - Present",
      type: "washi-note",
      description: "Directing new Surface products from development to mass production.",
      icon: "server",
      rotation: "rotate-1",
      logoSrc: imageUrl("microsoft-logo.png")
    },
    {
      id: 2,
      role: "Multi-cloud GenAI Security Research & Development Intern",
      company: "Deloitte",
      date: "Feb. 2026 - Jun. 2026",
      type: "postcard",
      description: "Designed and developed an AI-driven multi-cloud (AWS, GCP, Azure) risk assessment platform to streamline cloud security reviews for engineering teams.",
      icon: "grad-cap",
      rotation: "rotate-2",
      logoSrc: imageUrl("deloitte-logo.png")
    },
    {
      id: 3,
      role: "Research Assistant",
      company: "Intelligent Agents & Applications Lab @NCCU (Advisor: Prof. Hsin-Tse Lu)",
      date: "Sep. 2024 - Present",
      type: "torn-paper",
      description: "Exploring hyperbolic embeddings for hierarchical data and developing RAG-based AI tools for industry-academia research.",
      icon: "plane",
      rotation: "-rotate-1"
    },
    {
      id: 4,
      role: "AI Data Generation Intern",
      company: "Acer",
      date: "Jul. 2025 - Aug. 2025",
      type: "washi-note",
      description: "Developed a department-wide AI agent that reduced internal FAQ response times from 24+ hours to under 3 seconds using Power Automate.",
      icon: "server",
      rotation: "rotate-1",
      logoSrc: imageUrl("acer-logo.png")
    }
  ]
};
