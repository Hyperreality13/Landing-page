import base64
import os

with open('logo.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

with open('styles.css', 'r', encoding='utf-8') as f:
    css = f.read()

with open('app.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace CSS link with inline style tag
html = html.replace('<link rel="stylesheet" href="styles.css">', f'<style>\n{css}\n</style>')

# Replace JS script tag with inline script tag
html = html.replace('<script src="app.js"></script>', f'<script>\n{js}\n</script>')

# Replace logo PNG src with base64 data URI
html = html.replace('src="logo.png"', f'src="data:image/png;base64,{logo_b64}"')

with open('aidan-standalone-landing.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("Self-contained HTML file created successfully: aidan-standalone-landing.html")
