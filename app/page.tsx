"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Linkedin,
  BookOpen,
  Mail,
  Menu,
  X,
  MoonIcon,
  SunIcon,
  GraduationCap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-label="Toggle theme"
    >
      <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="text-xl font-bold">
            Aritra Mazumder
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {[
              "about",
              "publications",
              "projects",
              "competitive programming",
              "accomplishments",
            ].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b">
            <nav className="flex flex-col space-y-4 p-4">
              {[
                "about",
                "publications",
                "projects",
                "competitive programming",
                "accomplishments",
              ].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        )}
      </header>

      <main className="container px-4 md:px-6 pt-24 pb-16">
        {/* Header/Profile Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-border">
              <AvatarImage src="/profile.jpeg" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">Aritra Mazumder</h1>
              <p className="text-muted-foreground mt-1">
                Incoming PhD Student at University of Utah
              </p>
              <div className="flex items-center gap-2 mt-3">
                <Link
                  href="mailto:aritra741@gmail.com"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
                <Link
                  href="https://github.com/aritra741"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link
                  href="https://linkedin.com/in/aritramazumder"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://scholar.google.com/citations?user=B4zKBFsAAAAJ&hl=en&oi=ao"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  <GraduationCap className="h-5 w-5" />
                  <span className="sr-only">Google Scholar</span>
                </Link>
              </div>
            </div>
          </div>
          {/* Clicking on this button should download the file at public/cv.pdf */}
          <Button
            onClick={() => {
              window.open("/CV.pdf", "_blank");
            }}
          >
            Download CV
          </Button>
        </div>

        {/* About Me Section */}
        <section id="about" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <p>
                I am an incoming PhD student at the University of Utah, where I
                will be joining the UtahDB lab under the supervision of Dr. Anna
                Fariha. With two years of full-time and two years of part-time
                software engineering experience, I have a strong foundation in
                building and optimizing systems. Over the years, I have explored
                research across different domains, but my future focus is on
                data management. I am passionate about solving complex problems
                and developing innovative solutions that push the boundaries of
                data systems.
              </p>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Education</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Ph.D. in Computer Science</div>
                    <div className="text-sm text-muted-foreground">
                      University of Utah, 2025-Present
                    </div>
                  </div>
                  <div>
                    <div className="font-medium">
                      B.Sc. in Computer Science and Engineering
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Shahjalal University of Science and Technology, 2018-2023
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="mb-20 scroll-mt-1">
          <h2 className="text-2xl font-bold mb-6">Publications</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link
                    href="https://link.springer.com/chapter/10.1007/978-3-031-63992-0_25"
                    className="hover:underline"
                  >
                    Exploring Optimal Placement of Head-Based Hierarchical
                    Marking Menus on Smartphones
                  </Link>
                </CardTitle>
                <CardDescription>
                  <span className="font-medium">Venue:</span> EAI MobiQuitous
                  2023
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2"></p>
                <p className="text-sm mb-4">
                  This paper explores optimal placement of hierarchical marking
                  menus for head-based input on smartphones, finding that
                  partial overlap and target-aligned positioning improve
                  selection speed.
                </p>
                <div className="flex gap-2">
                  <Badge>Human-Computer Interaction</Badge>
                  <Badge>Computer Vision</Badge>
                  <Badge>Mobile Computing</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  <Link
                    href="https://aclanthology.org/2023.semeval-1.114/"
                    className="hover:underline"
                  >
                    garNER at SemEval-2023: Simplified Knowledge Augmentation
                    for Multilingual Complex Named Entity Recognition
                  </Link>
                </CardTitle>
                <CardDescription>
                  <span className="font-medium">Venue:</span>
                  <span className="pl-1">SemEval 2023</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2"></p>
                <p className="text-sm mb-4">
                  garNER enhances named entity recognition by augmenting input
                  with Wikipedia summaries, showing benefits when context is
                  relevant but harm when irrelevant.
                </p>
                <div className="flex gap-2">
                  <Badge>Natural Language Processing</Badge>
                  <Badge>Named Entity Recognition</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <Image
                  src={`/findresearch.png`}
                  alt={`Project`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">FindResearch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A research paper recommendation system that uses deep learning
                  to recommend research papers to users based on their
                  interests.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Website</Badge>
                  <Badge variant="outline">BM25 Retrieval</Badge>
                  <Badge variant="outline">AI-Powered Summarization</Badge>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/aritra741/FindResearch.online"
                    className="text-xs text-primary hover:underline"
                  >
                    <Github className="h-3 w-3 inline mr-1" />
                    GitHub
                  </Link>
                  <Link
                    href="https://www.findresearch.online/"
                    className="text-xs text-primary hover:underline"
                  >
                    Demo
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <Image
                  src={`/qualytics.jpg`}
                  alt={`Project`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">Qualytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A VS Code extension that analyzes your codebase's quality
                  metrics and visualizes these metrics
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">VS Code Extension</Badge>
                  <Badge variant="outline">Maintainability Index</Badge>
                  <Badge variant="outline">Cyclomatic Complexity</Badge>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/aritra741/qualytics"
                    className="text-xs text-primary hover:underline"
                  >
                    <Github className="h-3 w-3 inline mr-1" />
                    GitHub
                  </Link>
                  <Link
                    href="https://marketplace.visualstudio.com/items?itemName=aritra741.qualytics"
                    className="text-xs text-primary hover:underline"
                  >
                    Demo
                  </Link>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden">
              <div className="aspect-video relative bg-muted">
                <Image
                  src={`/recursion.jpg`}
                  alt={`Project`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">
                  Dynamic Programming Simulator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  A dynamic programming simulator that allows you to visualize
                  the execution of dynamic programming algorithms
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline">Dynamic Programming</Badge>
                  <Badge variant="outline">Visualization</Badge>
                  <Badge variant="outline">Interactive</Badge>
                </div>
                <div className="flex gap-3">
                  <Link
                    href="https://github.com/aritra741/Dynamic-Programming-Simulator"
                    className="text-xs text-primary hover:underline"
                  >
                    <Github className="h-3 w-3 inline mr-1" />
                    GitHub
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Competitive Programming Section */}
        <section id="competitive programming" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Competitive Programming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contest Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="border-b pb-3">
                    <div className="font-medium">
                      International Collegiate Programming Contest
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ICPC Asia West Finalist (2021)
                    </div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">
                      International Collegiate Programming Contest
                    </div>
                    <div className="text-sm text-muted-foreground">
                      5th in Dhaka Regional, Sylhet Divisional Champion (2021)
                    </div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">Meta Hacker Cup</div>
                    <div className="text-sm text-muted-foreground">
                      Qualified for Round 3, top 1% globally, 1st ever from SUST
                      (2021)
                    </div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">
                      National High School Programming Contest
                    </div>
                    <div className="text-sm text-muted-foreground">
                      National Finalist, 1st in quiz, 6th in programming in the
                      divisional round
                    </div>
                  </li>
                  <li>
                    <div className="font-medium">
                      Codeforces, Codechef, Atcoder
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Multiple times country rank 1
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profiles & Rankings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">Codeforces</div>
                      <div className="text-sm text-muted-foreground">
                        Handle: aritra741
                      </div>
                    </div>
                    <Badge>Max Rating: 1932 (Candidate Master)</Badge>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">LeetCode</div>
                      <div className="text-sm text-muted-foreground">
                        Handle: aritra741
                      </div>
                    </div>
                    <Badge>
                      Max Rating: 2191 (Top 1% globally, top 10 in the country)
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">Codechef</div>
                      <div className="text-sm text-muted-foreground">
                        Handle: aritra741
                      </div>
                    </div>
                    <Badge>6★ (Top 0.1% globally, top 10 in the country)</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="accomplishments" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Accomplishments</h2>
          <div className="space-y-6">
            <Card>
              <CardContent>
                <div className="space-y-6">
                  <div className="mt-6">
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2">•</div>
                        <div>
                          <span className="font-medium">
                            Solved over 3500 problems on online judges
                          </span>{" "}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2">•</div>
                        <div>
                          <span className="font-medium">
                            Top 10 in 4 Inter University Programming Contests
                          </span>{" "}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2">•</div>
                        <div>
                          <span className="font-medium">
                            Top 10 in 10 different language tracks in SemEval
                            2023
                          </span>{" "}
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <div>
                          <span className="font-medium">
                            Regional Finalist, Hult Prize Kathmandu Regionals
                            2022
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Aritra Mazumder. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="mailto:aritra741@gmail.com"
                className="text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
              <Link
                href="https://github.com/aritra741"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://linkedin.com/in/aritramazumder"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://scholar.google.com/citations?user=B4zKBFsAAAAJ&hl=en&oi=ao"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="sr-only">Google Scholar</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
