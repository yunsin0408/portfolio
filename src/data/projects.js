export const projectsData = {
  mealmind: {
    slug: "mealmind",
    title: "Mealmind",
    spineLabel: "MEALMIND",
    description: "An AI recipe generation application to reduce food waste through database management.", // Main description
    playlistLabel: "AI",
    releaseYear: 2026,
    status: "Ongoing",
    coverImage: "assets/images/cd covers/mealmind_cd.png",
    image: "/assets/images/mealmind_cover.png",
    // HomeView layout styling
    rotation: "rotate-3",
    zIndex: 20,
    top: "0",
    // ProjectsView layout styling
    projectsViewRotation: "rotate-2",
    projectsViewZIndex: 20,
    left: "40%",
    projectsViewTop: "18%",
    // ProjectDetail metadata
    subtitle: "An AI-powered personal chef designed to eliminate decision fatigue and reduce food waste.",
    problem: "Home cooks often face decision fatigue and food waste when dealing with a random assortment of ingredients in their fridge. Traditional recipe sites are static and struggle to provide creative, safe, and appetizing solutions for users with specific dietary restrictions or limited inventory. MealMind addresses this by using AI to bridge the gap between \"what's left in the kitchen\" and a structured, personalized meal plan.",
    approach: [{title: "Large Language Model Integration: ",
      detail:"Implemented prompt engineering to convert natural language \"fridge-clearing\" queries into professional culinary instructions."},
      {
      title: "Constraint-Based Logic: ",
      detail: "Developed a system to strictly filter and handle complex dietary restrictions and allergen exclusions."
    }, {
      title: "Structured Output: ",
      detail: "Engineered the backend to provide consistent data schemas for recipe steps, ingredient lists, and nutritional estimates."
    }],
    stack: "Python, Flask, SQL, Hugging Face, HTML/CSS",
    outcome: "Developed a full-stack AI assistant that successfully transforms static pantry data into dynamic, waste-reducing meal plans. This platform delivers real-time, LLM-generated recipes that prioritize expiring ingredients, effectively lowering household food waste. The end system outperforms traditional search engines by using natural language reasoning to provide creative ingredient substitutions and navigate dietary restrictions.",
    //Media Links
    repoUrl: "https://github.com/yunsin0408/mealmind",
    appUrl: "https://mealmind-five.vercel.app/",
    demoUrl: "https://youtu.be/lWiCT5hijUI",
  },

  isoogle: {
    slug: "isoogle",
    title: "ISOOGLE!",
    spineLabel: "ISOOGLE!",
    description: "Multi-stage search engine for ISO queries with keyword, iterative, and semantic modes.",
    playlistLabel: "Tech",
    releaseYear: 2025,
    status: "Completed",
    coverImage: "assets/images/cd covers/isoogle_cd.png",
    image: "/assets/images/ISOOOGLE_cover.png",
    // HomeView
    rotation: "-rotate-2",
    zIndex: 10,
    top: "2rem",
    // ProjectsView
    projectsViewRotation: "rotate-6",
    projectsViewZIndex: 30,
    left: "65%",
    projectsViewTop: "35%",
    // ProjectDetail metadata
    subtitle: "A multi-stage search engine for ISO queries featuring keyword, iterative, and semantic modes.",
    problem: "\"ISO\" is a term used in both global industry standards and photography, so search engines often mix them up and return the wrong results. ISOOGLE! focuses on better-distinguishing these disparate applications to make sure users find the specific ISO data they'relooking for.",
    approach: [{
      title: "Keyword Search: ",
      detail: "Uses Google CSE with keyword frequency ranking"
    }, {
      title: "Iterative Search: ",
      detail: "Extracts and expands keywords for broader results"
    }, {
      title: "Semantic Search: ",
      detail: "Combines keyword frequency with cosine similarity ranking"
    }],
    stack: "Java, Spring Boot, Lucene, Google CSE API, Jsoup, Maven",
    outcome: [
      {
        heading: "Key Impacts & Outcomes"
      },
      {
        title: "Photographic Noise Filtering",
        detail: "Successfully filtered out \"photographic noise\" (e.g., ISO 6400) to prioritize results from the International Organization for Standardization."
      },
      {
        title: "Hybrid Scoring Architecture",
        detail: "Developed a scoring system combining Keyword Weights (60%) and TF Cosine Semantic Similarity (40%) to refine result relevance."
      },
      {
        title: "Iterative Query Expansion",
        detail: "Automated the extraction of derived keywords from initial results to increase retrieval depth and accuracy."
      },
      {
        title: "Competitive Performance",
        detail: "Achieved consistent Top-1 accuracy for standard-related queries, performing on par with or exceeding general LLM benchmarks in domain-specific categorization."
      }
    ],
    //Media Links
    embedUrl: "https://www.canva.com/design/DAHFNlmCd8Y/0aPIQxthBl0xEo-TQmDk4Q/view?embed",
    repoUrl: "https://github.com/yunsin0408/ISOOGLE",
    pdfUrl: "assets/reports/ISOOGLE!.pdf",
    demoUrl: "https://youtu.be/zYKSYUyIiPY",
  },

  data_analysis: {
    slug: "data_analysis",
    title: "AeroLoyalty: Membership Churn & Retention Analytics",
    spineLabel: "AeroLoyalty",
    description: "End-to-end exploratory and statistical analysis.",
    playlistLabel: "Data Analytics",
    releaseYear: 2025,
    status: "Completed",
    coverImage: "assets/images/cd covers/airline_cd.png",
    image: "/assets/images/da_cover.png",
    // HomeView
    rotation: "rotate-1",
    zIndex: 30,
    top: "-1rem",
    // ProjectsView
    projectsViewRotation: "-rotate-3",
    projectsViewZIndex: 10,
    left: "10%",
    projectsViewTop: "5%",
    // ProjectDetail metadata
    subtitle: "End-to-end exploratory and statistical analysis with proposed retention strategy.",
    problem: "This project investigates customer attrition within an airline's loyalty program.",
    approach: "By analyzing a dataset of 400k+ flight records and 16k+ members, we developed a predictive understanding of member lifecycles. The goal was to transform raw behavioral data into a segmented retention strategy.",
    stack: "Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-learn, Power BI",
    outcome: [{
      heading: "Business Insights & Strategy",
      title: "The \"First Flight\" Nudge: ",
      detail: "Automated incentives triggered at Month 4 for members with zero redemptions."
    }, {
      title: "Seasonal Capacity Optimization: ",
      detail: "Using \"Off-Peak\" (Spring/Autumn) point multipliers to drive engagement without sacrificing high-deman"
    }, {
      title: "RFM-Based Targeting: ",
      detail: "Prioritizing retention spend on \"Core Stable\" members who provide the highest ROI for loyalty intervention."
    }
    ],
    //Media Links
    embedUrl: "https://www.canva.com/design/DAHE9BteEI4/Q8iOPcBRuGlZ8yjnoukXGw/view?embed",
    repoUrl: "https://github.com/yunsin0408/AeroLoyalty-Membership-Churn-Retention-Analytics",
    pdfUrl: "assets/reports/airline_report.pdf",
    datasetUrl: "https://www.kaggle.com/datasets/agungpambudi/airline-loyalty-campaign-program-impact-on-flights/data/code",
  },

  "Tawu and Taiya Totem Identifier": {
    slug: "Tawu and Taiya Totem Identifier",
    title: "Tawu and Taiya Totem Identifier",
    spineLabel: "Image Classifier",
    description: "An image classifier for aboriginal totems of indigenous tribes in Taiwan. ",
    playlistLabel: "ML",
    releaseYear: 2024,
    status: "Completed",
    coverImage: "assets/images/cd covers/identifier_cd.png",
    image: "", // Placeholder image
    rotation: "-rotate-4",
    zIndex: 5,
    top: "3rem",
    // ProjectDetailView
    subtitle: "This project uses AI to recognize and classify totems from the Tawu (達悟族) and Taiya (泰雅族) indigenous tribes of Taiwan. The goal of this project is to help preserve and promote Taiwanese indigenous cultures by developing a machine learning model capable of identifying these totems.",
    problem: "The use of indigenous totems involve cultural and intellectual property rights. Some totems may be subject to copyright laws, while others may represent cultural heritage that is collectively owned by indigenous communities. Throughout the development of this project, we have made efforts to respect these rights and recommend seeking proper authorization and engaging with relevant indigenous groups or cultural organizations to ensure lawful and respectful use of these symbols. This project aims to promote cultural awareness and preservation while honoring the rights of indigenous peoples.",
    approach: "Employed a custom Convolutional Neural Network (CNN) alongside a pre-trained ResNet50V2 model for transfer learning. The dataset includes 93 images (63 from Tawu and 30 from Taiya), with data augmentation techniques used to expand the dataset and improve model robustness.",
    stack: "Python, TensorFlow, Keras, scikit-learn",
    outcome: "The model achieved an accuracy rate of 90% in classifying totems found in various contexts, including artwork on walls, clothing, and other surfaces, highlighting the potential of AI as a valuable tool for cultural conservation.",
    repoUrl: "https://github.com/yunsin0408/tribestotem",
  }
};
