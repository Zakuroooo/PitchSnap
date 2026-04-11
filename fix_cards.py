import re

def fix_journey():
    with open('components/sections/Journey.tsx', 'r') as f:
        content = f.read()

    if "CardContainer" not in content:
        content = content.replace('import Container from "../layout/Container"', 'import Container from "../layout/Container"\nimport { CardContainer, CardBody, CardItem } from "../ui/3d-card"')

    old_div = r"<div className=\{`bg-\[#111111\] p-8 md:p-12 hover:bg-\[#161616\] transition-colors relative \$\{step\.isHighlight \? 'shadow-\[0_0_60px_rgba\(255,255,255,0\.05\)\]' : ''\}`\}>\s*<h3 className=\{`text-2xl md:text-3xl font-extrabold mb-4 \$\{step\.isHighlight \? 'text-white' : 'text-\[#c6c6c6\]'\}`\}>\s*\{step\.title\}\s*</h3>\s*<p className=\"text-\[#A1A1A1\] leading-relaxed text-base md:text-lg\">\s*\{step\.description\}\s*</p>\s*</div>"
    
    new_div = r"""<CardContainer className="inter-var w-full">
                      <CardBody className={`bg-[#111111] p-8 md:p-12 hover:bg-[#161616] transition-colors relative ${step.isHighlight ? 'shadow-[0_0_60px_rgba(255,255,255,0.05)]' : ''}`}>
                        <CardItem translateZ={20} className={`text-2xl md:text-3xl font-extrabold mb-4 ${step.isHighlight ? 'text-white' : 'text-[#c6c6c6]'}`}>
                          {step.title}
                        </CardItem>
                        <CardItem as="p" translateZ={10} className="text-[#A1A1A1] leading-relaxed text-base md:text-lg">
                          {step.description}
                        </CardItem>
                      </CardBody>
                    </CardContainer>"""
    
    content = re.sub(old_div, new_div, content)
    with open('components/sections/Journey.tsx', 'w') as f:
        f.write(content)

def fix_howitworks():
    with open('components/sections/HowItWorks.tsx', 'r') as f:
        content = f.read()

    if "WobbleCard" not in content:
        content = content.replace('import Container from "../layout/Container"', 'import Container from "../layout/Container"\nimport { WobbleCard } from "../ui/wobble-card"')

    # Original cards without WobbleCard wrappers
    cards = [
        ('md:col-span-8 bg-[#111111] hover:bg-[#161616] transition-colors p-10 md:p-16 h-[400px] flex flex-col justify-between group relative overflow-hidden',
         'md:col-span-8 h-[400px]',
         'bg-[#111111] hover:bg-[#161616] transition-colors p-10 md:p-16 flex flex-col justify-between relative group'),
        
        ('md:col-span-4 bg-[#1a1c1c] p-10 md:p-12 h-[400px] flex flex-col justify-between',
         'md:col-span-4 h-[400px]',
         'bg-[#1a1c1c] p-10 md:p-12 flex flex-col justify-between'),

        ('md:col-span-5 bg-[#141414] hover:bg-[#1A1A1A] transition-colors p-10 md:p-16 h-[460px] flex flex-col justify-between relative overflow-hidden group',
         'md:col-span-5 h-[460px]',
         'bg-[#141414] hover:bg-[#1A1A1A] transition-colors p-10 md:p-16 flex flex-col justify-between relative group'),
         
        ('md:col-span-7 bg-[#1c1b1b] hover:bg-[#201f1f] transition-colors p-10 md:p-16 h-[460px] flex flex-col justify-between relative overflow-hidden',
         'md:col-span-7 h-[460px]',
         'bg-[#1c1b1b] hover:bg-[#201f1f] transition-colors p-10 md:p-16 flex flex-col justify-between relative')
    ]
    
    for old_cls, outer_cls, wobble_cls in cards:
        pattern = r'(className="' + re.escape(old_cls) + r'")>([\s\S]*?)(</motion\.div>)'
        def replacer(m):
            return f'className="{outer_cls}">\n            <WobbleCard className="{wobble_cls}">{m.group(2)}</WobbleCard>\n          {m.group(3)}'
        content = re.sub(pattern, replacer, content)

    with open('components/sections/HowItWorks.tsx', 'w') as f:
        f.write(content)

fix_journey()
fix_howitworks()
