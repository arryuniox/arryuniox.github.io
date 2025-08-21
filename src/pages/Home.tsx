import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bacteria.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding pt-24">
        <div className="container-width">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Biology, bacteria, and{" "}
                <span className="text-primary">badly behaved code.</span>
              </h1>

              <div className="prose prose-lg text-muted-foreground max-w-none">
                <p>
                  Hi, I'm <span className="text-foreground font-medium">Jed</span> — a high school student with a suspicious amount of free time that I tend to funnel into molecular biology, bacterial genomics, and building pipelines that probably shouldn't work but somehow do.
                </p>
                <br />
                <p>
                  I've dabbled in genetically engineering cyanobacteria (yes, the pond scum kind) for carbon sequestration, competed in multiple biology Olympiads (gold medals included), and somehow spent my summer at prestigious SSP studying how bacteria handle stress (arguably more productively and healthily than I do).
                </p>
                <br />
                <p>
                  I also code things when biology gets too wet (although I do prefer wet lab a bit more than dry lab) — machine learning pipelines, genome annotation tools, random Colab scripts that yell at HMMER until it cooperates. My work lives somewhere at the intersection of curiosity, grimdark science fair energy, and the mild chaos of <span className="font-mono text-code-orange">open-source bioinformatics</span>.
                </p>
                <br />
                <p className="text-primary">
                  If you want to talk about molecular genetics, systems biology, or why bacteria are secretly the most metal life forms on Earth, we'll get along.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="gradient-hero">
                  <Link to="/projects">View My Work</Link>
                </Button>
                <Button variant="outline" size="lg" asChild className="hover:border-primary/50">
                  <Link to="/about">More About Me</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="secondary"
                  className="bg-primary/10 hover:bg-primary/20"
                  onClick={() => window.open('/Jed_Lin_Resume_20250813.pdf', '_blank')}
                >
                  Download Resume
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src={heroImage}
                alt="Stylized bacterial and molecular structures"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Highlights */}
      <section className="section-padding bg-secondary/30">
        <div className="container-width">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="text-xl font-semibold">Molecular Biology</h3>
              <p className="text-muted-foreground">
                Engineering cyanobacteria for carbon sequestration and studying bacterial stress response
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="text-xl font-semibold">Bioinformatics</h3>
              <p className="text-muted-foreground">
                Building ML pipelines and genome annotation tools that somehow cooperate
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold">Competitions</h3>
              <p className="text-muted-foreground">
                Multiple biology Olympiad medals and upcoming summer research programs
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;