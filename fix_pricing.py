import re

with open('components/sections/Pricing.tsx', 'r') as f:
    content = f.read()

if "CometCard" not in content:
    content = content.replace('import Container from "../layout/Container"', 'import Container from "../layout/Container"\nimport { CometCard } from "../ui/comet-card"')

# Plan 1: Starter
# Plan 2: Pro
# Plan 3: Agency

cards = [
    (r'(className="flex-1 bg-\[#111111\] p-10 md:p-12 flex flex-col justify-between border border-\[#1C1B1B\] relative z-10 hover:border-\[#2A2A2A\] transition-colors")',
     'bg-[#111111] p-10 md:p-12 flex flex-col justify-between relative z-10 w-full h-full',
     'flex-1 h-auto min-h-[500px]'
    ),
    (r'(className="flex-\[1\.2\] bg-white p-10 md:p-12 flex flex-col justify-between shadow-2xl relative z-20")',
     'bg-white p-10 md:p-12 flex flex-col justify-between relative z-20 w-full h-full',
     'flex-[1.2] h-auto min-h-[540px]'
    ),
    (r'(className="flex-1 bg-\[#111111\] p-10 md:p-12 flex flex-col justify-between border border-\[#1C1B1B\] relative z-10 hover:border-\[#2A2A2A\] transition-colors")',
     'bg-[#111111] p-10 md:p-12 flex flex-col justify-between relative z-10 w-full h-full',
     'flex-1 h-auto min-h-[500px]'
    )
]

# We need to replace them one by one. The regex matches the first one it finds.
for i in range(3):
    pat, inner, outer = cards[i]
    if i == 1:
        # Pro has different pattern
        pattern = r'(className="flex-\[1\.2\] bg-white p-10 md:p-12 flex flex-col justify-between shadow-2xl relative z-20")>([\s\S]*?)(</motion\.div>)'
    else:
        pattern = r'(className="flex-1 bg-\[#111111\] p-10 md:p-12 flex flex-col justify-between border border-\[#1C1B1B\] relative z-10 hover:border-\[#2A2A2A\] transition-colors")>([\s\S]*?)(</motion\.div>)'
    
    def replacer(m):
        return f'className="{outer}">\n            <CometCard className="h-full w-full" innerClassName="{inner}">{m.group(2)}</CometCard>\n          {m.group(3)}'
    
    # only replace the FIRST occurrence each time for the Starter and Agency
    content = re.sub(pattern, replacer, content, count=1)

with open('components/sections/Pricing.tsx', 'w') as f:
    f.write(content)

