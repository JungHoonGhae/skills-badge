# skills-badge

[![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/skills-badge?style=flat-square&label=installs)](https://skills.sh/JungHoonGhae/skills-badge)
[![GitHub stars](https://img.shields.io/github/stars/JungHoonGhae/skills-badge)](https://github.com/JungHoonGhae/skills-badge/stargazers)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/JungHoonGhae/skills-badge/blob/main/LICENSE)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://skills-badge.vercel.app)

| [<img alt="GitHub Follow" src="https://img.shields.io/github/followers/JungHoonGhae?style=flat-square&logo=github&labelColor=black&color=24292f" width="156px" />](https://github.com/JungHoonGhae) | Follow [@JungHoonGhae](https://github.com/JungHoonGhae) on GitHub for more projects. |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [<img alt="X link" src="https://img.shields.io/badge/Follow-%40lucas_ghae-000000?style=flat-square&logo=x&labelColor=black" width="156px" />](https://x.com/lucas_ghae)                             | Follow [@lucas_ghae](https://x.com/lucas_ghae) on X for updates.                     |

Dynamic SVG badges for [skills.sh](https://skills.sh) install counts.

> **Disclaimer**: This is an independent tool. It is not affiliated with, endorsed by, or sponsored by skills.sh. skills.sh™ is a trademark of its respective owners.

## About

skills.sh shows install counts for AI agent skills. This service generates dynamic SVG badges you can embed in READMEs, profiles, or anywhere that supports images.

**What it does:**
- Fetches install counts from skills.sh
- Returns shields.io-compatible SVG badges
- Supports multiple badge styles

## Support

If this tool helps you, consider supporting its maintenance:

<a href="https://www.buymeacoffee.com/lucas.ghae">
  <img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" height="50">
</a>

## Features

- 📊 **Live counts** — Real-time install numbers from skills.sh
- 🎨 **Multiple styles** — flat, flat-square, plastic, for-the-badge, social
- 🎯 **Custom colors** — Customize label and message colors
- ⚡ **Fast** — Deployed on Vercel Edge

## Usage

### Basic

```markdown
![skills.sh](https://skills-badge.vercel.app/badge/{owner}/{repo})
```

### Example

```markdown
![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/ships-with-steipete)
```

## Options

| Query Param | Default   | Description                                                    |
| ----------- | --------- | -------------------------------------------------------------- |
| `style`       | `flat`      | Badge style: `flat`, `flat-square` |
| `label`       | (empty)     | Left side label text (shows logo only if empty)                |
| `labelColor`  | `#3b82f6`   | Left side background color (hex)                               |
| `color`       | `#22c55e`   | Right side background color (hex)                              |
| `logo`        | `true`      | Show Vercel logo (`false` to hide)                             |

### Custom Styling

```markdown
![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/ships-with-steipete?style=flat-square&label=installs&color=blue)
```

## Deploy Your Own

```bash
git clone https://github.com/JungHoonGhae/skills-badge
cd skills-badge
npm install
vercel
```

## How It Works

1. Fetches the skills.sh page for the given owner/repo
2. Parses the HTML to extract the install count
3. Falls back to "available" if count cannot be fetched
4. Returns an SVG badge in shields.io format

## Documentation

| Resource  | Link                                                                                |
| --------- | ----------------------------------------------------------------------------------- |
| Live Demo | [skills-badge.vercel.app](https://skills-badge.vercel.app)                           |
| GitHub    | [github.com/JungHoonGhae/skills-badge](https://github.com/JungHoonGhae/skills-badge) |
| skills.sh | [skills.sh](https://skills.sh)                                                       |

## License

MIT - See [LICENSE](https://github.com/JungHoonGhae/skills-badge/blob/main/LICENSE) for details.
