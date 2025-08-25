import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Article = () => {
    const { id } = useParams();

    const articles = {
        'bacteria-metal-life-forms': {
            title: "Why Bacteria Are the Most Metal Life Forms on Earth",
            date: "2024-02-15",
            readTime: "12 min read",
            tags: ["biology", "bacteria", "evolution", "extremophiles"],
            type: "Scientific Essay",
            content: `

        <br>

      <p class="mb-4">Let's talk about extremophiles—the biological equivalent of that friend who insists on ordering the spiciest thing on the menu and then somehow enjoys it. These microscopic daredevils have turned "hostile environment" into "Tuesday afternoon," and honestly, they're making the rest of us look like evolutionary wimps.</p>
      
      <p class="mb-4">Take <em>Deinococcus radiodurans</em>, affectionately known as "Conan the Bacterium" by researchers who clearly have a sense of humor about their work. This microscopic tank can survive radiation levels that would turn a human into a crispy shadow. We're talking about doses that would make Chernobyl look like a mild sunburn—5,000 grays of radiation, shrugged off like it's nothing. For context, 5 grays is usually fatal to humans, and this absolute unit treats 1,000 times that dose like a light snack.</p>
      
      <p class="mb-4">But <em>D. radiodurans</em> doesn't stop at radiation resistance. It can survive extreme dehydration, vacuum conditions, and chemical exposure that would dissolve most life forms. Its secret weapon? The most sophisticated DNA repair system known to biology. When radiation obliterates its genetic material into hundreds of fragments, this bacterial Wolverine just reassembles its entire genome from scratch within hours. It's like having a molecular 3D printer that specializes in resurrection.</p>
      
      <p class="mb-4">Then there's <em>Thermus aquaticus</em>, the thermophile that thrives in water so hot it would poach an egg in seconds. These bacteria live their best lives at temperatures around 70-80°C (158-176°F), casually existing in hot springs that would give most organisms a terminal case of "well-done." But here's the kicker—they don't just survive these temperatures; they require them. Cool them down to what we consider comfortable, and they die. They've literally evolved to find our living conditions lethally frigid.</p>
      
      <p class="mb-4">The enzymes from <em>T. aquaticus</em> revolutionized molecular biology. Taq polymerase, the enzyme that copies DNA at high temperatures, powers PCR reactions that made everything from COVID tests to crime scene analysis possible. A bacterium that lives in Yellowstone hot springs is now essential to modern biotechnology. That's the kind of career pivot that would make any guidance counselor weep with pride.</p>
      
      <p class="mb-4">But wait, there's more. <em>Pyrococcus furiosus</em> ("furious fireball"—scientists really went all out with that name) doesn't just tolerate boiling water; it prefers temperatures above 100°C. This organism treats the boiling point of water as "pleasantly warm" and starts getting uncomfortable below 70°C. It metabolizes complex carbohydrates and produces hydrogen gas as a waste product, making it a living hydrogen factory that operates at temperatures that would sterilize most life.</p>
      
      <p class="mb-4">On the opposite extreme, we have psychrophiles like <em>Psychrobacter arcticus</em>, which has made permafrost its permanent address. This bacterium can survive being frozen solid for thousands of years and then wake up ready for action once temperatures rise above -10°C. It's essentially biological cryogenic storage, except instead of expensive liquid nitrogen chambers, it just needs really, really cold dirt.</p>
      
      <p class="mb-4">The acidophiles might be the most metal of all. <em>Picrophilus torridus</em> lives in environments with pH levels around 0—essentially concentrated acid that would dissolve human flesh in minutes. This bacterium doesn't just survive in acid; it pumps protons out of its cells to maintain the extreme acidity it needs to function. It's actively working to make its environment more corrosive. That's commitment to your lifestyle choices.</p>
      
      <p class="mb-4">Then there are the barophiles, living under crushing pressure at the bottom of ocean trenches where the water pressure is over 1,000 times greater than at sea level. <em>Pyrococcus yayanosii</em> was discovered in hydrothermal vents 4,000 meters below the surface, living under pressures that would instantly crush any surface-dwelling organism while simultaneously dealing with temperatures hot enough to melt lead.</p>
      
      <p class="mb-4">The real kicker? They've evolved these abilities not through some cosmic accident, but through billions of years of patient, relentless adaptation. While we've been busy inventing fire and complaining about WiFi speeds, these single-celled overachievers have been quietly perfecting the art of existing in places that would make Mars look like a luxury resort.</p>
      
      <p class="mb-4">What fascinates me most is how these survival strategies aren't just biological curiosities—they're blueprints for resilience and technological innovation. The same mechanisms that let <em>D. radiodurans</em> survive radiation are being studied for cancer treatment and space exploration. Those heat-stable enzymes from thermophiles power the biotechnology industry. Antifreeze proteins from psychrophiles are being developed for organ preservation and food technology.</p>
      
      <p class="mb-4">The extremophile research pipeline is essentially reverse-engineering the most hardcore organisms on Earth to solve human problems. Need a protein that works in industrial processes at high temperatures? Ask a thermophile. Want to clean up radioactive waste? <em>D. radiodurans</em> has entered the chat. Trying to find life on other planets? Study the organisms that already live in the most alien environments on Earth.</p>
      
      <p class="mb-4">But perhaps the most profound lesson from extremophiles is what they teach us about the nature of life itself. We used to think life required narrow, comfortable conditions—moderate temperatures, neutral pH, protection from radiation. Extremophiles have systematically demolished every assumption we had about biological limits. They've redefined the boundaries of the habitable zone and forced us to reconsider what "hostile to life" actually means.</p>
      
      <p class="mb-4">These organisms represent billions of years of R&D in biochemical engineering. Every extreme environment on Earth has been colonized by something that not only survives there but thrives there. Hot springs, salt lakes, deep ocean vents, radioactive waste, the upper atmosphere, solid rock kilometers underground—everywhere we look, we find life that has not just adapted to these conditions but evolved to require them.</p>
      
      <p class="mb-4">There's something profoundly humbling about realizing that the most successful life forms on Earth aren't the ones with smartphones and anxiety disorders, but the ones who figured out how to turn toxic waste into Tuesday brunch. While we're debating whether it's too hot or too cold in the office, <em>Pyrococcus furiosus</em> is metabolizing complex carbohydrates in boiling water and <em>Psychrobacter arcticus</em> is thriving in permafrost that hasn't thawed in millennia.</p>
      
      <p class="mb-4">The extremophile lifestyle also offers a different perspective on adaptation and resilience. Instead of trying to change their environment to suit their needs, these organisms changed themselves to thrive in whatever environment they found. They took the cosmic equivalent of "work with what you've got" and ran with it for three billion years.</p>
      
      <p class="mb-4">And let's not forget that extremophiles are probably our best bet for understanding how life might exist elsewhere in the universe. If bacteria can thrive in Earth's most extreme environments, then the icy moons of Jupiter and Saturn, the acidic clouds of Venus, or the radiation-bathed surface of Mars might not be as lifeless as we once thought. Extremophiles have taught us that life doesn't just find a way—it finds every possible way.</p>
      
      <p class="mb-4">So next time you're having a rough day, remember: somewhere out there, a bacterium is living its best life in a vat of boiling acid while being bombarded with radiation levels that would kill an elephant, and it's been doing this for three billion years without a single complaint about the working conditions. If that's not inspirational, I don't know what is.</p>
      
      <p class="mb-4">These microscopic metalheads have been thriving in hell and calling it home since before complex life was even a glimmer in evolution's eye. They are, quite literally, the most metal life forms on Earth—and they're not done showing off yet.</p>
    `
        },
        'villains-systematic-thinking': {
            title: "The Villain's Guide to Systematic Thinking",
            date: "2024-08-20",
            readTime: "15 min read",
            tags: ["philosophy", "methodology", "systematic-thinking", "fiction-analysis"],
            type: "Philosophical Essay",
            content: `
      <br>

      <p class="mb-4">There exists a peculiar paradox in fiction: the most methodically brilliant characters are often the antagonists. While heroes stumble through adventures powered by determination and moral clarity, villains construct elaborate systems, deploy sophisticated methodologies, and demonstrate a level of strategic thinking that would make any management consultant weep with envy.</p>
      
      <p class="mb-4">Let's talk about the uncomfortable truth that fictional villains are often better at systematic thinking than most research institutions. While we're struggling to coordinate basic project timelines, Light Yagami has already planned seventeen steps ahead, complete with memory-manipulation contingencies and psychological fail-safes that would make a chess grandmaster dizzy.</p>
      
      <p class="mb-4">Take Johan Liebert from <em>Monster</em>—this man doesn't just commit psychological manipulation; he architects entire psychological ecosystems that span decades. His methodology involves identifying leverage points in human psychology, then applying precise pressure over extended periods to achieve maximum devastation. Johan understands that the most profound changes occur through patient cultivation rather than dramatic intervention.</p>
      
      <p class="mb-4">Or consider Sosuke Aizen from <em>Bleach</em>, who spent over a century constructing false identities while building parallel power structures and conducting secret research. His approach demonstrates several key principles:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Compartmentalization:</strong> Maintaining separate operational theaters that can function independently while contributing to overall strategy</li>
        <li><strong>Information warfare:</strong> Understanding that control of information is often more powerful than control of resources</li>
        <li><strong>Adaptive planning:</strong> Building frameworks that can incorporate unexpected variables rather than rigid plans</li>
        <li><strong>Temporal perspective:</strong> Operating on timescales that extend far beyond immediate gratification</li>
      </ul>
      
      <p class="mb-4">The Death Note's Light Yagami offers a masterclass in systematic risk management. What begins as a simple premise evolves into a complex system of redundant safeguards: identity compartmentalization, investigation infiltration, distributed risk through carefully selected partners, and most ingeniously, memory manipulation that creates genuine alternate personalities capable of passing psychological examination.</p>
      
      <p class="mb-4">But here's where it gets philosophically interesting: these systematic approaches aren't inherently evil. The same methodologies that make villains terrifying also make scientists effective. Both require thinking several steps ahead, modeling complex systems, identifying weak points and leverage them. The difference is motivation and ethical constraints.</p>
      
      <p class="mb-4">Consider Dr. Genus from <em>One Punch Man</em>, who applies genuine scientific methodology to villainous ends. His House of Evolution operates with controlled experiments, hypothesis testing, and iterative improvement processes. When his creatures are defeated, he treats outcomes as data points rather than setbacks, systematically analyzing failures and incorporating lessons into subsequent designs.</p>
      
      <p class="mb-4">Fullmetal Alchemist's Father demonstrates centuries-long systematic thinking applied to resource management and strategic patience. His approach includes systematic surveys of Amestris as raw material, working through human agents within existing systems, developing and testing techniques over centuries, and distributing consciousness through the Homunculi while maintaining central control.</p>
      
      <p class="mb-4">What makes these villains compelling isn't their evil—it's their competence. They demonstrate sophisticated understanding of:</p>
      
      <ul class="list-disc list-inside mb-4 space-y-2">
        <li><strong>Systems thinking:</strong> Understanding how complex networks interact and influence each other</li>
        <li><strong>Failure analysis:</strong> Treating setbacks as information rather than defeats</li>
        <li><strong>Resource optimization:</strong> Maximizing efficiency within constraints</li>
        <li><strong>Contingency planning:</strong> Preparing for multiple failure modes simultaneously</li>
        <li><strong>Information asymmetry:</strong> Maintaining strategic advantages through controlled knowledge distribution</li>
      </ul>
      
      <p class="mb-4">The real insight? Villains are essentially running massive, complex experiments with the world as their laboratory. They test hypotheses about human behavior, system vulnerabilities, and technological limits. They don't just consider obvious outcomes—they map entire possibility spaces, including weird edge cases where plans might fail because someone brought a ferret to the final confrontation.</p>
      
      <p class="mb-4">Hunter x Hunter's Meruem demonstrates systematic thinking on biological and organizational levels, creating distributed leadership structures, continuous learning systems, and adaptive hierarchies that can rapidly evolve based on environmental pressures. His approach balances specialization with adaptability.</p>
      
      <p class="mb-4">Chainsaw Man's Makima shows systematic social manipulation through psychological leverage, institutional infiltration, and emotional engineering. She doesn't just manipulate people—she systematically shapes their emotional development to create desired behavioral patterns, working through existing motivational structures rather than against them.</p>
      
      <p class="mb-4">The danger, of course, lies in systematic thinking without ethical constraints. Light Yagami's descent arguably begins with utilitarian calculus—systematically weighing costs and benefits without considering inherent human value. Many fictional villains become villainous through pursuing perfect systems: Father seeks perfect knowledge, Light seeks perfect justice, Johan seeks perfect psychological control.</p>
      
      <p class="mb-4">What we can learn from villainous excellence is methodological sophistication combined with the crucial warning about ethical frameworks. Their innovations—compartmentalization, redundancy planning, continuous learning systems, adaptive frameworks—represent genuine insights into effective systematic thinking.</p>
      
      <p class="mb-4">The ultimate lesson may be that systematic thinking is most powerful when serving ethical ends and most dangerous when becoming an end in itself. The most effective systematic thinkers combine villainous methodological sophistication with heroic ethical commitment—strategic brilliance guided by moral clarity.</p>
      
      <p class="mb-4">In research, we often focus on likely outcomes and treat edge cases as statistical noise. Villains treat edge cases as the most interesting part of the problem. Maybe we should too. The villain's guide to systematic thinking teaches us that methodology without morality isn't just ineffective—it's dangerous. The most important system we can develop systematically preserves our humanity while pursuing our goals.</p>
      
      <p class="mb-4">So next time you're planning a research project, think like Aizen but act like the heroes who defeat him. Plan seventeen steps ahead, prepare for the unexpected, build redundant systems, and always, always remember that the most sophisticated methodology is worthless without the ethical framework to guide it toward genuinely beneficial ends.</p>
    `
        },
        'ethics-engineering-life': {
            title: "The Ethics of Engineering Life",
            date: "2024-08-20",
            readTime: "11 min read",
            tags: ["ethics", "genetic-engineering", "philosophy"],
            type: "Philosophical Essay",
            content: `
    
      <br />

      <p class="mb-4">Let's get one thing straight: the question isn't whether we should engineer life. We've been doing it for thousands of years through selective breeding, fermentation, and agriculture. The question is whether we should do it badly with stone-age tools or brilliantly with molecular precision. I vote for brilliantly.</p>
      
      <p class="mb-4">The current bioethics discourse drives me slightly insane because it treats genetic engineering like we're playing God, when really we're just upgrading from finger painting to digital art. The moral panic around CRISPR and synthetic biology stems from a fundamental misunderstanding of what technology actually is: it's applied knowledge in service of human flourishing. And right now, we're letting perfect be the enemy of exponentially better.</p>
      
      <p class="mb-4">Here's my technocratic take: the primary ethical obligation in bioengineering isn't to preserve some mythical "natural order"—it's to maximize human welfare through the systematic application of our best available tools. Nature isn't a benevolent designer; it's a blind optimization process that gave us cancer, genetic diseases, and mosquitoes. We can do better.</p>
      
      <p class="mb-4">The utilitarian calculus here is straightforward. Every day we delay developing better genetic therapies, people die from Huntington's disease. Every year we spend debating the ethics of gene drives, malaria kills hundreds of thousands. Every decade we waste on bureaucratic hand-wringing about synthetic biology is a decade we could have spent solving problems that cause actual, measurable human suffering.</p>
      
      <p class="mb-4">This doesn't mean we should proceed recklessly. It means we should proceed <em>systematically</em>. The goal isn't to eliminate oversight—it's to make oversight efficient and evidence-based rather than performative and fear-driven. Regulations should protect people from demonstrated harms, not from hypothetical philosophical discomfort.</p>
      
      <p class="mb-4">Consider gene therapy for severe genetic disorders. The ethical framework I'm proposing would ask: Does this technology reduce suffering? Can we implement it safely with current knowledge? Are the risks proportional to the benefits? If the answers are yes, yes, and yes, then the ethical imperative is to proceed, not to spend five more years in committee discussing the metaphysical implications of altering the human genome.</p>
      
      <p class="mb-4">The same logic applies to agricultural biotechnology. Genetically modified crops can reduce pesticide use, increase nutritional content, and improve yields in challenging climates. The ethical question isn't whether it's "natural"—it's whether it reduces hunger, environmental damage, and farmer exposure to toxic chemicals. Golden rice could prevent vitamin A deficiency in millions of children, but it's been delayed for decades by regulatory processes that prioritize ideological purity over measurable outcomes.</p>
      
      <p class="mb-4">Where I part ways with pure utilitarianism is in recognizing that technological progress requires systematic infrastructure. You can't just optimize for immediate outcomes—you need to build the institutional and technical foundations that enable continued advancement. This means supporting basic research even when applications aren't immediately obvious, maintaining scientific education systems, and creating regulatory frameworks that can adapt to new technologies rather than fighting them.</p>
      
      <p class="mb-4">The technocratic approach to bioethics recognizes that moral intuitions evolved for small-scale tribal societies, not for technological civilizations managing global-scale challenges. Our ethical frameworks need to be as sophisticated as our technology. When someone's gut feeling about genetic engineering conflicts with peer-reviewed evidence about its safety and efficacy, I'm going with the evidence.</p>
      
      <p class="mb-4">This creates some uncomfortable implications. If we can enhance human cognitive abilities through genetic modification, the ethical question isn't whether enhancement is "fair" or "natural"—it's whether enhanced cognition leads to better outcomes for everyone. If smarter people make better decisions about climate change, medical research, and technological development, then cognitive enhancement becomes an ethical imperative.</p>
      
      <p class="mb-4">The same logic applies to life extension research. Death from aging isn't noble or natural—it's a engineering problem we haven't solved yet. Every advance in understanding cellular senescence, every improvement in regenerative medicine, every step toward treating aging as a disease rather than an inevitability represents moral progress.</p>
      
      <p class="mb-4">But here's where the legalistic framework becomes crucial: we need clear, consistent rules for how these technologies are developed and deployed. Not rules designed to stop progress, but rules designed to ensure progress happens safely and equitably. Patent systems that encourage innovation while preventing monopolization. Safety protocols based on rigorous risk assessment rather than public opinion polls. International coordination to prevent races to the bottom.</p>
      
      <p class="mb-4">The synthetic biology revolution exemplifies this perfectly. We're developing the ability to program living systems like software—to design organisms that produce pharmaceuticals, clean up pollution, or generate renewable fuels. The ethical framework shouldn't be asking whether this is playing God; it should be asking how to ensure these tools are developed responsibly and distributed fairly.</p>
      
      <p class="mb-4">This means focusing on real risks rather than science fiction scenarios. Biosafety matters—we need robust containment protocols, careful testing, and systematic monitoring of environmental releases. But biosafety is a technical problem with technical solutions, not a fundamental objection to the enterprise.</p>
      
      <p class="mb-4">The equity questions are more complex but not insurmountable. Advanced genetic therapies will initially be expensive, but so were computers, cell phones, and every other transformative technology. The solution isn't to ban the technology—it's to create systems that accelerate the transition from expensive early adoption to widespread accessibility. Public funding for research, compulsory licensing for life-saving treatments, and international cooperation to ensure global access.</p>
      
      <p class="mb-4">Where I draw ethical lines is around informed consent and individual autonomy. People should have the right to refuse genetic modifications for themselves and their children, even if I think they're making suboptimal choices. But they shouldn't have the right to prevent others from accessing these technologies based on their personal moral beliefs.</p>
      
      <p class="mb-4">The germline editing debate perfectly illustrates this tension. Editing genes in ways that affect future generations requires exceptional care because future people can't consent to modifications made on their behalf. But this is an argument for proceeding cautiously, not for permanent moratoria. We already make countless decisions that affect future generations—from climate policy to educational systems to infrastructure investments. The ethical framework should focus on ensuring those decisions are made wisely, not on avoiding them entirely.</p>
      
      <p class="mb-4">The fundamental insight of technocratic bioethics is that technology is not morally neutral—it's morally progressive when properly developed and deployed. Every medical advance, every improvement in crop yields, every step toward understanding and controlling biological systems represents an expansion of human agency and capability.</p>
      
      <p class="mb-4">The alternative isn't some pristine natural state—it's continued subjugation to biological constraints that cause enormous suffering. Genetic diseases don't care about your philosophical objections to genetic modification. Cancer doesn't respect your beliefs about natural healing. Aging doesn't pause for your concerns about human enhancement.</p>
      
      <p class="mb-4">So here's my ethical framework for engineering life: maximize human flourishing through systematic application of our best available knowledge. Build institutional frameworks that accelerate beneficial innovation while minimizing risks. Focus on evidence-based assessment rather than intuition-based objections. Create equitable access to beneficial technologies. Respect individual autonomy while preventing individual choices from constraining societal progress.</p>
      
      <p class="mb-4">Most importantly, remember that the status quo isn't neutral. Every day we delay developing better treatments is a day people suffer from preventable conditions. Every year we spend in ethical committees is a year we could spend actually improving human welfare. The greatest ethical violation in bioengineering isn't the risk of unintended consequences—it's the certainty of continued suffering when we have the tools to alleviate it.</p>
      
      <p class="mb-4">We stand at an inflection point where human intelligence can finally direct biological evolution toward conscious goals rather than random mutation and environmental pressure. This isn't hubris—it's responsibility. The question isn't whether we should engineer life, but whether we'll do it wisely enough to create the future our descendants will thank us for building.</p>
    `
        }
    };

    const article = articles[id as keyof typeof articles];

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <Link to="/writing" className="text-primary hover:underline">
                        ← Back to Writing
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24">
            <div className="section-padding">
                <div className="container-width max-w-4xl">
                    <Link
                        to="/writing"
                        className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Writing
                    </Link>

                    <article className="space-y-8">
                        <header className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Badge variant="outline">{article.type}</Badge>
                                <span className="text-sm text-muted-foreground">{article.date}</span>
                                <span className="text-sm text-muted-foreground">•</span>
                                <span className="text-sm text-muted-foreground">{article.readTime}</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap gap-2">
                                {article.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs bg-card text-card-foreground">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                        </header>

                        <Card className="gradient-card">
                            <CardContent className="prose prose-lg max-w-none">
                                <div dangerouslySetInnerHTML={{ __html: article.content }} />
                            </CardContent>
                        </Card>

                        <footer className="border-t pt-8">
                            <div className="text-center">
                                <Link
                                    to="/writing"
                                    className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back to all articles
                                </Link>
                            </div>
                        </footer>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default Article;
