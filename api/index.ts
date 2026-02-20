import type { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<!DOCTYPE html>
<html>
<head>
  <title>skills-badge</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, sans-serif; max-width: 640px; margin: 2rem auto; padding: 0 1rem; }
    code { background: #f1f5f9; padding: 0.2rem 0.4rem; border-radius: 4px; }
    pre { background: #f1f5f9; padding: 1rem; border-radius: 8px; overflow-x: auto; }
    img { margin: 1rem 0; }
    a { color: #3b82f6; }
  </style>
</head>
<body>
  <h1>skills-badge</h1>
  <p>Dynamic SVG badges for <a href="https://skills.sh">skills.sh</a> install counts.</p>
  
  <h2>Usage</h2>
  <pre><code>![skills.sh](https://skills-badge.vercel.app/badge/{owner}/{repo})</code></pre>
  
  <h2>Example</h2>
  <img src="/badge/JungHoonGhae/ships-with-steipete" alt="skills.sh badge">
  <pre><code>![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/ships-with-steipete)</code></pre>
  
  <h2>Options</h2>
  <table>
    <tr><th>Param</th><th>Default</th><th>Description</th></tr>
    <tr><td>style</td><td>flat</td><td>Badge style: flat, flat-square</td></tr>
    <tr><td>label</td><td>skills.sh</td><td>Left side label text</td></tr>
    <tr><td>labelColor</td><td>#3b82f6</td><td>Left side color (hex)</td></tr>
    <tr><td>color</td><td>#22c55e</td><td>Right side color (hex)</td></tr>
  </table>
  
  <p><a href="https://github.com/JungHoonGhae/skills-badge">GitHub</a></p>
</body>
</html>`);
}
