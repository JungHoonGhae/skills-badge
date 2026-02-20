# skills-badge

Dynamic SVG badges for [skills.sh](https://skills.sh) install counts.

## Usage

```markdown
![skills.sh](https://skills-badge.vercel.app/badge/{owner}/{repo})
```

### Example

```markdown
![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/ships-with-steipete)
```

## Options

| Query Param | Default | Description |
|-------------|---------|-------------|
| `style` | `flat` | Badge style: `flat`, `flat-square`, `plastic`, `for-the-badge`, `social` |
| `label` | `skills.sh` | Left side label text |
| `labelColor` | `#3b82f6` | Left side background color (hex) |
| `color` | `#22c55e` | Right side background color (hex) |

### Custom Styling

```markdown
![skills.sh](https://skills-badge.vercel.app/badge/JungHoonGhae/ships-with-steipete?style=flat-square&label=installs&color=blue)
```

## How It Works

1. Fetches the skills.sh page for the given owner/repo
2. Parses the HTML to extract the install count
3. Falls back to "available" if count cannot be fetched
4. Returns an SVG badge in shields.io format

## Deploy Your Own

```bash
git clone https://github.com/JungHoonGhae/skills-badge
cd skills-badge
npm install
vercel
```

## License

MIT
