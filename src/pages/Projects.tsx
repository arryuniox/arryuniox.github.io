import ProjectCard from "@/components/ProjectCard";
import { getProjects } from "@/lib/cms";

const Projects = () => {
  const projects = getProjects();

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
              <div className="bg-card rounded-lg p-8 max-w-2xl mx-auto">
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
