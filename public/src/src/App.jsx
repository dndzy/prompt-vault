import { useState, useMemo } from "react";

const collections = [
  {
    id: "threads",
    name: "Threads Growth",
    description: "Faceless Threads account launch system",
    icon: "◎",
    color: "#FF6B35",
    author: "Adam.Digital",
    count: 11,
  },
  {
    id: "mckinsey",
    name: "McKinsey Strategy",
    description: "12 consulting-grade strategy frameworks",
    icon: "△",
    color: "#C8A96E",
    author: "Usama Akram",
    count: 12,
  },
  {
    id: "business",
    name: "Expert-Role Business",
    description: "9 VP/Director-level business prompts",
    icon: "◈",
    color: "#6E9EC8",
    author: "Usama Akram",
    count: 9,
  },
  {
    id: "startup",
    name: "Startup Launch Kit",
    description: "7 prompts from idea to first customer",
    icon: "⚡",
    color: "#FF9900",
    author: "Usama Akram",
    count: 7,
  },
  {
    id: "youtube",
    name: "YouTube AI Channel",
    description: "10 prompts to launch a faceless channel",
    icon: "▶",
    color: "#FF0000",
    author: "Usama Akram",
    count: 10,
  },
];

const allPrompts = [
  // ── THREADS ──
  { id: "t01", collection: "threads", category: "Strategy", title: "Niche & Visual Style Finder", summary: "Rank top 10 faceless AI Threads niches by monetization, audience size & production ease.", fields: ["YOUR TOPICS"], template: `You are an AI social media strategist who has launched 50+ faceless Threads accounts. Rank the top 10 faceless AI Threads niches by monetization potential, audience size, and ease of production. For each, recommend the best AI visual style for posts. Then identify 3 competitor Threads accounts per niche with their stats and gaps I could own. End with a one-sentence positioning statement for my top pick.\n\nMy interests: [YOUR TOPICS]` },
  { id: "t02", collection: "threads", category: "Visuals", title: "AI Visual Style Blueprint", summary: "JSON-formatted visual style guide for consistent AI image generation across all posts.", fields: ["TOPIC", "1–3 EXAMPLES"], template: `You are an AI art director for faceless Threads accounts. Create a detailed JSON-formatted visual style guide I can paste into any AI image tool to get consistent results. Include: art style, color palette, character design rules, line weight, shading, and atmosphere. Then write 10 reusable post visual prompts and a carousel/visual post style guide.\n\nMy niche: [TOPIC]\nAccounts I like the look of: [1–3 EXAMPLES]` },
  { id: "t03", collection: "threads", category: "Hooks", title: "Viral Post Hook System", summary: "12 proven hook formulas with fill-in-the-blank templates and visual post concepts.", fields: ["TOPIC", "FIRST 5 POST IDEAS"], template: `You are a Threads engagement specialist. Give me 12 proven post hook formulas for my niche with fill-in-the-blank templates. For each formula, describe the matching visual post concept (composition, text overlay, colors). Then write 3 hook variations for my first 5 post topics and rank which will win.\n\nMy niche: [TOPIC]\nMy first 5 post ideas: [LIST THEM]` },
  { id: "t04", collection: "threads", category: "Writing", title: "AI Content Writer", summary: "Production-ready Threads post thread with hooks, visual tags, pattern interrupts, and CTA.", fields: ["YOUR IDEA", "NUMBER OF POSTS", "VISUAL STYLE"], template: `You are a Threads writer for faceless AI accounts. Write a full production-ready Threads post thread for my topic. Include a strong opening hook, engagement structure, and [VISUAL] tags describing what the AI image should show. Add pattern interrupts every few posts and one follow CTA at the optimal moment.\n\nPost topic: [YOUR IDEA]\nTarget length: [NUMBER OF POSTS]\nVisual style: [YOUR STYLE]` },
  { id: "t05", collection: "threads", category: "Systems", title: "AI Content Production Pipeline", summary: "From idea to published post in under 30 minutes with exact AI tools and batch plan.", fields: ["BUDGET", "POSTS/WEEK"], template: `You are an AI Threads content production consultant. Build me a step-by-step workflow to go from topic idea to finished published post in under 30 minutes. Include the exact AI tools for each step (writing, images, captions, scheduling), copy-paste prompt templates, a batch production plan for creating 20–30 posts in one session, and a monthly cost breakdown.\n\nMy budget: [AMOUNT]\nPosting goal: [POSTS/WEEK]` },
  { id: "t06", collection: "threads", category: "Growth", title: "Threads Growth Playbook", summary: "20 keywords ranked by interest & competition with post templates and funnels.", fields: ["TOPIC", "ACCOUNT AGE"], template: `You are a Threads growth specialist. Give me 20 keywords/topics in my niche ranked by audience interest and competition. For each, tell me the engagement intent and whether a new account can realistically grow with it. Then provide a post template, hashtag strategy, thread structure guide, and a short-post-to-thread funnel plan.\n\nMy niche: [TOPIC]\nAccount age: [NEW / UNDER 1K / 1K–10K]` },
  { id: "t07", collection: "threads", category: "Planning", title: "90-Day Content Calendar", summary: "Month-by-month posting plan with content series concepts and milestone targets.", fields: ["TOPIC", "POSTS/WEEK"], template: `You are a content strategist for faceless Threads accounts. Build me a 90-day posting calendar. Month 1: 20–30 foundation posts to establish authority. Month 2: 20–30 posts based on what's getting engagement. Month 3: 20–30 posts designed to attract collaborations and grow faster. Include 2 content series concepts and milestone targets for each month.\n\nMy niche: [TOPIC]\nPosting capacity: [POSTS/WEEK]` },
  { id: "t08", collection: "threads", category: "Analytics", title: "Engagement Fixer", summary: "Fix the 5 biggest engagement killers with pattern interrupts and benchmark rates.", fields: ["AVERAGE ENGAGEMENT", "POST FORMAT"], template: `You are a Threads analytics expert. Tell me the 5 biggest reasons people stop engaging with posts and how to fix each one. Include a pattern interrupt playbook with 8 techniques, formatting rules for Threads posts, hook optimization tips, and benchmark engagement rates I should target by account size.\n\nMy average engagement: [IF KNOWN]\nMy post format: [SHORT POSTS / THREADS / MIX]` },
  { id: "t09", collection: "threads", category: "Growth", title: "Algorithm Cheat Sheet", summary: "4 core ranking signals, best post times, and 24-hour post-launch strategy.", fields: ["TOPIC", "POSTING FREQUENCY"], template: `You are a Threads algorithm researcher. Explain the 4 core ranking signals and which to prioritize as a new account. Then give me: best posting days/times for my niche, how to get into recommended feeds, reply strategy for growth, and what to do in the first 24 hours after posting to maximize reach.\n\nMy niche: [TOPIC]\nPosting schedule: [FREQUENCY]` },
  { id: "t10", collection: "threads", category: "Launch", title: "Master Account Launch Prompt", summary: "Complete 90-day launch plan with week-by-week actions and milestone targets.", fields: ["NICHE + VISUAL STYLE", "HOURS/WEEK", "90-DAY GOAL"], template: `You are an AI Threads growth consultant who has taken 20 accounts from zero to a large audience in 90 days. Give me a complete launch plan: honest audit of my idea, week-by-week actions for months 1–3, a content production system for solo creators, milestone targets at day 30/60/90, and the single highest-impact thing I should do right now.\n\nMy account idea: [NICHE + VISUAL STYLE]\nHours per week: [TIME]\nMy 90-day goal: [TARGET]` },
  { id: "t11", collection: "threads", category: "Monetize", title: "Audience Product Builder", summary: "Design a digital product with outline, pricing, and Threads promotion plan.", fields: ["TOPIC", "AUDIENCE PROBLEM"], template: `You are a creator monetization strategist for Threads accounts. Help me design a simple digital product I can sell to my audience. Analyze my niche and suggest 3 product ideas (guide, template pack, prompt library, mini-course, etc.). For the best option, create the product outline, value proposition, pricing idea, and a simple promotion plan using Threads posts.\n\nMy niche: [TOPIC]\nAudience problem I want to solve: [PROBLEM]` },

  // ── MCKINSEY ──
  { id: "m01", collection: "mckinsey", category: "Problem Structuring", title: "MECE Issue Tree Builder", summary: "Break any messy business problem into a clean, structured issue tree.", fields: ["YOUR BUSINESS PROBLEM"], template: `You are a strategy consultant breaking down a messy business problem into a clean, structured issue tree. Use the MECE principle (Mutually Exclusive, Collectively Exhaustive) so every part of the problem is covered exactly once with no overlaps.\n\nHere is what I need:\n- Problem statement: Rewrite my problem as one clear, specific sentence.\n- MECE explained: Briefly tell me what MECE means and how to check each branch.\n- Level 1 branches: Give me 2 to 4 top-level categories that cover 100% of the problem.\n- Level 2 branches: Under each Level 1 category, give me 2 to 4 sub-issues.\n- Level 3 branches: For the most important Level 2 issues, go one level deeper.\n- Overlap check: Point out any overlapping branches and show how to fix them.\n- Gap check: Point out anything the tree misses.\n- Priority call: Which branch most likely holds the root cause?\n- Hypothesis per branch: For each Level 1 branch, write one clear hypothesis.\n- Visual layout: Describe the full tree structure for PowerPoint or Miro.\n\nMy messy problem: [YOUR BUSINESS PROBLEM]` },
  { id: "m02", collection: "mckinsey", category: "Market Analysis", title: "Five Forces Industry Analyzer", summary: "Full Porter's Five Forces with ratings, evidence, and one strategic action per force.", fields: ["YOUR INDUSTRY", "YOUR POSITION"], template: `You are a strategy consultant running a full Porter's Five Forces analysis. Give me a complete, evidence-based picture of how attractive this industry is.\n\nHere is what I need:\n- Force 1, Threat of New Entrants: Rate High/Medium/Low with evidence.\n- Force 2, Supplier Power: Rate with evidence.\n- Force 3, Buyer Power: Rate with evidence.\n- Force 4, Threat of Substitutes: Rate with evidence.\n- Force 5, Competitive Rivalry: Rate with evidence.\n- Industry attractiveness score: Weighted score 1–10 across all five forces.\n- Dominant force: Which single force matters most for margins?\n- Action per force: One specific move for each force.\n- Best position: Most defensible and profitable spot in this market.\n\nIndustry: [YOUR INDUSTRY]\nMy position: [ENTERING AS / COMPETING AS]` },
  { id: "m03", collection: "mckinsey", category: "Communication", title: "Pyramid Principle Narrative", summary: "Turn raw data into a boardroom-ready story using Minto's SCQA framework.", fields: ["YOUR DATA / FINDINGS", "AUDIENCE"], template: `You are a communications expert trained in the Pyramid Principle. Turn my raw data and findings into a clear, structured boardroom story.\n\nHere is what I need:\n- Main message: One sentence a CEO would act on right away.\n- SCQA framework: Situation, Complication, Question, Answer.\n- Pyramid structure: Three groups of supporting arguments, each with three data points.\n- Horizontal logic check: Does each group tell the same kind of story?\n- Vertical logic check: Does every argument directly support the one above it?\n- Executive summary: One polished paragraph using SCQA.\n- Slide 1 content: Headline, supporting points, and data highlights.\n\nMy raw data and findings: [PASTE YOUR DATA]\nAudience: [WHO WILL RECEIVE THIS]` },
  { id: "m04", collection: "mckinsey", category: "Portfolio Strategy", title: "BCG Matrix Portfolio Analyzer", summary: "Full BCG Growth-Share Matrix with quadrant placement and rebalancing plan.", fields: ["PRODUCTS WITH REVENUE & MARKET DATA"], template: `You are a corporate strategy consultant building a BCG Growth-Share Matrix.\n\nHere is what I need:\n- Matrix explained: What each quadrant means (Stars, Cash Cows, Question Marks, Dogs).\n- Growth rate axis: How to set the high/low cutoff for this industry.\n- Market share axis: How to calculate relative market share correctly.\n- Quadrant placement: Put each product in the right quadrant with reasoning.\n- Stars: Investment needs and path to Cash Cow.\n- Cash Cows: How much cash they generate and how to maximize without burning out.\n- Question Marks: Which deserve investment vs. which to cut.\n- Dogs: Squeeze value or shut down — cost of each option.\n- Portfolio balance: Is the mix too heavy in any quadrant?\n- Capital allocation: How to move cash from Cows to fund Stars and Question Marks.\n\nMy product portfolio: [LIST PRODUCTS WITH REVENUE, MARKET SHARE, AND GROWTH DATA]` },
  { id: "m05", collection: "mckinsey", category: "Research & Analysis", title: "Hypothesis-Driven Analysis Engine", summary: "Day 1 consulting setup: hypothesis, key questions, 3-week work plan.", fields: ["BUSINESS SITUATION", "DECISION TO MAKE"], template: `You are a strategy consultant setting up hypothesis-driven analysis on Day 1.\n\nHere is what I need:\n- Starting hypothesis: One clear, testable statement.\n- Why this hypothesis: Most reasonable starting point given what we know.\n- Key questions: 5 questions that would prove or kill the hypothesis.\n- Analyses needed: Specific data work for each question.\n- Data sources: Where to find data for each analysis.\n- Work plan: Week-by-week schedule for a 3-week sprint.\n- Backup hypotheses: 2 alternatives and what would make me switch.\n- Early signals: Data that supports or challenges the hypothesis now.\n- Presentation outline: Slide titles for the final deck.\n- Honesty check: What result would completely disprove the hypothesis?\n\nBusiness situation: [DESCRIBE WHAT YOU KNOW]\nDecision to be made: [WHAT THE ANALYSIS MUST ANSWER]` },
  { id: "m06", collection: "mckinsey", category: "Competitive Intelligence", title: "Competitive Landscape Summary", summary: "Executive-ready competitive brief with grid, open space, and one-slide layout.", fields: ["YOUR OFFERING", "KEY COMPETITORS"], template: `You are a strategy analyst compressing 3 weeks of competitive intelligence into one executive-ready slide.\n\nHere is what I need:\n- Top competitors: 8 most relevant, ranked by importance.\n- Comparison dimensions: 6–8 real competitive factors (pricing, distribution, advantage, growth direction).\n- Competitor grid: Rate each competitor on each dimension.\n- Clusters: Who is fighting the same fight vs. playing a different game?\n- Open space: Positions nobody currently owns.\n- Who is moving: Gaining ground vs. stuck vs. losing steam.\n- Biggest threat: One player most likely to hurt my position in 18 months.\n- One-slide layout: Exact structure for the executive slide.\n- Three-sentence summary: The competitive landscape in 3 sentences.\n\nMy company or product: [YOUR OFFERING]\nKey competitors: [LIST COMPETITION]` },
  { id: "m07", collection: "mckinsey", category: "Strategic Assessment", title: "SWOT That Actually Works", summary: "Evidence-backed SWOT with interaction analysis and 3 concrete strategic actions.", fields: ["COMPANY / PRODUCT", "DECISION CONTEXT"], template: `You are a strategy consultant who refuses to produce vague, generic SWOTs.\n\nHere is what I need:\n- Strengths: 4–5 real competitive advantages with proof.\n- Weaknesses: 4–5 honest internal problems with fix difficulty rating.\n- Opportunities: 4–5 specific conditions with timing on the window.\n- Threats: 4–5 forces with probability and impact rating.\n- Interaction analysis: 4 most important cross-quadrant combinations.\n- Top priorities: Best strength, first weakness to fix, top opportunity, urgent threat.\n- Strategic actions: 3 concrete moves from this SWOT.\n- "So what?" test: Every item must lead to a clear action.\n- One-slide format: How to lay this out as a clean 2x2.\n\nMy business: [COMPANY, PRODUCT, OR INITIATIVE]\nContext: [WHAT DECISION THIS SWOT IS HELPING WITH]` },
  { id: "m08", collection: "mckinsey", category: "Recommendation QA", title: '"So What?" Stress Test', summary: "Push every recommendation 3 levels deeper until specific and defensible.", fields: ["YOUR RECOMMENDATIONS"], template: `You are a senior strategy partner stress-testing analyst work before it goes to the client.\n\nHere is what I need:\n- Recommendation check: Ask "So what?" three times for each recommendation.\n- Vague language detector: Flag weak phrases and force specific, measurable language.\n- Logic chain check: Data → Insight → Implication → Recommendation → Action.\n- Specificity test: Is each recommendation missing what, how much, when, or owned by whom?\n- Pushback rehearsal: What would a skeptical CFO say? How to respond?\n- Priority order: Are recommendations ranked correctly by impact and ease?\n- Dependencies: Which recommendations need others first?\n- Confidence level: Strong evidence vs. educated guesses.\n- Slide title test: Is each recommendation specific enough to act on as a slide headline?\n\nMy recommendations: [PASTE YOUR CURRENT RECOMMENDATIONS]` },
  { id: "m09", collection: "mckinsey", category: "Operations Strategy", title: "Value Chain Breakdown", summary: "Map where your business creates, captures, and leaks value.", fields: ["YOUR COMPANY & INDUSTRY", "BIGGEST COST CONCERN"], template: `You are a strategy analyst mapping the full value chain.\n\nHere is what I need:\n- Primary activities: Inbound, operations, outbound, marketing, service — performance of each.\n- Support activities: Systems, HR, technology, procurement — where they help or hinder.\n- Where we create value: Activities that outperform competitors.\n- Where we lose value: Margin leaking to suppliers, middlemen, or waste.\n- Cost structure: Which activities eat most cost vs. value produced.\n- Competitor comparison: Where differences create advantages or disadvantages.\n- Make vs. buy: What to outsource without losing strategic control.\n- Integration chances: Forward or backward integration to improve margins.\n- Biggest lever: The single activity that, improved by 20%, moves competitive position most.\n\nMy business: [YOUR COMPANY AND INDUSTRY]\nBiggest cost concern: [WHERE YOU FEEL THE MOST PRESSURE]` },
  { id: "m10", collection: "mckinsey", category: "Future Strategy", title: "Scenario Planning Matrix", summary: "2×2 scenario grid with stories, early warning signals, and decision triggers.", fields: ["YOUR INDUSTRY & SITUATION", "BIGGEST UNCERTAINTY"], template: `You are a strategy partner running a scenario planning session.\n\nHere is what I need:\n- Two key unknowns: Most uncertain and impactful factors — these become the axes.\n- 2x2 scenario grid: Four internally consistent scenarios.\n- Scenario stories: 5–7 sentence description of each world in 3–5 years.\n- Scenario names: Short, memorable name for each.\n- What each means for us: 3 specific effects on strategy, product, pricing, operations.\n- Strategic options: Safe bets (work in multiple scenarios) vs. gambles (one scenario only).\n- Early warning signs: 3 signals per scenario to watch today.\n- Protection plan: Survive the worst while winning in the best.\n- Decision triggers: When to switch from one approach to another.\n\nMy business context: [YOUR INDUSTRY AND SITUATION]\nBiggest uncertainty: [WHAT YOU WORRY ABOUT MOST]` },
  { id: "m11", collection: "mckinsey", category: "Org Design", title: "Operating Model Designer", summary: "Blueprint that turns strategy into execution: structure, decision rights, rollout plan.", fields: ["COMPANY / STRATEGY / SETUP", "EXECUTION CHALLENGE"], template: `You are an organization design consultant building the operating model that turns strategy into execution.\n\nHere is what I need:\n- Strategy to model: How strategy should shape every piece of the operating model.\n- Structure options: Functional, divisional, matrix, network — pros and cons for my situation.\n- Recommended structure: Best fit given strategy, size, and people.\n- Decision rights: RACI for the 10 most important recurring decisions.\n- Key processes: 5 most critical processes and current gaps in each.\n- Performance tracking: What to measure, how often, what behavior to encourage.\n- Critical roles: 3–5 jobs that matter most for competitive advantage.\n- Culture and behavior: 3–4 behaviors the model must encourage.\n- Coordination: How teams stay aligned without unnecessary meetings.\n- Rollout order: Sequence changes to keep disruption low and get early wins.\n\nMy business: [COMPANY, STRATEGY, AND CURRENT SETUP]\nBiggest execution challenge: [WHERE STRATEGY ISN'T TURNING INTO RESULTS]` },
  { id: "m12", collection: "mckinsey", category: "Master", title: "Full Strategy Synthesis", summary: "Senior partner final delivery: pyramid narrative, 3 paths, recommendation, board summary.", fields: ["FULL COMPANY CONTEXT", "STRATEGIC DECISION", "DEADLINE"], template: `You are a senior strategy partner presenting final recommendations to a CEO and board.\n\nHere is what I need:\n- Where we stand: Market position, competitive situation, financial health, team capability.\n- The core question: Single most important question this analysis set out to answer.\n- Top 5 findings: Most important insights, each evidence-backed.\n- Pyramid narrative: Main message, three supporting arguments, nine data points.\n- Three paths forward: Options with expected value, risk, capabilities needed, timeline.\n- My recommendation: One clear choice with reasoning for a skeptical board member.\n- Success requirements: 5 things that must go right.\n- 30-60-90 day plan: Actions at 30 days, check at 60, turning point at 90.\n- Risk list: Top 5 risks with probability, impact, and mitigation.\n- One-page board summary: Headline, three findings, recommendation, next steps.\n\nMy business: [FULL CONTEXT]\nDecision to make: [THE STRATEGIC CHOICE]\nTimeline: [WHEN A DECISION MUST BE MADE]` },

  // ── BUSINESS (Expert-Role) ──
  { id: "b01", collection: "business", category: "Strategy", title: "Competitive Intelligence Mapper", summary: "Full competitive landscape — positioning, pricing, differentiators, and 3 underexploited gaps.", fields: ["YOUR INDUSTRY"], template: `# Role\nBCG principal who reverse-engineers entire industries in a single session\n\n# Task\nRun a full competitive landscape analysis for my industry\n\n# Context\n- Industry: [YOUR INDUSTRY]\n- Focus areas: positioning, pricing, differentiators, blind spots\n- Players to map: top 8-10 competitors\n\n# Output\n- Competitive map of all major players\n- Benchmark each player across positioning, pricing, and differentiators\n- Identify 3 underexploited market gaps with evidence\n- Format as a board-ready strategy brief: executive summary first, analysis below` },
  { id: "b02", collection: "business", category: "Sales", title: "Objection Killer", summary: "15 most common sales objections with rebuttals that shift cost to outcome.", fields: ["YOUR PRODUCT", "DEAL TYPE", "PROSPECT CONCERN"], template: `# Role\nVP of Sales with $400M+ in closed enterprise deals\n\n# Task\nGenerate the 15 most common objections prospects raise + a rebuttal for each\n\n# Context\n- My product: [DESCRIBE YOUR PRODUCT]\n- Deal type: [B2B / B2C / Enterprise]\n- Typical prospect concern: [price / timing / trust / competition]\n\n# Output\n- List the 15 most common objections\n- Write a 2-3 sentence rebuttal for each\n- Every rebuttal shifts the conversation from cost to outcome\n- No generic responses. Write the ones that actually close` },
  { id: "b03", collection: "business", category: "Fundraising", title: "Pitch Deck Architect", summary: "Complete 12-slide pitch deck with exact copy for every slide. No filler.", fields: ["YOUR STARTUP IDEA", "STAGE", "INVESTOR TYPE"], template: `# Role\nYC partner who has reviewed 10,000+ pitch decks and funded 200+ startups\n\n# Task\nBuild a complete 12-slide pitch deck with exact copy for every slide\n\n# Context\n- My startup: [DESCRIBE YOUR IDEA]\n- Stage: [PRE-SEED / SEED / SERIES A]\n- Target investor type: [VC / Angel / Accelerator]\n\n# Output (12 slides)\n- Problem\n- Solution\n- Market Size\n- Traction\n- Business Model\n- Team\n- Competition\n- Go-to-Market\n- Financials\n- The Ask\n\nEvery sentence sharp enough for a Demo Day stage. No filler.` },
  { id: "b04", collection: "business", category: "Operations", title: "Amazon 6-Pager Generator", summary: "VP-ready narrative memo with press release, FAQ, risks, and milestones.", fields: ["YOUR PROJECT / INITIATIVE"], template: `# Role\nL8 Director at Amazon who writes narrative memos that get approved in a single meeting\n\n# Task\nWrite a complete 6-page narrative memo for my initiative\n\n# Context\n- Initiative: [DESCRIBE YOUR PROJECT]\n- Audience: VP-level with no prior context\n- Goal: single-meeting approval\n\n# Output\n- Press release\n- FAQ\n- Visuals (described in brackets)\n- Risks and mitigations\n- Milestones\n- Readable and approvable in under 30 minutes` },
  { id: "b05", collection: "business", category: "Growth", title: "Market Entry War Room", summary: "Full go-to-market playbook: barriers, distribution ranked by ROI, 90-day timeline.", fields: ["TARGET MARKET", "BUDGET & TEAM", "LAUNCH DATE"], template: `# Role\nStrategy director who has guided Fortune 500 companies into 40+ new markets\n\n# Task\nBuild a complete go-to-market playbook for my target market\n\n# Context\n- Target market: [NEW MARKET / COUNTRY / VERTICAL]\n- Current resources: [BUDGET / TEAM SIZE]\n- Timeline: [LAUNCH TARGET DATE]\n\n# Output\n- Entry barriers (and how to clear them)\n- Regulatory requirements\n- Top 5 distribution channels, ranked by ROI\n- Pricing localization strategy\n- 90-day launch timeline with milestones` },
  { id: "b06", collection: "business", category: "Strategy", title: "Strategic Teardown Engine", summary: "Deep company teardown using Porter's, JTBD, Blue Ocean — with 3 next-move predictions.", fields: ["COMPANY NAME"], template: `# Role\nStrategy professor who turns any company's public moves into a full competitive teardown\n\n# Task\nAnalyze my target company's strategy over the last two years\n\n# Context\n- Company: [COMPANY NAME]\n- Frameworks: Porter's Five Forces, Jobs-to-Be-Done, Blue Ocean Strategy\n- Focus: decisions and moves others have missed\n\n# Output\n- What they are actually doing beneath the surface\n- The strategic play nobody is talking about\n- Three specific predictions for their next move, with reasoning` },
  { id: "b07", collection: "business", category: "Finance", title: "CFO Financial Narrative Builder", summary: "Turn raw metrics into an investor-ready story — unit economics, burn, path to profitability.", fields: ["YOUR METRICS", "INVESTOR STAGE"], template: `# Role\nCFO of a Series C company who turns raw numbers into financial stories that build conviction\n\n# Task\nWrite an investor-ready financial narrative from my metrics\n\n# Context\n- My metrics: [PASTE YOUR METRICS]\n- Audience: Series B investor\n- Goal: make them want to write a check before the meeting ends\n\n# Output\n- Unit economics and what they signal\n- Burn rate trajectory and what is driving it\n- Path to profitability with key assumptions stated clearly\n- Narrative arc that turns numbers into a compelling story` },
  { id: "b08", collection: "business", category: "Research", title: "Industry Trends Forecaster", summary: "7+ trends with Hype vs. Real Impact scores, winners/losers, ranked by strategic urgency.", fields: ["YOUR INDUSTRY", "COMPANY STAGE", "PRIMARY CONCERN"], template: `# Role\nSenior analyst who publishes the reports entire industries use to build their roadmaps\n\n# Task\nAnalyze the top trends in my industry over the next 18 months\n\n# Context\n- My industry: [YOUR INDUSTRY]\n- Company stage: [STARTUP / GROWTH / ENTERPRISE]\n- Primary concern: [GROWTH / RISK / COMPETITION]\n\n# Output\n- Minimum 7 trends with Hype vs. Real Impact score (1-10)\n- Adoption speed per trend\n- Who wins and who loses\n- What smart companies should do right now\n- Ranked by strategic urgency, not media attention` },
  { id: "b09", collection: "business", category: "Product", title: "FAANG-Grade PRD Builder", summary: "Complete PRD with user stories, success metrics, scope, tech risks, and phased rollout.", fields: ["YOUR FEATURE / PRODUCT", "TEAM SIZE", "SPRINT START"], template: `# Role\nGroup PM at a top-tier tech company who writes PRDs so clear engineering never needs a follow-up\n\n# Task\nWrite a complete product requirements document for my feature\n\n# Context\n- What I'm building: [DESCRIBE YOUR FEATURE OR PRODUCT]\n- Team size: [NUMBER OF ENGINEERS]\n- Sprint start: [DATE]\n\n# Output\n- Problem statement and user stories\n- Success metrics\n- Scope: in and out\n- Technical considerations and risks\n- Phased rollout plan` },

  // ── STARTUP ──
  { id: "s01", collection: "startup", category: "Validation", title: "Validate Your Business Idea", summary: "Core assumption, fastest zero-budget test, and 3 biggest failure risks.", fields: ["YOUR IDEA"], template: `Act as a startup advisor who has launched 10 successful businesses. Analyze my business idea: [describe idea]. Identify the core assumption that must be true for this to work, the fastest way to test it with zero budget, and the 3 biggest reasons it could fail before I invest a single dollar.` },
  { id: "s02", collection: "startup", category: "Customer", title: "Find Your Ideal Customer", summary: "Detailed customer profile with frustrations, triggers, and exact language they use.", fields: ["PRODUCT/SERVICE", "TARGET MARKET"], template: `I am starting a business selling [product/service] to [target market]. Build me a detailed customer profile including their biggest daily frustrations, what they have already tried, where they spend time online, what triggers a buying decision, and the exact language they use to describe their problem.` },
  { id: "s03", collection: "startup", category: "Product", title: "Build Your Minimum Viable Offer", summary: "Simplest launchable version of your business and fastest path to first paying customer.", fields: ["TIMEFRAME", "BUDGET"], template: `Help me design the simplest possible version of my business that I can launch in [timeframe] with $[budget]. Define the one core problem I solve, the minimum features or deliverables needed to charge for it, and the fastest path to my first paying customer.` },
  { id: "s04", collection: "startup", category: "Planning", title: "Write a Lean Business Plan", summary: "One-page plan covering problem, solution, revenue model, and key metric for year one.", fields: ["BUSINESS IDEA", "TARGET AUDIENCE"], template: `Create a one page business plan for [business idea] targeting [audience]. Cover the problem, solution, target customer, revenue model, competitive advantage, first 90 days of action, and the single most important metric to track in year one.` },
  { id: "s05", collection: "startup", category: "Pricing", title: "Price Your Offer for Maximum Revenue", summary: "Compare low/mid/premium tiers — which model wins early revenue and best competitive position.", fields: ["PRODUCT/SERVICE", "CUSTOMER TYPE", "MARKET"], template: `I am launching [product/service] targeting [customer type] in [market]. Analyze my pricing options across low, mid, and premium tiers. Tell me which pricing model maximizes early revenue, builds the strongest customer relationships, and positions me best against competitors.` },
  { id: "s06", collection: "startup", category: "Growth", title: "Get Your First 10 Customers", summary: "14-day free-channel outreach plan: where to find them, what to say, how to follow up.", fields: ["YOUR BUSINESS", "CUSTOMER TYPE"], template: `I just launched [business] targeting [customer type] with zero marketing budget. Give me a detailed 14-day outreach plan using only free channels to land my first 10 paying customers. Include exactly where to find them, what to say, and how to follow up without being pushy.` },
  { id: "s07", collection: "startup", category: "Operations", title: "Build Systems That Scale Without You", summary: "What to automate, what to delegate, and an operating system to grow beyond your personal capacity.", fields: ["PRODUCT/SERVICE", "YOUR CURRENT TASKS"], template: `My business currently runs entirely on my time and effort. I offer [product/service] and do [list tasks]. Identify which tasks to automate, which to delegate first, and build me a simple operating system that allows the business to grow beyond what I can personally handle.` },

  // ── YOUTUBE ──
  { id: "y01", collection: "youtube", category: "Strategy", title: "Niche & Visual Style Finder", summary: "Top 10 faceless YouTube niches by CPM, audience size, and ease of production.", fields: ["YOUR TOPICS"], template: `You are an AI video strategist who has launched 50+ faceless YouTube channels. Rank the top 10 faceless AI video niches by CPM, audience size, and ease of production. For each, recommend the best AI visual style. Then identify 3 competitor channels per niche with their stats and gaps I could own. End with a one-sentence positioning statement for my top pick.\n\nMy interests: [YOUR TOPICS]` },
  { id: "y02", collection: "youtube", category: "Visuals", title: "AI Visual Style Blueprint", summary: "JSON visual style guide for consistent AI images plus 10 reusable scene prompts.", fields: ["TOPIC", "CHANNEL EXAMPLES"], template: `You are an AI art director for faceless YouTube channels. Create a detailed JSON-formatted visual style guide I can paste into any AI image tool to get consistent results. Include: art style, color palette, character design rules, line weight, shading, and atmosphere. Then write 10 reusable scene prompts and a thumbnail style guide.\n\nMy niche: [TOPIC]\nChannels I like the look of: [1-3 EXAMPLES]` },
  { id: "y03", collection: "youtube", category: "CTR", title: "Viral Title & Thumbnail System", summary: "12 title formulas with matching thumbnail concepts and ranked variations for your first 5 videos.", fields: ["TOPIC", "FIRST 5 VIDEO IDEAS"], template: `You are a YouTube CTR specialist. Give me 12 proven title formulas for my niche with fill-in-the-blank templates. For each formula, describe the matching thumbnail concept (composition, text overlay, colors). Then write 3 title variations for my first 5 video topics and rank which will win.\n\nMy niche: [TOPIC]\nMy first 5 video ideas: [LIST THEM]` },
  { id: "y04", collection: "youtube", category: "Scripts", title: "AI Video Script Writer", summary: "Full production-ready script with 30-sec hook, visual tags, pattern interrupts, subscribe CTA.", fields: ["VIDEO TOPIC", "TARGET LENGTH", "VISUAL STYLE"], template: `You are a YouTube scriptwriter for faceless AI channels. Write a full production-ready script for my video. Include a 30-second hook, retention structure, and [VISUAL] tags at every scene break describing what the AI image should show. Add pattern interrupts every 60-90 seconds and one subscribe CTA at the optimal moment.\n\nVideo topic: [YOUR IDEA]\nTarget length: [MINUTES]\nVisual style: [YOUR STYLE]` },
  { id: "y05", collection: "youtube", category: "Workflow", title: "AI Production Pipeline", summary: "Idea to uploaded video in under 3 hours — exact tools, prompts, batch plan, cost breakdown.", fields: ["BUDGET", "VIDEOS/WEEK"], template: `You are an AI video production consultant. Build me a step-by-step workflow to go from topic idea to finished uploaded video in under 3 hours. Include the exact AI tools for each step (script, images, voiceover, music, captions, editing), copy-paste prompt templates, a batch production plan for 4-7 videos in one session, and a monthly cost breakdown.\n\nMy budget: [AMOUNT]\nUpload goal: [VIDEOS/WEEK]` },
  { id: "y06", collection: "youtube", category: "SEO", title: "YouTube SEO Playbook", summary: "20 keywords ranked by volume & competition, description template, Shorts-to-long funnel.", fields: ["TOPIC", "CHANNEL AGE"], template: `You are a YouTube SEO specialist. Give me 20 keywords in my niche ranked by search volume and competition. For each, tell me the search intent and whether a new channel can realistically rank. Then provide a description template, tag strategy, chapter marker guide, and a Shorts-to-long-form funnel plan.\n\nMy niche: [TOPIC]\nChannel age: [NEW / UNDER 1K / 1K-10K]` },
  { id: "y07", collection: "youtube", category: "Planning", title: "90-Day Content Calendar", summary: "Upload calendar for months 1-3 with series concepts and monetization milestone targets.", fields: ["TOPIC", "VIDEOS/WEEK"], template: `You are a content strategist for AI video channels. Build me a 90-day upload calendar. Month 1: 8-12 foundation titles to establish authority. Month 2: 8-12 titles based on what's working. Month 3: 8-12 titles that attract sponsors and push past monetization. Include 2 series concepts and milestone targets for each month.\n\nMy niche: [TOPIC]\nUpload capacity: [VIDEOS/WEEK]` },
  { id: "y08", collection: "youtube", category: "Analytics", title: "Retention Fixer", summary: "Fix the 5 biggest drop-off reasons with pattern interrupts and benchmark retention rates.", fields: ["AVERAGE RETENTION", "VIDEO LENGTH"], template: `You are a YouTube analytics expert. Tell me the 5 biggest reasons viewers drop off on faceless AI videos and how to fix each one. Include a pattern interrupt playbook with 8 techniques, pacing rules for AI visuals, voiceover optimization tips, and benchmark retention rates I should target by video length.\n\nMy average retention: [IF KNOWN]\nMy video length: [TYPICAL LENGTH]` },
  { id: "y09", collection: "youtube", category: "Growth", title: "Algorithm Cheat Sheet", summary: "4 ranking signals, best upload times, suggested video strategy, and 48-hour post-publish plan.", fields: ["TOPIC", "UPLOAD FREQUENCY"], template: `You are a YouTube algorithm researcher. Explain the 4 core ranking signals and which to prioritize as a new channel. Then give me: best upload days/times for my niche, how to get into suggested videos, playlist strategy for auto-play, and what to do in the first 48 hours after publishing to maximize distribution.\n\nMy niche: [TOPIC]\nUpload schedule: [FREQUENCY]` },
  { id: "y10", collection: "youtube", category: "Launch", title: "Full Channel Launch Plan", summary: "Complete 90-day plan: audit, week-by-week actions, solo production system, milestones.", fields: ["NICHE + VISUAL STYLE", "HOURS/WEEK", "90-DAY GOAL"], template: `You are an AI video channel consultant who has taken 20 channels from zero to monetization in 90 days. Give me a complete launch plan: honest audit of my idea, week-by-week actions for months 1-3, a production system for solo creators, milestone targets at day 30/60/90, and the single highest-impact thing I should do right now.\n\nMy channel idea: [NICHE + VISUAL STYLE]\nHours per week: [TIME]\nMy 90-day goal: [TARGET]` },
];

