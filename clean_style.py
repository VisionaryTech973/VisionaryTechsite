import re

file_path = '/Users/noah/.gemini/antigravity/scratch/visionary-tech/style.css'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define blocks to remove
blocks_to_remove = [
    r'\.hero-mockup\s*\{[^}]*\}\s*\.perspective-container\s*\{[^}]*\}\s*\.hero-mockup\s*\{[^}]*\}\s*\.hero-mockup:hover\s*\{[^}]*\}',
    r'\.product-intro-image-wrap\s*\{[^}]*\}\s*\.product-intro-image\s*\{[^}]*\}',
    r'\.product-block-kicker\s*\{[^}]*\}',
    r'/\*\s*Feature Grid\s*\*/\s*\.feature-list\s*\{[^}]*\}\s*\.feature-list li\s*\{[^}]*\}\s*\.feature-list li::before\s*\{[^}]*\}',
    r'/\*\s*Sectors\s*\*/\s*\.sectors-grid\s*\{[^}]*\}\s*\.sector-card\s*\{[^}]*\}\s*\.sector-icon\s*\{[^}]*\}',
    r'\.pricing-target\s*\{[^}]*\}'
]

for block in blocks_to_remove:
    content = re.sub(block, '', content, flags=re.MULTILINE | re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
