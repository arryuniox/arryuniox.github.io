import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const About = () => {
  const [mode, setMode] = useState<"serious" | "chaotic">("serious");

  const achievements = [
    "Canadian and British Biology Olympiad gold medalist and USABO semifinalist",
    "Summer Science Program (SSP) acceptance - bacterial stress research",
    "Gold medal at Toronto Science Fair for the genetic engineering of cyanobacteria to sequester carbon",
    "ML-powered bacterial morphology prediction pipelines",
    "Genome annotation tools using HMMER and Pfam databases",
    "BacDive + NCBI datascraper workflow automation"
  ];

  const chaoticFacts = [
    "Built a villain manifesto for fun (purely theoretical, I promise)",
    "Probably reads more NCBI documentation than is medically advisable",
    "Once spent 3 days debugging a pipeline only to find a missing comma",
    "Maintains that cyanobacteria are the most underrated organisms on Earth",
    "Can explain why pond scum might save the world (with charts)",
    <>Writes <a href='https://allpoetry.com/Arryuniox' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 underline'>emo poetry</a> and fiction on the side (don't ask)</>,
    <>Has a <a href='https://www.youtube.com/@jeddrumz' target='_blank' rel='noopener noreferrer' className='text-blue-400 hover:text-blue-300 underline'>Youtube channel</a> where they post very poorly edited drum videos</>
  ];

  return (
    <div className="min-h-screen pt-24">
      <div className="section-padding">
        <div className="container-width max-w-4xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                About <span className="text-primary">Jed</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                High school student at the intersection of molecular biology and computational chaos
              </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center">
              <div className="bg-secondary rounded-lg p-1 flex gap-1">
                <Button
                  variant={mode === "serious" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("serious")}
                  className={mode === "serious" ? "gradient-hero" : ""}
                >
                  Serious Mode
                </Button>
                <Button
                  variant={mode === "chaotic" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setMode("chaotic")}
                  className={mode === "chaotic" ? "gradient-hero" : ""}
                >
                  Chaotic Mode
                </Button>
              </div>
            </div>

            {/* Content based on mode */}
            {mode === "serious" ? (
              <div className="space-y-8">
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Academic Background</CardTitle>
                    <CardDescription>
                      Research experience and achievements in molecular biology and bioinformatics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg text-muted-foreground max-w-none">
                      <p>
                        I'm a high school student with a passion for understanding life at the molecular level.
                        My research focuses on bacterial genomics, particularly engineering cyanobacteria for
                        carbon sequestration and developing computational tools for genome analysis.
                      </p>
                      <br />
                      <p>
                        Through various biology competitions and research programs, I've gained hands-on
                        experience with both wet lab techniques and bioinformatics pipelines. I'm particularly
                        interested in the intersection of systems biology and machine learning.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Fun Stuff I Do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="text-primary mt-1">▸</span>
                          <span className="text-foreground">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <div className="space-y-8">
                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle className="text-primary">The Unfiltered Version</CardTitle>
                    <CardDescription>
                      Because competence and chaos aren't mutually exclusive
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-lg text-muted-foreground max-w-none">
                      <p>
                        Look, I'm good at science, but I'm also the kind of person who would name bacterial strains
                        after my favorite fictional villains and writes git commit messages like "fixed the thing that
                        was making the other thing angry."
                      </p>
                      <br />
                      <p>
                        I approach research with what I call "grimdark science fair energy" — deadly serious
                        about the work, but fully aware that I'm just a teenager who's still just trying to figure things out.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="gradient-card">
                  <CardHeader>
                    <CardTitle>Fun Facts & Questionable Decisions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {chaoticFacts.map((fact, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <span className="text-code-orange mt-1">✗</span>
                          <span className="text-foreground">{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Current Focus */}
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Currently Working On</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Research</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Bacterial stress response mechanisms</li>
                      <li>• Cyanobacteria genetic engineering</li>
                      <li>• ML models for genomic annotation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Technical</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Python bioinformatics pipelines</li>
                      <li>• Database integration workflows</li>
                      <li>• Making HMMER less temperamental</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;