const categoryColors = {
  Strategy: "#C8A96E", Visuals: "#7B61FF", Hooks: "#00C9A7", Writing: "#FF4D6D",
  Systems: "#FFB800", Growth: "#3A86FF", Planning: "#06D6A0", Analytics: "#EF476F",
  Launch: "#9B5DE5", Monetize: "#F77F00", "Problem Structuring": "#E63946",
  "Market Analysis": "#457B9D", Communication: "#E76F51", "Portfolio Strategy": "#2A9D8F",
  "Research & Analysis": "#8338EC", "Competitive Intelligence": "#FB8500",
  "Strategic Assessment": "#023E8A", "Recommendation QA": "#D62828",
  "Operations Strategy": "#606C38", "Future Strategy": "#3A0CA3",
  "Org Design": "#4CC9F0", Master: "#111111", Sales: "#FF006E",
  Fundraising: "#8338EC", Operations: "#F4A261", Finance: "#2D6A4F",
  Research: "#0077B6", Product: "#7209B7", Validation: "#FF5733",
  Customer: "#0EA5E9", Pricing: "#FF0066", Workflow: "#D97706",
  CTR: "#0EA5E9", Scripts: "#059669", SEO: "#DC2626",
};

const VIEWS = { HOME: "home", COLLECTION: "collection", PROMPT: "prompt" };

