import ProjectCard from "@/components/ProjectCard";
import { describe } from "node:test";

const Projects = () => {
  const projects = [
    {
      title: "Stress Response Genomic Analysis",
      description: "How bacteria handle existential crises",
      details: "Characterizing the Development and Mechanisms of Gentamicin Resistance Using Facilitated Evolutionary Pressures and Bioinformatic Analysis. Focuses on understanding how bacteria adapt to stressors and develop resistance, using comparative genomics and experimental evolution techniques.",
      tags: ["genomics", "bioinformatics", "stress-response", "research"],
      liveUrl: "https://drive.google.com/file/d/1n1Zzs-8UjfhNu5X_twqsHfKzrS0Z5iNC/view?usp=sharing"
    },
    {
      title: "Cyanobacteria Carbon Sequestration",
      description: "Genetically engineering pond scum to save the world",
      details: "Engineering cyanobacteria strains for enhanced carbon fixation and survival in varying environmental conditions. Involves genetic modifications, stress testing, and optimization of metabolic pathways. Because if bacteria can survive almost anything, why not put them to work?",
      tags: ["genetic-engineering", "cyanobacteria", "carbon-sequestration", "wet-lab"],
      liveUrl: "https://drive.google.com/file/d/1MpC7DxTRs0efBWmQ740AW4Rru5MRnHfe/view?usp=sharing",
    },
    {
      title: "Canadian High School Big Data Challenge",
      description: "Analyzing large datasets to uncover hidden patterns",
      details: "A Geospatial Approach to Identifying Optimal Adolescent Mental Health Service Locations in Toronto. Utilized Python and GIS tools to analyze demographic and health data, identifying gaps in mental health service coverage for adolescents in Toronto.",
      tags: ["machine-learning", "python", "gis", "mental-health"],
      liveUrl: "https://drive.google.com/file/d/1XdS68MN-sOnBwD9XHXHOjPuxw80i-sNA/view?usp=sharing",
    },
    {
      title: "Genome Annotation Pipeline",
      description: "Making HMMER and GUI cooperate",
      details: "Automated pipeline for bacterial genome annotation using HMMER for protein domain identification. Features error handling for when bioinformatics tools decide to have opinions, and extensive logging for debugging sessions that last until 3 AM.",
      tags: ["python", "bioinformatics", "hmmer", "pfam", "genome-analysis"],
      githubUrl: "https://github.com/arryuniox/i-got-tired-of-using-cli",
    },
    {
      title: "Bacterial Morphology ML Predictor",
      description: "Teaching machines to recognize bacterial shapes",
      details: "Machine learning model that predicts bacterial morphology and characteristics from genomic data, integrating BacDive database with NCBI resources. Trained on thousands of bacterial profiles because apparently I enjoy teaching computers to identify microscopic life forms.",
      tags: ["machine-learning", "python", "bacdive", "ncbi", "morphology"],
      githubUrl: "https://github.com/arryuniox/bacdive-morphology-predictor",
    },
    {
      title: "NCBI + BacDive Workflow Automation",
      description: "Automating the tedious parts of bioinformatics",
      details: "Automated data pipeline that pulls bacterial information from NCBI and BacDive databases, processes it through various analysis tools, and generates standardized reports. Saves approximately 47 hours per week that would otherwise be spent manually copying data between databases.",
      tags: ["automation", "databases", "ncbi", "bacdive", "data-processing"],
      githubUrl: "https://github.com/arryuniox/bacdive-morphology-predictor",
    },
    {
      title: "Random Writing Projects",
      description: "A collection of stories, poems, and world-building exercises",
      details: "Emo and cringe, but occasionally insightful and reflective. Read at your own risk. Advice is much appreciated.",
      tags: ["creative-writing", "analysis", "definitely-not-emo"],
      liveUrl: "https://linktr.ee/arryuniox",
    },
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="section-padding">
        <div className="container-width">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                Projects & <span className="text-primary">Research</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                A collection of experiments, pipelines, and questionable decisions at the intersection
                of biology and code. Most of these somehow work despite my best efforts.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {projects.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>

            <div className="text-center">
              <div className="bg-secondary rounded-lg p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold mb-3">More Projects Coming Soon</h3>
                <p className="text-muted-foreground">
                  Currently yelling at various bioinformatics tools to cooperate.
                  New projects will appear here once they achieve basic functionality
                  and stop throwing mysterious errors.
                </p>
                <p className="text-sm text-primary mt-3 font-mono">
                  git status: probably broken but enthusiastically so
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;