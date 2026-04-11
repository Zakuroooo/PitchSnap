import re

with open('components/sections/Features.tsx', 'r') as f:
    content = f.read()

if "CardContainer" not in content:
    content = content.replace('import Container from "../layout/Container"', 'import Container from "../layout/Container"\nimport { CardContainer, CardBody, CardItem } from "../ui/3d-card"')

cards = [
    # Card 1: Cold Email Generator
    (r'<h3 className="(text-3xl font-extrabold text-white mb-4)">(Cold Email Generator)</h3>\s*<p className="(text-\[#A1A1A1\] text-lg max-w-md)">\s*(Instantly draft highly personalized cold emails that bypass spam filters and command a response\.)\s*</p>',
     r'<CardItem translateZ={15} as="h3" className="\1">\2</CardItem>\n              <CardItem translateZ={8} as="p" className="\3">\n                \4\n              </CardItem>',
     'bg-[#131313] hover:bg-[#1a1b1c] transition-colors flex flex-col justify-between overflow-hidden',
     'h-full',
     'bg-[#131313] hover:bg-[#1a1b1c] transition-colors flex flex-col justify-between overflow-hidden relative'
     ),

    # Card 2: LinkedIn Outreach
    (r'<h3 className="(text-xl font-extrabold text-white mb-4)">(LinkedIn Outreach)</h3>\s*<p className="(text-\[#A1A1A1\] text-base mb-8)">\s*(Generate connection notes perfectly formatted for algorithms\.)\s*</p>',
     r'<CardItem translateZ={15} as="h3" className="\1">\2</CardItem>\n              <CardItem translateZ={8} as="p" className="\3">\n                \4\n              </CardItem>',
     'bg-[#1A1C1C] p-8 sm:p-12 flex flex-col justify-between',
     'h-full',
     'bg-[#1A1C1C] p-8 sm:p-12 flex flex-col justify-between relative'
     ),

    # Card 3: Smart Follow-ups
    (r'<h3 className="(text-xl font-extrabold text-white mb-4)">(Smart Follow-ups)</h3>\s*<p className="(text-\[#A1A1A1\] text-base)">\s*(Never let a lead go cold\. Auto-generate perfectly timed follow-up sequences\.)\s*</p>',
     r'<CardItem translateZ={15} as="h3" className="\1">\2</CardItem>\n            <CardItem translateZ={8} as="p" className="\3">\n              \4\n            </CardItem>',
     'bg-[#161616] hover:bg-[#1c1b1b] transition-colors p-8 sm:p-12',
     'h-full',
     'bg-[#161616] hover:bg-[#1c1b1b] transition-colors p-8 sm:p-12 relative'
     ),

    # Card 4: Full Proposal Writer
    (r'<h3 className="(text-3xl font-extrabold text-\[#F5F5F5\] mb-4)">(Full Proposal Writer)</h3>\s*<p className="(text-\[#A1A1A1\] text-lg max-w-sm)">\s*(Generate comprehensive 5-page proposals covering scope, timelines, deliverables, and terms\.)\s*</p>',
     r'<CardItem translateZ={15} as="h3" className="\1">\2</CardItem>\n                <CardItem translateZ={8} as="p" className="\3">\n                  \4\n                </CardItem>',
     'bg-[#131313] hover:bg-[#1a1b1c] transition-colors overflow-hidden flex flex-col sm:flex-row',
     'h-full',
     'bg-[#131313] hover:bg-[#1a1b1c] transition-colors overflow-hidden flex flex-col sm:flex-row relative'
     ),

    # Card 5: Pricing Intel
    (r'<h3 className="(text-xl font-extrabold text-white mb-4)">(Pricing Intel)</h3>\s*<p className="(text-\[#A1A1A1\] text-base)">\s*(Get AI suggestions on how much to charge based on industry standards\.)\s*</p>',
     r'<CardItem translateZ={15} as="h3" className="\1">\2</CardItem>\n            <CardItem translateZ={8} as="p" className="\3">\n              \4\n            </CardItem>',
     'bg-[#1A1C1C] p-8 sm:p-12 hover:bg-[#201F1F] transition-colors',
     'h-full',
     'bg-[#1A1C1C] p-8 sm:p-12 hover:bg-[#201F1F] transition-colors relative'
     ),

    # Card 6: Generation Cloud History
    (r'<h3 className="(text-xl font-extrabold text-white mb-3)">(Generation Cloud History)</h3>\s*<p className="(text-\[#A1A1A1\] text-base)">\s*(Never lose a successful pitch\. Every cold email, proposal, and LinkedIn message is automatically protected\.)\s*</p>',
     r'<CardItem translateZ={15} as="h3" className="\1">\2</CardItem>\n              <CardItem translateZ={8} as="p" className="\3">\n                \4\n              </CardItem>',
     'bg-[#131313] p-8 sm:p-12 flex flex-col sm:flex-row items-center text-center sm:text-left gap-8',
     'h-full',
     'bg-[#131313] p-8 sm:p-12 flex flex-col sm:flex-row items-center text-center sm:text-left gap-8 relative'
     ),
]

for pat_search, pat_repl, old_outer_cls, outer_new_cls, body_cls in cards:
    # We find the motion.div with old_outer_cls, replace it with CardContainer+CardBody wrap.
    # First, let's wrap the contents.
    pattern_motion = r'(className="' + re.escape('group ') + r'.*?' + re.escape(old_outer_cls[15:]) + r'")>([\s\S]*?)(</motion\.div>)'
    
    def replacer(m):
        inner_content = m.group(2)
        inner_content = re.sub(pat_search, pat_repl, inner_content)
        # return replacing the classname inside motion.div entirely, since it's group md:...
        curr_cls = m.group(1)
        # extract md:col-span-X etc
        col_span = re.search(r'(md:col-span-\d+ row-span-1|md:col-span-\d+)', curr_cls)
        wrapper_class = col_span.group(1) if col_span else ""
        return f'className="{wrapper_class}">\n            <CardContainer className="w-full h-full">\n              <CardBody className="{body_cls} h-full">{inner_content}</CardBody>\n            </CardContainer>\n          {m.group(3)}'
    
    content = re.sub(pattern_motion, replacer, content)

with open('components/sections/Features.tsx', 'w') as f:
    f.write(content)