export default function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [activeCollection, setActiveCollection] = useState(null);
  const [activePrompt, setActivePrompt] = useState(null);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [copied, setCopied] = useState(false);

  const copy = (t) => { navigator.clipboard.writeText(t); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  const collectionPrompts = useMemo(() =>
    activeCollection ? allPrompts.filter(p => p.collection === activeCollection.id) : [],
    [activeCollection]
  );

  const categories = useMemo(() => {
    const base = activeCollection ? collectionPrompts : allPrompts;
    return ["All", ...new Set(base.map(p => p.category))];
  }, [activeCollection, collectionPrompts]);

  const displayedPrompts = useMemo(() => {
    let base = activeCollection ? collectionPrompts : allPrompts;
    if (catFilter !== "All") base = base.filter(p => p.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      base = base.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.template.toLowerCase().includes(q)
      );
    }
    return base;
  }, [activeCollection, collectionPrompts, catFilter, search]);

  const openCollection = (col) => {
    setActiveCollection(col);
    setActivePrompt(null);
    setCatFilter("All");
    setView(VIEWS.COLLECTION);
  };

  const openPrompt = (prompt) => {
    setActivePrompt(prompt);
    setView(VIEWS.PROMPT);
  };

  const goHome = () => { setView(VIEWS.HOME); setActiveCollection(null); setActivePrompt(null); setCatFilter("All"); setSearch(""); };
  const goCollection = () => { setView(VIEWS.COLLECTION); setActivePrompt(null); };

  const promptIdx = activePrompt ? displayedPrompts.findIndex(p => p.id === activePrompt.id) : -1;
  const col = activePrompt ? collections.find(c => c.id === activePrompt.collection) : null;

  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EE", fontFamily: "'Georgia', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,700;0,900;1,900&family=Instrument+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: #D5CEBD; border-radius: 4px; }

        .frac { font-family: 'Fraunces', serif; }
        .mono { font-family: 'Instrument Mono', monospace; }

        .col-card {
          background: white; border: 1.5px solid #E8E2D8; border-radius: 14px;
          padding: 26px 24px; cursor: pointer; transition: all 0.18s ease; position: relative; overflow: hidden;
        }
        .col-card:hover { transform: translateY(-3px); box-shadow: 0 10px 35px rgba(0,0,0,0.08); border-color: var(--c); }

        .prompt-card {
          background: white; border: 1.5px solid #E8E2D8; border-radius: 10px;
          padding: 20px; cursor: pointer; transition: all 0.16s ease; position: relative;
        }
        .prompt-card:hover { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(0,0,0,0.07); border-color: var(--c); }
        .prompt-card.active { border-color: var(--c); box-shadow: 0 0 0 2.5px color-mix(in srgb, var(--c) 18%, transparent); }

        .search-input {
          font-family: 'Instrument Mono', monospace; font-size: 12px; letter-spacing: 0.3px;
          padding: 11px 18px 11px 42px; border: 1.5px solid #E8E2D8; border-radius: 30px;
          background: white; color: #333; width: 100%; max-width: 420px; outline: none;
          transition: border-color 0.15s;
        }
        .search-input:focus { border-color: #C8A96E; }
        .search-input::placeholder { color: #BBAE99; }

        .cat-pill {
          font-family: 'Instrument Mono', monospace; font-size: 8px; letter-spacing: 1.5px;
          text-transform: uppercase; padding: 4px 11px; border-radius: 20px;
          border: 1.5px solid #E8E2D8; background: none; color: #AAA; cursor: pointer; transition: all 0.14s;
        }
        .cat-pill:hover { color: #555; border-color: #BBB; }
        .cat-pill.on { color: white; border-color: transparent; }

        .nav-btn {
          font-family: 'Instrument Mono', monospace; font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          padding: 7px 14px; border-radius: 8px; border: 1.5px solid #E8E2D8;
          background: white; color: #888; cursor: pointer; transition: all 0.14s;
        }
        .nav-btn:hover { border-color: #999; color: #333; }

        .copy-btn {
          font-family: 'Instrument Mono', monospace; font-size: 10px; letter-spacing: 1.5px; text-transform: uppercase;
          padding: 12px 26px; border-radius: 9px; border: none; cursor: pointer; transition: all 0.15s;
        }
        .copy-btn:hover { opacity: 0.85; transform: translateY(-1px); }

        .breadcrumb-btn {
          font-family: 'Instrument Mono', monospace; font-size: 9px; letter-spacing: 1px; text-transform: uppercase;
          background: none; border: none; cursor: pointer; transition: color 0.13s;
        }

        .tbox {
          background: #F7F4EE; border: 1.5px solid #E8E2D8; border-radius: 9px;
          padding: 22px; font-family: 'Instrument Mono', monospace; font-size: 11px;
          line-height: 1.85; color: #555; white-space: pre-wrap; word-break: break-word;
          max-height: 400px; overflow-y: auto;
        }

        .field-tag {
          font-family: 'Instrument Mono', monospace; font-size: 8.5px; letter-spacing: 0.5px;
          padding: 4px 10px; border-radius: 6px; margin: 3px; display: inline-block; border: 1.5px dashed;
        }

        .fade-in { animation: fi 0.22s ease; }
        @keyframes fi { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }

        .slide-in { animation: si 0.2s ease; }
        @keyframes si { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }

        .count-badge {
          font-family: 'Instrument Mono', monospace; font-size: 9px; letter-spacing: 1px;
          padding: 3px 9px; border-radius: 20px; display: inline-block;
        }
      `}</style>

      {/* ── TOP NAV ── */}
      <div style={{ background: "#1A1710", borderBottom: "2px solid #111", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, position: "sticky", top: 0, zIndex: 100 }}>
        <button className="breadcrumb-btn" onClick={goHome} style={{ color: "#C8A96E", fontSize: 11, letterSpacing: 2 }}>
          ◈ PROMPT VAULT
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {view !== VIEWS.HOME && (
            <>
              <span className="mono" style={{ color: "#333", fontSize: 9 }}>/</span>
              <button className="breadcrumb-btn" onClick={view === VIEWS.PROMPT ? goCollection : goHome} style={{ color: "#666" }}>
                {activeCollection?.name || "All"}
              </button>
            </>
          )}
          {view === VIEWS.PROMPT && (
            <>
              <span className="mono" style={{ color: "#333", fontSize: 9 }}>/</span>
              <span className="mono" style={{ color: "#888", fontSize: 9 }}>{activePrompt?.title?.slice(0, 28)}{activePrompt?.title?.length > 28 ? "…" : ""}</span>
            </>
          )}
        </div>
        <div className="mono" style={{ fontSize: 9, color: "#3A3020", letterSpacing: 1 }}>
          {allPrompts.length} PROMPTS
        </div>
      </div>

      {/* ══════════════════════ HOME VIEW ══════════════════════ */}
      {view === VIEWS.HOME && (
        <div className="fade-in" style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 36px 80px" }}>

          {/* Hero */}
          <div style={{ marginBottom: 52, borderBottom: "1.5px solid #E8E2D8", paddingBottom: 40 }}>
            <div className="mono" style={{ fontSize: 9, letterSpacing: 3, color: "#BBAE99", marginBottom: 14, textTransform: "uppercase" }}>
              AI Prompt Vault · Built by Usama Akram & Adam.Digital
            </div>
            <h1 className="frac" style={{ fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 900, color: "#1A1710", lineHeight: 1.0, letterSpacing: "-1.5px", marginBottom: 16 }}>
              Every AI Prompt<br /><em style={{ color: "#C8A96E", fontStyle: "italic" }}>You'll Ever Need</em>
            </h1>
            <p className="mono" style={{ fontSize: 11, color: "#8A7A64", lineHeight: 1.8, maxWidth: 520 }}>
              {allPrompts.length} curated prompts across {collections.length} collections.<br />
              Strategy · Growth · Sales · Content · YouTube · Startup
            </p>

            {/* Global search */}
            <div style={{ position: "relative", marginTop: 28, display: "inline-block" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#BBB", fontSize: 14 }}>⌕</span>
              <input
                className="search-input"
                placeholder="Search all prompts…"
                value={search}
                onChange={e => { setSearch(e.target.value); if (e.target.value) { setView(VIEWS.COLLECTION); setActiveCollection(null); setCatFilter("All"); } }}
              />
            </div>
          </div>

          {/* Collections grid */}
          <div className="mono" style={{ fontSize: 9, letterSpacing: 2, color: "#BBAE99", textTransform: "uppercase", marginBottom: 18 }}>
            Collections
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16, marginBottom: 56 }}>
            {collections.map((col, i) => (
              <div key={col.id} className="col-card" style={{ "--c": col.color, animationDelay: `${i * 40}ms` }} onClick={() => openCollection(col)}>
                <div style={{ height: 4, background: col.color, borderRadius: 2, marginBottom: 20, width: 40 }} />
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                  <span style={{ fontSize: 28, lineHeight: 1, color: col.color }}>{col.icon}</span>
                  <span className="count-badge" style={{ background: col.color + "15", color: col.color }}>
                    {col.count} prompts
                  </span>
                </div>
                <div className="frac" style={{ fontSize: 20, fontWeight: 700, color: "#1A1710", marginBottom: 6, lineHeight: 1.2 }}>
                  {col.name}
                </div>
                <div className="mono" style={{ fontSize: 10, color: "#9A8A74", lineHeight: 1.6, marginBottom: 16 }}>
                  {col.description}
                </div>
                <div className="mono" style={{ fontSize: 8.5, color: "#C8B89A", letterSpacing: 1 }}>
                  by {col.author} →
                </div>
              </div>
            ))}
          </div>

          {/* All prompts mini-grid */}
          <div className="mono" style={{ fontSize: 9, letterSpacing: 2, color: "#BBAE99", textTransform: "uppercase", marginBottom: 18 }}>
            All Prompts — Quick Access
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 8 }}>
            {allPrompts.map(p => {
              const c = collections.find(c => c.id === p.collection);
              return (
                <div key={p.id} onClick={() => openPrompt(p)} style={{
                  padding: "12px 14px", background: "white", border: "1.5px solid #EDE8DF",
                  borderRadius: 8, cursor: "pointer", transition: "all 0.14s",
                  borderLeft: `3px solid ${c?.color || "#CCC"}`,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = c?.color; e.currentTarget.style.transform = "translateY(-1px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#EDE8DF"; e.currentTarget.style.borderLeftColor = c?.color; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div className="frac" style={{ fontSize: 12, fontWeight: 700, color: "#1A1710", lineHeight: 1.25, marginBottom: 4 }}>{p.title}</div>
                  <div className="mono" style={{ fontSize: 8, color: "#BBAE99", letterSpacing: 0.5 }}>{c?.name}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════ COLLECTION / SEARCH VIEW ══════════════════════ */}
      {view === VIEWS.COLLECTION && (
        <div className="fade-in" style={{ maxWidth: 1100, margin: "0 auto", padding: "36px 36px 80px" }}>

          {/* Header */}
          {activeCollection ? (
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 32, paddingBottom: 28, borderBottom: "1.5px solid #E8E2D8" }}>
              <div style={{ width: 52, height: 52, background: activeCollection.color + "15", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0, border: `1.5px solid ${activeCollection.color}33` }}>
                {activeCollection.icon}
              </div>
              <div>
                <h2 className="frac" style={{ fontSize: 32, fontWeight: 900, color: "#1A1710", lineHeight: 1.1, marginBottom: 4 }}>{activeCollection.name}</h2>
                <div className="mono" style={{ fontSize: 10, color: "#8A7A64" }}>{activeCollection.description} · {activeCollection.count} prompts</div>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom: 28, paddingBottom: 24, borderBottom: "1.5px solid #E8E2D8" }}>
              <h2 className="frac" style={{ fontSize: 28, fontWeight: 900, color: "#1A1710" }}>
                Search results for <em style={{ color: "#C8A96E" }}>"{search}"</em>
              </h2>
              <div className="mono" style={{ fontSize: 10, color: "#8A7A64", marginTop: 4 }}>{displayedPrompts.length} prompts found</div>
            </div>
          )}

          {/* Search + filters */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center", marginBottom: 24 }}>
            <div style={{ position: "relative" }}>
              <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#BBB", fontSize: 13 }}>⌕</span>
              <input className="search-input" placeholder="Search prompts…" value={search} onChange={e => setSearch(e.target.value)} style={{ maxWidth: 300 }} />
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {categories.map(c => {
                const cc = categoryColors[c] || "#999";
                return (
                  <button key={c} className={`cat-pill ${catFilter === c ? "on" : ""}`}
                    style={catFilter === c ? { background: cc, borderColor: cc } : {}}
                    onClick={() => setCatFilter(c)}>
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results count */}
          <div className="mono" style={{ fontSize: 8.5, color: "#BBAE99", letterSpacing: 1, marginBottom: 16 }}>
            {displayedPrompts.length} PROMPT{displayedPrompts.length !== 1 ? "S" : ""}
          </div>

          {/* Cards */}
          {displayedPrompts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <div className="frac" style={{ fontSize: 24, color: "#C8B89A", marginBottom: 8 }}>No prompts found</div>
              <div className="mono" style={{ fontSize: 10, color: "#BBAE99" }}>Try a different search or category</div>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
              {displayedPrompts.map((p) => {
                const c = collections.find(c => c.id === p.collection);
                const cc = categoryColors[p.category] || c?.color || "#999";
                return (
                  <div key={p.id} className="prompt-card" style={{ "--c": cc }} onClick={() => openPrompt(p)}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <span className="mono" style={{ fontSize: 8, letterSpacing: 1.5, color: "#BBAE99" }}>{p.id.toUpperCase()}</span>
                      <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                        {!activeCollection && <span className="mono" style={{ fontSize: 7.5, color: c?.color, background: c?.color + "15", padding: "2px 7px", borderRadius: 10 }}>{c?.name}</span>}
                        <span className="mono" style={{ fontSize: 7.5, color: cc, background: cc + "15", padding: "2px 7px", borderRadius: 10 }}>{p.category}</span>
                      </div>
                    </div>
                    <div className="frac" style={{ fontSize: 16, fontWeight: 700, color: "#1A1710", lineHeight: 1.2, marginBottom: 8 }}>{p.title}</div>
                    <div className="mono" style={{ fontSize: 9.5, color: "#8A7A64", lineHeight: 1.65, borderLeft: `2px solid ${cc}33`, paddingLeft: 10 }}>{p.summary}</div>
                    <div style={{ marginTop: 12, display: "flex", flexWrap: "wrap" }}>
                      {p.fields.slice(0, 2).map(f => (
                        <span key={f} style={{ fontFamily: "'Instrument Mono', monospace", fontSize: 7.5, padding: "2px 7px", borderRadius: 5, margin: 2, background: cc + "0F", color: cc, border: `1px solid ${cc}2A` }}>
                          {f.length > 22 ? f.slice(0, 22) + "…" : f}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════ PROMPT DETAIL VIEW ══════════════════════ */}
      {view === VIEWS.PROMPT && activePrompt && (
        <div className="slide-in" style={{ maxWidth: 720, margin: "0 auto", padding: "36px 36px 80px" }}>
          {/* Nav */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 32 }}>
            <div style={{ display: "flex", gap: 8 }}>
              {promptIdx > 0 && <button className="nav-btn" onClick={() => setActivePrompt(displayedPrompts[promptIdx - 1])}>← Prev</button>}
              {promptIdx < displayedPrompts.length - 1 && <button className="nav-btn" onClick={() => setActivePrompt(displayedPrompts[promptIdx + 1])}>Next →</button>}
            </div>
            <button className="nav-btn" onClick={goCollection}>← Back</button>
          </div>

          {/* Color block header */}
          {col && (
            <div style={{ padding: "22px 24px", borderRadius: 12, marginBottom: 28, background: col.color + "0C", border: `1.5px solid ${col.color}22` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
                <span className="mono" style={{ fontSize: 8, letterSpacing: 2, color: col.color, background: col.color + "18", padding: "3px 9px", borderRadius: 10 }}>{col.name}</span>
                <span className="mono" style={{ fontSize: 8, letterSpacing: 2, color: categoryColors[activePrompt.category] || "#888", background: (categoryColors[activePrompt.category] || "#888") + "15", padding: "3px 9px", borderRadius: 10 }}>{activePrompt.category}</span>
                <span className="mono" style={{ fontSize: 8, color: "#BBAE99", letterSpacing: 1 }}>{activePrompt.id.toUpperCase()}</span>
              </div>
              <h2 className="frac" style={{ fontSize: 30, fontWeight: 900, color: "#1A1710", lineHeight: 1.1 }}>{activePrompt.title}</h2>
            </div>
          )}

          <p className="mono" style={{ fontSize: 11, color: "#7A6A54", lineHeight: 1.75, marginBottom: 26 }}>{activePrompt.summary}</p>

          {/* Fields */}
          <div style={{ marginBottom: 24 }}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: 2, color: "#BBAE99", textTransform: "uppercase", marginBottom: 10 }}>Fill in before pasting</div>
            <div>
              {activePrompt.fields.map(f => (
                <span key={f} className="field-tag" style={{ color: col?.color || "#888", borderColor: (col?.color || "#888") + "55", background: (col?.color || "#888") + "08" }}>
                  [{f}]
                </span>
              ))}
            </div>
          </div>

          <div style={{ height: 1.5, background: "#E8E2D8", marginBottom: 22 }} />

          <div className="mono" style={{ fontSize: 8.5, letterSpacing: 2, color: "#BBAE99", textTransform: "uppercase", marginBottom: 10 }}>Full Prompt</div>
          <div className="tbox">{activePrompt.template}</div>

          <div style={{ marginTop: 18, display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <button className="copy-btn"
              style={{ background: copied ? (col?.color || "#1A1710") : "#1A1710", color: "#F7F4EE" }}
              onClick={() => copy(activePrompt.template)}>
              {copied ? "✓ Copied!" : "Copy Prompt"}
            </button>
            <span className="mono" style={{ fontSize: 9, color: "#BBAE99" }}>Paste into Claude or ChatGPT</span>
          </div>

          {/* Related */}
          <div style={{ marginTop: 48, paddingTop: 32, borderTop: "1.5px solid #E8E2D8" }}>
            <div className="mono" style={{ fontSize: 8.5, letterSpacing: 2, color: "#BBAE99", textTransform: "uppercase", marginBottom: 14 }}>
              More from {col?.name}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {allPrompts.filter(p => p.collection === activePrompt.collection && p.id !== activePrompt.id).slice(0, 4).map(p => (
                <div key={p.id} onClick={() => setActivePrompt(p)}
                  style={{ display: "flex", gap: 12, alignItems: "center", padding: "10px 12px", borderRadius: 8, cursor: "pointer", transition: "background 0.12s", border: "1.5px solid transparent" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "white"; e.currentTarget.style.borderColor = "#E8E2D8"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "transparent"; }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: col?.color, flexShrink: 0 }} />
                  <div className="frac" style={{ fontSize: 13, fontWeight: 700, color: "#1A1710" }}>{p.title}</div>
                  <span className="mono" style={{ fontSize: 8, color: "#BBAE99", marginLeft: "auto" }}>→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <div style={{ borderTop: "1.5px solid #E8E2D8", padding: "14px 40px", background: "#1A1710", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span className="mono" style={{ fontSize: 8.5, color: "#3A3020", letterSpacing: 1.5 }}>◈ PROMPT VAULT — {allPrompts.length} PROMPTS ACROSS {collections.length} COLLECTIONS</span>
        <span className="mono" style={{ fontSize: 8.5, color: "#3A3020", letterSpacing: 1.5 }}>BUILT FOR CLAUDE & CHATGPT</span>
      </div>
    </div>
  );
}
