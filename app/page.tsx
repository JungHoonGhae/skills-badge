"use client"
import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Github, Copy, Check, ExternalLink } from "lucide-react"

const PARAMS = [
  { param: "style", default: "flat", description: "Badge style: flat, flat-square, plastic, for-the-badge, social" },
  { param: "label", default: "skills.sh", description: "Left side label text" },
  { param: "labelColor", default: "#3b82f6", description: "Left side background color (hex)" },
  { param: "color", default: "#22c55e", description: "Right side background color (hex)" },
]

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = React.useState(false)
  
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="relative group">
      <pre className="bg-muted rounded-lg p-4 pr-12 overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </Button>
    </div>
  )
}

function BadgePreview() {
  const [owner, setOwner] = React.useState("JungHoonGhae")
  const [repo, setRepo] = React.useState("ships-with-steipete")
  const [badgeUrl, setBadgeUrl] = React.useState("")
  
  React.useEffect(() => {
    setBadgeUrl(`${window.location.origin}/api/badge/${owner}/${repo}`)
  }, [owner, repo])
  
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="owner"
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
          className="flex-1"
        />
        <Input
          placeholder="repo"
          value={repo}
          onChange={(e) => setRepo(e.target.value)}
          className="flex-1"
        />
      </div>
      <div className="flex items-center justify-center p-8 bg-muted rounded-lg min-h-[80px]">
        {badgeUrl && (
          <img 
            src={badgeUrl} 
            alt="skills.sh badge" 
            className="h-5"
          />
        )}
      </div>
      <CodeBlock code={`![skills.sh](${badgeUrl.replace('/api/badge/', '/api/badge/')})`} />
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <a 
            href="https://skills.sh" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src="https://skills.sh/favicon.ico" 
              alt="skills.sh" 
              className="w-12 h-12 rounded-lg"
            />
          </a>
          <h1 className="text-4xl font-bold tracking-tight">skills-badge</h1>
          <p className="text-muted-foreground text-lg">
            Dynamic SVG badges for{" "}
            <a 
              href="https://skills.sh" 
              className="text-foreground underline underline-offset-4 hover:text-foreground/80 inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              skills.sh
              <ExternalLink className="h-3 w-3" />
            </a>{" "}
            install counts
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Try it</CardTitle>
            <CardDescription>Enter an owner and repo to see a live badge</CardDescription>
          </CardHeader>
          <CardContent>
            <BadgePreview />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock code={`![skills.sh](https://skills-badge.vercel.app/api/badge/{owner}/{repo})`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Query Parameters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 pr-4 font-medium">Param</th>
                    <th className="text-left py-2 pr-4 font-medium">Default</th>
                    <th className="text-left py-2 font-medium">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {PARAMS.map((p) => (
                    <tr key={p.param} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-mono text-xs">{p.param}</td>
                      <td className="py-2 pr-4 text-muted-foreground">{p.default}</td>
                      <td className="py-2 text-muted-foreground">{p.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Custom Styling Example</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CodeBlock code={`![skills.sh](https://skills-badge.vercel.app/api/badge/JungHoonGhae/ships-with-steipete?style=flat-square&label=installs&color=blue)`} />
          </CardContent>
        </Card>

        <footer className="flex justify-center gap-4 pt-8">
          <Button variant="ghost" asChild>
            <a 
              href="https://skills.sh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <img 
                src="https://skills.sh/favicon.ico" 
                alt="skills.sh" 
                className="w-4 h-4"
              />
              skills.sh
            </a>
          </Button>
          <Button variant="ghost" asChild>
            <a 
              href="https://github.com/JungHoonGhae/skills-badge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </footer>
      </div>
    </main>
  )
}
