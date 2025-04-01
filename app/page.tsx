"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Github, Linkedin, BookOpen, Mail, Menu, X, MoonIcon, SunIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"

function ThemeToggle() {
  const { theme, setTheme } = useTheme()

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
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("about")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id") || ""

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex items-center justify-between h-16 px-4 md:px-6">
          <Link href="/" className="text-xl font-bold">
            John Doe
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {["about", "publications", "projects", "competitive", "achievements"].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  activeSection === section ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
            <ThemeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-b">
            <nav className="flex flex-col space-y-4 p-4">
              {["about", "publications", "projects", "competitive", "achievements"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? "text-primary" : "text-muted-foreground"
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
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">John Doe</h1>
              <p className="text-muted-foreground mt-1">Research Scientist & Competitive Programmer</p>
              <div className="flex items-center gap-2 mt-3">
                <Link href="mailto:john.doe@example.com" className="text-muted-foreground hover:text-primary">
                  <Mail className="h-5 w-5" />
                  <span className="sr-only">Email</span>
                </Link>
                <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
                <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary">
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
                <Link
                  href="https://scholar.google.com"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary"
                >
                  <BookOpen className="h-5 w-5" />
                  <span className="sr-only">Google Scholar</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <Button>Download CV</Button>
            <Button variant="outline">Contact Me</Button>
          </div>
        </div>

        {/* About Me Section */}
        <section id="about" className="mb-12 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <p>
                I am a research scientist specializing in machine learning and artificial intelligence. With over 5
                years of experience in the field, I have contributed to various research projects and published papers
                in top-tier conferences and journals.
              </p>
              <p>
                My research interests include deep learning, computer vision, and natural language processing. I am
                passionate about developing innovative solutions to complex problems and advancing the state of the art
                in AI research.
              </p>
              <p>
                In addition to my research work, I am an avid competitive programmer with a strong track record in
                international competitions. I enjoy solving algorithmic challenges and continuously improving my
                problem-solving skills.
              </p>
            </div>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Education</h3>
                <div className="space-y-3">
                  <div>
                    <div className="font-medium">Ph.D. in Computer Science</div>
                    <div className="text-sm text-muted-foreground">Stanford University, 2018-2022</div>
                  </div>
                  <div>
                    <div className="font-medium">M.S. in Computer Science</div>
                    <div className="text-sm text-muted-foreground">MIT, 2016-2018</div>
                  </div>
                  <div>
                    <div className="font-medium">B.S. in Computer Science</div>
                    <div className="text-sm text-muted-foreground">UC Berkeley, 2012-2016</div>
                  </div>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge>Machine Learning</Badge>
                  <Badge>Deep Learning</Badge>
                  <Badge>Python</Badge>
                  <Badge>TensorFlow</Badge>
                  <Badge>PyTorch</Badge>
                  <Badge>C++</Badge>
                  <Badge>Algorithms</Badge>
                  <Badge>Data Structures</Badge>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Publications</h2>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <CardTitle className="text-lg">
                    <Link href="#" className="hover:underline">
                      Novel Approach to Deep Learning for Computer Vision Tasks
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    <span className="font-medium">Authors:</span> John Doe, Jane Smith, Robert Johnson
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Published in International Conference on Computer Vision (ICCV), 202{i}
                  </p>
                  <p className="text-sm mb-4">
                    This paper presents a novel approach to deep learning for computer vision tasks, achieving
                    state-of-the-art results on benchmark datasets.
                  </p>
                  <div className="flex gap-2">
                    <Badge variant="outline">Computer Vision</Badge>
                    <Badge variant="outline">Deep Learning</Badge>
                    <Badge variant="outline">Neural Networks</Badge>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Link href="#" className="text-xs text-primary hover:underline">
                      PDF
                    </Link>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      Code
                    </Link>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      Citation
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="text-center mt-8">
              <Button variant="outline">View All Publications</Button>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video relative bg-muted">
                  <Image
                    src={`/placeholder.svg?height=200&width=400&text=Project+${i}`}
                    alt={`Project ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">Advanced Image Recognition System</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A deep learning-based image recognition system capable of identifying objects with high accuracy in
                    real-time.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline">Computer Vision</Badge>
                    <Badge variant="outline">PyTorch</Badge>
                  </div>
                  <div className="flex gap-3">
                    <Link href="#" className="text-xs text-primary hover:underline">
                      <Github className="h-3 w-3 inline mr-1" />
                      GitHub
                    </Link>
                    <Link href="#" className="text-xs text-primary hover:underline">
                      Demo
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Competitive Programming Section */}
        <section id="competitive" className="mb-20 scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Competitive Programming</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Contest Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="border-b pb-3">
                    <div className="font-medium">Google Code Jam</div>
                    <div className="text-sm text-muted-foreground">Global Finalist (Top 25), 2022</div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">Facebook Hacker Cup</div>
                    <div className="text-sm text-muted-foreground">Round 3 Qualifier, 2021</div>
                  </li>
                  <li className="border-b pb-3">
                    <div className="font-medium">ACM ICPC</div>
                    <div className="text-sm text-muted-foreground">World Finals Participant, 2019</div>
                  </li>
                  <li>
                    <div className="font-medium">Codeforces</div>
                    <div className="text-sm text-muted-foreground">International Grandmaster (Rating: 2700+)</div>
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
                      <div className="text-sm text-muted-foreground">Handle: JohnDoe</div>
                    </div>
                    <Badge>Rank: 42</Badge>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">LeetCode</div>
                      <div className="text-sm text-muted-foreground">Handle: JohnDoe</div>
                    </div>
                    <Badge>Rank: 127</Badge>
                  </div>
                  <div className="flex justify-between items-center border-b pb-3">
                    <div>
                      <div className="font-medium">HackerRank</div>
                      <div className="text-sm text-muted-foreground">Handle: JohnDoe</div>
                    </div>
                    <Badge>6★</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium">AtCoder</div>
                      <div className="text-sm text-muted-foreground">Handle: JohnDoe</div>
                    </div>
                    <Badge>Rating: 2350</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="scroll-mt-20">
          <h2 className="text-2xl font-bold mb-6">Achievements</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Awards & Recognitions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Best Paper Award</h3>
                      <p className="text-sm text-muted-foreground">CVPR 2022</p>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Research Excellence Award</h3>
                      <p className="text-sm text-muted-foreground">Stanford University, 2021</p>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Young Researcher Award</h3>
                      <p className="text-sm text-muted-foreground">AI Conference, 2020</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-3">Other Notable Achievements</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <div>
                          <span className="font-medium">Google Research Grant</span> - Awarded $150,000 for research on
                          advanced machine learning techniques (2022)
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <div>
                          <span className="font-medium">Patent</span> - "Method for Efficient Neural Network Training"
                          (US Patent #12345678, 2021)
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <div>
                          <span className="font-medium">Invited Speaker</span> - International Conference on Machine
                          Learning (ICML), 2022
                        </div>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1">•</div>
                        <div>
                          <span className="font-medium">Program Committee Member</span> - NeurIPS, ICLR, CVPR
                          (2020-Present)
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
              © {new Date().getFullYear()} John Doe. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link href="mailto:john.doe@example.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-4 w-4" />
                <span className="sr-only">Email</span>
              </Link>
              <Link href="https://github.com" target="_blank" className="text-muted-foreground hover:text-primary">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="https://linkedin.com" target="_blank" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="https://scholar.google.com"
                target="_blank"
                className="text-muted-foreground hover:text-primary"
              >
                <BookOpen className="h-4 w-4" />
                <span className="sr-only">Google Scholar</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

