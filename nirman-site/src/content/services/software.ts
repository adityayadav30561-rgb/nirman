import type { Service } from "./types";

// Software pillar: hub + 4 (P4.5). Results and mockup figures are SAMPLE data
// until real client results are supplied. Never name a price. Nirman CRM is
// only ever offered through "Book a demo".

export const softwareServices: Service[] = [
  {
    path: "/services/software/",
    kind: "hub",
    pillar: "software",
    name: "Custom software",
    serviceType: "Custom software development",
    visual: "software",
    content: {
      outcome:
        "Software built around how your business actually runs: CRMs, web apps, mobile apps and automations that replace spreadsheets and copy-paste.",
      segments: [
        {
          title: "Real estate and sales teams",
          photo: "modernHome",
          search: "3bhk flat in baner",
          problem:
            "Leads arrive from the website, property portals and calls, and get followed up from sticky notes and personal phones.",
          outcomes: [
            "Every lead in one place, assigned within minutes",
            "Site visits and follow-ups that never slip",
            "A pipeline the owner can check on a phone",
          ],
        },
        {
          title: "Manufacturers and B2B suppliers",
          photo: "carpenter",
          search: "custom furniture manufacturer",
          problem: "Orders, production and stock live in Excel files that only one person really understands.",
          outcomes: [
            "Orders, production and stock in one system",
            "Live status for every job",
            "Reports without anyone compiling them",
          ],
        },
        {
          title: "Schools, clinics and service businesses",
          photo: "students",
          search: "cbse school admissions pune",
          problem: "Admissions, appointments and bookings are handled by phone calls and paper registers.",
          outcomes: [
            "Online forms and bookings that fill your system",
            "Reminders and updates sent automatically",
            "Records that are easy to find and share",
          ],
        },
        {
          title: "Startups building a product",
          photo: "devTeam",
          search: "app to book home cleaning",
          problem: "You have a product idea and early customers, but no team to design, build and launch it.",
          outcomes: [
            "A focused first version, launched quickly",
            "Built on modern, well-supported technology",
            "A team that stays for what comes next",
          ],
        },
      ],
      deliverables: [],
      process: [
        {
          title: "Discovery",
          body: "We map how work happens today, agree what the first version must do, and write it down as a scope you sign off.",
          duration: "Weeks 1–2",
          photo: "whiteboard",
          art: "sw-scope",
        },
        {
          title: "Design",
          body: "User flows and screens for every role, tested with the people who will use them.",
          duration: "Weeks 2–4",
          photo: "sketching",
          art: "sw-flow",
        },
        {
          title: "Build in sprints",
          body: "Two-week sprints, each ending in a demo of working software you can click through.",
          duration: "Two-week sprints",
          photo: "codeScreen",
          art: "sw-sprint",
        },
        {
          title: "Test and launch",
          body: "Automated and manual testing on real devices and real data, then a planned go-live with training.",
          duration: "Final 2 weeks",
          photo: "dualMonitors",
          art: "sw-qa",
        },
        {
          title: "Support and grow",
          body: "Monitoring, fixes and new features, with a short report every month.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "sw-support",
        },
      ],
      reports: [
        {
          art: "sw-scope",
          title: "Scope document",
          body: "Every feature of the first version with its priority and estimate, agreed before we write any code.",
          points: ["Features ranked must, should and could", "Estimates and phases", "Signed off by you"],
        },
        {
          art: "sw-sprint",
          title: "Sprint board",
          body: "A live board you can open any time, plus a demo of working software every two weeks.",
          points: ["What is planned, in progress and done", "Demo at the end of each sprint", "Progress against the plan"],
        },
        {
          art: "sw-qa",
          title: "Test report",
          body: "Proof each release works before it reaches your team or customers.",
          points: ["Automated tests and coverage", "Devices and browsers tested", "Key journeys checked by hand"],
        },
        {
          art: "sw-support",
          title: "Support report",
          body: "After launch, a monthly report on uptime, fixes and the features released.",
          points: ["Uptime and response times", "Tickets raised and resolved", "Released and planned features"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "12 h",
          label: "of data entry saved each week",
          context: "Sample figure for a furniture manufacturer. Not a real client yet.",
        },
        {
          sample: true,
          metric: "2 min",
          label: "average first reply to a new lead",
          context: "Sample figure for a real estate developer. Not a real client yet.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Flutter", "React Native", "Firebase", "Docker", "AWS", "Figma"],
      faqs: [
        {
          q: "How long does custom software take?",
          a: "A focused first version usually takes 8 to 16 weeks. Bigger systems are split into phases, so your team starts using something useful early.",
        },
        {
          q: "Should we build custom software or buy a ready product?",
          a: "If a ready product does most of what you need, buy it. Custom makes sense when your process is what sets you apart, or when you are paying for several tools that don't talk to each other. We will tell you honestly which fits.",
        },
        {
          q: "Do we own the code?",
          a: "Yes. The code lives in a repository in your name, along with the hosting accounts and data. You can take it to another team at any time.",
        },
        {
          q: "How do we know the project is on track?",
          a: "You get access to the sprint board, a demo of working software every two weeks, and a short written update every week.",
        },
        {
          q: "Can you take over software another team built?",
          a: "Yes. We start with a code and security review, fix anything urgent, then continue development or support.",
        },
        {
          q: "What happens after launch?",
          a: "We stay on for monitoring, fixes and new features on a monthly support plan, or hand everything over to your own team with documentation.",
        },
        {
          q: "Do you work with clients outside India?",
          a: "Yes. We build software for clients in the US, UAE, UK and elsewhere, working remotely from India, with calls in your time zone.",
        },
      ],
    },
  },
  {
    path: "/services/software/crm-development/",
    kind: "detail",
    pillar: "software",
    name: "CRM development",
    serviceType: "CRM development",
    visual: "automation",
    card: { art: "sw-pipeline" },
    content: {
      outcome:
        "A CRM shaped around your sales process, or Nirman CRM extended to fit it, so every lead is followed up and nothing lives in spreadsheets.",
      segments: [
        {
          title: "Real estate developers and brokers",
          photo: "modernHome",
          search: "2bhk flats in wakad",
          problem: "Enquiries come from portals, the website and walk-ins, and agents keep them in their own phones.",
          outcomes: [
            "Every enquiry captured and assigned automatically",
            "Site visits booked with reminders",
            "An owner's view of the pipeline and each agent's follow-ups",
          ],
        },
        {
          title: "Manufacturers and distributors",
          photo: "warehouse",
          search: "industrial valves supplier",
          problem: "Enquiries arrive from IndiaMART, email and calls, quotes are typed in Word, and nobody knows which deals are close.",
          outcomes: [
            "IndiaMART and email leads in one pipeline",
            "Quotes generated from your own templates",
            "A follow-up reminder for every open quote",
          ],
        },
        {
          title: "Education and coaching",
          photo: "students",
          search: "neet coaching in kota",
          problem: "Admission season brings thousands of enquiries, and counsellors can't keep up.",
          outcomes: [
            "Enquiries sorted by course and city",
            "Counsellor assignment and call notes",
            "WhatsApp and email follow-ups that run themselves",
          ],
        },
        {
          title: "Clinics and healthcare",
          photo: "doctor",
          search: "ivf clinic in pune",
          problem: "Patient enquiries arrive by phone and WhatsApp, and follow-up depends on someone remembering.",
          outcomes: [
            "Every enquiry logged with where it came from",
            "Appointment reminders sent automatically",
            "Reports on which channels bring patients",
          ],
        },
      ],
      deliverables: [
        {
          title: "Sales process mapping",
          body: "Your stages, rules and hand-offs written down with your team before anything is built.",
        },
        {
          title: "Lead capture",
          body: "Website forms, IndiaMART, JustDial, email and missed calls flowing into one place, with the source recorded.",
        },
        {
          title: "Pipeline and stages",
          body: "Stages, fields and views designed for each team, from first enquiry to closed deal.",
        },
        {
          title: "Assignment rules",
          body: "Leads routed by city, product or turn, so the right person picks them up within minutes.",
        },
        {
          title: "WhatsApp and email follow-ups",
          body: "Templates and timed sequences sent from the CRM, with every message logged against the lead.",
        },
        {
          title: "Quotations and payments",
          body: "Quotation PDFs from your templates, with payment links through Razorpay or your gateway.",
        },
        {
          title: "Reports and dashboards",
          body: "Conversion by source, follow-ups due and each person's pipeline, on desktop and phone.",
        },
        {
          title: "Roles and mobile access",
          body: "Permissions for owners, managers and agents, and screens that work well on a phone.",
        },
        {
          title: "Data migration",
          body: "Your existing leads and customers imported from Excel or your old CRM, cleaned and de-duplicated.",
        },
      ],
      process: [
        {
          title: "Map your process",
          body: "Workshops with your sales team to agree stages, rules and must-have features.",
          duration: "Week 1",
          photo: "whiteboard",
          art: "sw-scope",
        },
        {
          title: "Design the screens",
          body: "Lead, pipeline and report screens designed and clicked through with the people who will use them.",
          duration: "Weeks 2–3",
          photo: "sketching",
          art: "sw-flow",
        },
        {
          title: "Build and connect",
          body: "The CRM built in sprints and connected to your website, lead sources and payment gateway.",
          duration: "Weeks 3–8",
          photo: "codeScreen",
          art: "sw-integrations",
        },
        {
          title: "Import and train",
          body: "Your data imported, then hands-on training for each role before go-live.",
          duration: "Weeks 8–9",
          photo: "teamCollab",
          art: "sw-pipeline",
        },
        {
          title: "Support",
          body: "Fixes, changes and new reports as your team settles in.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "sw-support",
        },
      ],
      reports: [
        {
          art: "sw-pipeline",
          title: "Your pipeline",
          body: "Every lead from enquiry to booking, with the next follow-up due and who owns it.",
          points: ["Stages built for your process", "Source and owner on every lead", "Reminders for each follow-up"],
        },
        {
          art: "sw-scope",
          title: "Scope document",
          body: "The features of your CRM, agreed and prioritised before we build.",
          points: ["Must-have features first", "Estimates and phases", "Signed off by your sales head"],
        },
        {
          art: "sw-integrations",
          title: "Integrations",
          body: "The tools connected to your CRM, with a log of every sync so nothing goes missing quietly.",
          points: ["Website, IndiaMART and payments connected", "Live sync log", "Alerts if a connection stops"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "2 min",
          label: "average first reply to a new lead",
          context: "Sample figure for a real estate developer. Not a real client yet.",
        },
        {
          sample: true,
          metric: "31%",
          label: "more site visits booked",
          context: "Sample figure for the same developer over 3 months. Not a real client yet.",
        },
      ],
      stack: ["Nirman CRM", "Next.js", "Node.js", "PostgreSQL", "Razorpay", "IndiaMART", "Google Sheets", "Gmail", "Zoho Books"],
      faqs: [
        {
          q: "Should we use Nirman CRM or build a custom CRM?",
          a: "If your sales follow the usual path from enquiry to follow-up to deal, start with Nirman CRM: it is ready now, with WhatsApp and email built in. Book a demo to see it. If your process is unusual, we customise Nirman CRM or build a CRM from scratch.",
        },
        {
          q: "Can it connect to the tools we already use?",
          a: "Yes. Website forms, IndiaMART, JustDial, Razorpay, Tally, Zoho Books, Google Sheets and email are common. Most tools with an API can be connected.",
        },
        {
          q: "Can we bring our data from Excel or our old CRM?",
          a: "Yes. We import leads, customers and history, clean duplicates and map old stages to new ones before go-live.",
        },
        {
          q: "Will our sales team actually use it?",
          a: "Teams use a CRM when it saves them effort. We design it with them, keep screens simple on a phone, and train each role before launch.",
        },
        {
          q: "Who owns the CRM and the data?",
          a: "You do. The data is yours and can be exported at any time. For a custom CRM, the code is in a repository in your name.",
        },
        {
          q: "How long does it take?",
          a: "Most CRMs take 6 to 10 weeks from the first workshop to go-live. Extra integrations or migrations can add time, and you get a plan before we start.",
        },
      ],
    },
  },
  {
    path: "/services/software/web-apps/",
    kind: "detail",
    pillar: "software",
    name: "Web apps and SaaS",
    serviceType: "Web application and SaaS development",
    visual: "software",
    card: { art: "sw-dashboard" },
    content: {
      outcome:
        "Web applications and SaaS products that are fast, secure and pleasant to use, from the first version to thousands of users.",
      segments: [
        {
          title: "Startups launching a SaaS",
          photo: "devTeam",
          search: "gst invoicing software for freelancers",
          problem: "You've validated the idea and need a product customers will pay for, without hiring a full team first.",
          outcomes: [
            "A focused first version, launched quickly",
            "Sign-up, billing and onboarding done properly",
            "A codebase that is ready to grow",
          ],
        },
        {
          title: "Businesses running on spreadsheets",
          photo: "laptopDashboard",
          search: "logistics company in pune",
          problem: "Operations run on shared Excel files, emails and calls, and mistakes slip through every week.",
          outcomes: [
            "One system for orders, people and stock",
            "Roles, so each person sees what they need",
            "Live dashboards instead of weekly reports",
          ],
        },
        {
          title: "Firms needing a client portal",
          photo: "consultant",
          search: "insurance broker in mumbai",
          problem: "Clients email and call for documents, status updates and invoices that they could see for themselves.",
          outcomes: [
            "A secure portal for documents and status",
            "Fewer status-update calls",
            "Notifications when something changes",
          ],
        },
        {
          title: "Products that outgrew version one",
          photo: "dualMonitors",
          search: "online exam platform for schools",
          problem: "The first version works, but it's slow, hard to change and struggles as more people use it.",
          outcomes: [
            "Performance and security reviewed",
            "Rebuilt in stages, without downtime",
            "Tests and monitoring in place",
          ],
        },
      ],
      deliverables: [
        {
          title: "Product discovery",
          body: "Users, jobs to be done and the smallest version worth launching, agreed in a written scope.",
        },
        {
          title: "UX and UI design",
          body: "User flows and screens for every role, tested in a clickable prototype before we build.",
        },
        {
          title: "Front end",
          body: "Fast, accessible interfaces in React and Next.js that work on desktop, tablet and phone.",
        },
        {
          title: "Back end and APIs",
          body: "Secure APIs, a well-designed database and background jobs that keep the app responsive.",
        },
        {
          title: "Accounts and billing",
          body: "Sign-up, teams and roles, plus subscriptions and invoices through Stripe or Razorpay.",
        },
        {
          title: "Integrations",
          body: "Connections to payment gateways, email, accounting tools and the systems you already use.",
        },
        {
          title: "Testing",
          body: "Automated tests on every change, plus manual checks of the journeys that matter most.",
        },
        {
          title: "Hosting and DevOps",
          body: "Cloud hosting, automatic deployments, backups and staging environments, set up in your accounts.",
        },
        {
          title: "Monitoring and analytics",
          body: "Error alerts, uptime checks and product analytics, so problems are caught before users report them.",
        },
      ],
      process: [
        {
          title: "Discovery",
          body: "Users, goals and the first version's scope, written down and signed off.",
          duration: "Weeks 1–2",
          photo: "whiteboard",
          art: "sw-scope",
        },
        {
          title: "Design",
          body: "Flows and screens for each role, tested in a clickable prototype.",
          duration: "Weeks 2–4",
          photo: "sketching",
          art: "sw-flow",
        },
        {
          title: "Build in sprints",
          body: "Working software every two weeks, demoed to you and deployed to a staging site.",
          duration: "Two-week sprints",
          photo: "codeScreen",
          art: "sw-sprint",
        },
        {
          title: "Test and launch",
          body: "Load, security and user testing, then a planned launch.",
          duration: "Final 2 weeks",
          photo: "dualMonitors",
          art: "sw-qa",
        },
        {
          title: "Support and grow",
          body: "Monitoring, fixes and new features released every month.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "sw-support",
        },
      ],
      reports: [
        {
          art: "sw-dashboard",
          title: "Your product",
          body: "A web app built around your users' daily work, with the numbers that matter on the first screen.",
          points: ["Dashboards for each role", "Fast search and filters", "Works on desktop and phone"],
        },
        {
          art: "sw-sprint",
          title: "Sprint board",
          body: "A live view of the work, and a demo of working software every two weeks.",
          points: ["Planned, in progress and done", "Sprint demos", "Progress against the scope"],
        },
        {
          art: "sw-qa",
          title: "Test report",
          body: "Every release checked with automated tests and by hand before it goes live.",
          points: ["Tests passed and coverage", "Browsers and devices", "Performance checks"],
        },
        {
          art: "sw-support",
          title: "Support report",
          body: "A short monthly report on uptime, tickets and what was released.",
          points: ["Uptime and response times", "Tickets resolved", "Releases and plans"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "8 h",
          label: "a week saved on manual reporting",
          context: "Sample figure for a logistics company. Not a real client yet.",
        },
        {
          sample: true,
          metric: "1.2 s",
          label: "average page load for signed-in users",
          context: "Sample figure for a SaaS product. Not a real client yet.",
        },
      ],
      stack: ["Next.js", "React", "TypeScript", "Node.js", "PostgreSQL", "Redis", "Stripe", "Razorpay", "Docker", "Vercel", "Sentry"],
      faqs: [
        {
          q: "How long does a first version take?",
          a: "Most first versions take 10 to 16 weeks, depending on how many roles and integrations they need. We help you cut the scope to what customers need first.",
        },
        {
          q: "Who owns the code and the product?",
          a: "You do. The code, designs, hosting accounts and data are in your name from day one.",
        },
        {
          q: "Which technology do you use?",
          a: "Usually Next.js and React on the front end, Node.js and PostgreSQL behind it, hosted on Vercel or AWS. We pick well-supported tools that other developers can work with too.",
        },
        {
          q: "Will it cope as we grow?",
          a: "We design the database and APIs for growth from the start, add caching where it helps, and load-test before launch.",
        },
        {
          q: "Can you work with our in-house developers?",
          a: "Yes. We can lead the build, work alongside your team in the same repository, or review and support their work.",
        },
        {
          q: "Is our data secure?",
          a: "We follow common security practice: encrypted connections, hashed passwords, role-based access, regular backups and dependency updates. We can also support your own security reviews.",
        },
      ],
    },
  },
  {
    path: "/services/software/mobile-apps/",
    kind: "detail",
    pillar: "software",
    name: "Mobile apps",
    serviceType: "Mobile app development",
    visual: "apps",
    card: { art: "sw-app" },
    content: {
      outcome:
        "iOS and Android apps people keep on their home screen, built around a few tasks done really well.",
      segments: [
        {
          title: "Delivery and ordering businesses",
          photo: "shopperPhone",
          search: "order groceries online pune",
          problem: "Customers order by phone or WhatsApp, and every order is typed in by hand.",
          outcomes: [
            "Ordering and payment in a few taps",
            "Live order tracking",
            "Notifications for offers and updates",
          ],
        },
        {
          title: "Clinics and service providers",
          photo: "doctorSmile",
          search: "physiotherapist at home near me",
          problem: "Patients call to book, reschedule and ask for reports, so the front desk is always on the phone.",
          outcomes: [
            "Booking and rescheduling in the app",
            "Reports and prescriptions in one place",
            "Reminders that cut no-shows",
          ],
        },
        {
          title: "Field and service teams",
          photo: "electrician",
          search: "ac repair service near me",
          problem: "Technicians get jobs by phone, fill paper job cards and report back at the end of the day.",
          outcomes: [
            "Jobs assigned to the right person's phone",
            "Photos, signatures and payments on site",
            "Works on weak signal and syncs later",
          ],
        },
        {
          title: "Founders with an app idea",
          photo: "phoneLaptop",
          search: "app to split rent with flatmates",
          problem: "You have an idea for an app and need it designed, built and published on both stores.",
          outcomes: [
            "One codebase for iOS and Android",
            "Design tested with real users first",
            "App Store and Play Store launch handled",
          ],
        },
      ],
      deliverables: [
        {
          title: "App strategy and UX",
          body: "The few tasks your app must do brilliantly, mapped into flows and tested with real users.",
        },
        {
          title: "UI design",
          body: "Screens designed for iOS and Android conventions, in your brand, with a clickable prototype.",
        },
        {
          title: "Cross-platform development",
          body: "One codebase in Flutter or React Native for both stores, with native code where it matters.",
        },
        {
          title: "Device features",
          body: "Camera, maps, location, payments, biometrics and push notifications, built in properly.",
        },
        {
          title: "Back end and admin panel",
          body: "The server, database and a web admin panel your team uses to manage orders, users and content.",
        },
        {
          title: "Offline mode",
          body: "Key screens that work without signal and sync safely when the connection returns.",
        },
        {
          title: "Testing on real devices",
          body: "Automated tests plus checks on common iPhones and Android phones, including budget models.",
        },
        {
          title: "Store launch",
          body: "App Store and Play Store listings, screenshots, review submission and release management.",
        },
        {
          title: "Analytics and crash reports",
          body: "Usage analytics and crash reporting, so you know what people use and what breaks.",
        },
      ],
      process: [
        {
          title: "Discovery",
          body: "Users, core tasks and the first release scope, agreed in writing.",
          duration: "Weeks 1–2",
          photo: "whiteboard",
          art: "sw-scope",
        },
        {
          title: "Design and prototype",
          body: "Flows and screens, tested as a clickable prototype on your phone.",
          duration: "Weeks 2–4",
          photo: "sketching",
          art: "sw-flow",
        },
        {
          title: "Build",
          body: "The app, back end and admin panel built in two-week sprints with test builds you can install.",
          duration: "Weeks 4–12",
          photo: "codeScreen",
          art: "sw-sprint",
        },
        {
          title: "Test on devices",
          body: "Real devices, slow networks and edge cases, plus a beta with a small group of users.",
          duration: "Weeks 12–14",
          photo: "dualMonitors",
          art: "sw-qa",
        },
        {
          title: "Launch and improve",
          body: "Store submission, launch, then regular updates based on reviews and analytics.",
          duration: "Week 14 onwards",
          photo: "celebrate",
          art: "sw-app",
        },
      ],
      reports: [
        {
          art: "sw-app",
          title: "Release status",
          body: "Each release, its status on both stores, and how stable and well rated the app is.",
          points: ["App Store and Play Store status", "Crash-free users", "Ratings and reviews"],
        },
        {
          art: "sw-qa",
          title: "Test report",
          body: "Devices, networks and journeys tested before each release goes out.",
          points: ["Tests passed and coverage", "Devices tested", "Key journeys checked by hand"],
        },
        {
          art: "sw-flow",
          title: "User flow",
          body: "How people move through the app, agreed and tested before we build it.",
          points: ["Every screen and step", "Tested with real users", "Changes tracked in one place"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "99.8%",
          label: "crash-free users",
          context: "Sample figure for an ordering app. Not a real client yet.",
        },
        {
          sample: true,
          metric: "4.7",
          label: "average store rating",
          context: "Sample figure for the same app after 6 months. Not a real client yet.",
        },
      ],
      stack: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "Node.js", "PostgreSQL", "App Store", "Google Play", "Sentry"],
      faqs: [
        {
          q: "Flutter, React Native or native apps?",
          a: "For most business apps, Flutter or React Native gives one codebase for iOS and Android with a native feel. Fully native apps make sense for heavy graphics or deep device features. We recommend one after discovery.",
        },
        {
          q: "How long does an app take?",
          a: "A focused first release usually takes 12 to 16 weeks, including design, testing and store review.",
        },
        {
          q: "Do you handle the App Store and Play Store?",
          a: "Yes. We prepare the listings and screenshots, submit for review and handle the release. The developer accounts are in your name.",
        },
        {
          q: "Do we also get an admin panel?",
          a: "Yes, when the app needs one. Most do: a web panel for managing users, orders, content and notifications.",
        },
        {
          q: "What about updates after launch?",
          a: "Phones and store rules change every year, so apps need regular updates. We offer monthly support for updates, fixes and new features.",
        },
        {
          q: "Who owns the app?",
          a: "You do: the code, the store listings and the user data. Everything is set up in your accounts.",
        },
      ],
    },
  },
  {
    path: "/services/software/automation-integrations/",
    kind: "detail",
    pillar: "software",
    name: "Automation and integrations",
    serviceType: "Business process automation and software integration",
    visual: "automation",
    card: { art: "sw-workflow" },
    content: {
      outcome: "Your tools talk to each other, so data is typed once and routine work happens on its own.",
      segments: [
        {
          title: "Teams retyping the same data",
          photo: "packingLabel",
          search: "office supplies wholesaler",
          problem: "Orders are copied from the website into Excel, then into Tally, then into a WhatsApp message.",
          outcomes: [
            "Data entered once and synced everywhere",
            "Fewer typing mistakes",
            "Hours back every week",
          ],
        },
        {
          title: "Sales teams losing leads",
          photo: "phoneLaptop",
          search: "solar installation company",
          problem: "Leads from IndiaMART, JustDial and the website land in different inboxes, and some never get a reply.",
          outcomes: [
            "Every lead in one place within seconds",
            "Assigned automatically to the right person",
            "An instant reply by WhatsApp or email",
          ],
        },
        {
          title: "Accounts and finance",
          photo: "contractSign",
          search: "chartered accountant firm",
          problem: "Payments, invoices and reminders are matched by hand at the end of every month.",
          outcomes: [
            "Invoices created when payment arrives",
            "Payment reminders sent on schedule",
            "Books updated in Tally or Zoho",
          ],
        },
        {
          title: "Operations and HR",
          photo: "teamCollab",
          search: "facility management company",
          problem: "Approvals, onboarding and daily reports depend on long email threads and someone remembering.",
          outcomes: [
            "Approvals routed automatically",
            "Onboarding checklists that run themselves",
            "Daily reports in your inbox",
          ],
        },
      ],
      deliverables: [
        {
          title: "Process audit",
          body: "Where time goes today: the copying, chasing and checking that could happen on its own.",
        },
        {
          title: "Workflow design",
          body: "Each automation drawn out step by step, with what happens when something fails.",
        },
        {
          title: "No-code automations",
          body: "Workflows in tools like n8n or Make where they are the quickest and simplest option.",
        },
        {
          title: "Custom integrations",
          body: "Code-based connections and APIs where no-code tools fall short or volumes are high.",
        },
        {
          title: "Lead routing",
          body: "Leads from every source captured, de-duplicated and assigned, with an instant first reply.",
        },
        {
          title: "Accounting sync",
          body: "Payments, invoices and customers kept in step with Tally or Zoho Books.",
        },
        {
          title: "Alerts and monitoring",
          body: "Failed runs retried automatically, and a person alerted if something keeps failing.",
        },
        {
          title: "Documentation and handover",
          body: "Plain-language notes on what each automation does, so your team can trust and adjust it.",
        },
      ],
      process: [
        {
          title: "Map the work",
          body: "We sit with the people doing the work and list what is copied, chased or checked by hand.",
          duration: "Week 1",
          photo: "whiteboard",
          art: "sw-scope",
        },
        {
          title: "Design the workflows",
          body: "Each automation designed step by step, including what happens when something goes wrong.",
          duration: "Week 2",
          photo: "stickyWall",
          art: "sw-workflow",
        },
        {
          title: "Build and connect",
          body: "Automations and integrations built, connected to your tools and secured.",
          duration: "Weeks 2–5",
          photo: "codeScreen",
          art: "sw-integrations",
        },
        {
          title: "Test with real data",
          body: "Run side by side with the manual process until the numbers match.",
          duration: "Weeks 5–6",
          photo: "dualMonitors",
          art: "sw-qa",
        },
        {
          title: "Monitor",
          body: "Runs watched, failures retried and a monthly report on what was automated.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "sw-support",
        },
      ],
      reports: [
        {
          art: "sw-workflow",
          title: "Workflow and runs",
          body: "Each automation step by step, with a log of every run and the time it saved.",
          points: ["Trigger and actions", "Every run logged", "Time saved each month"],
        },
        {
          art: "sw-integrations",
          title: "Integration log",
          body: "Every connected tool and a live log of the data moving between them.",
          points: ["Connection status", "Sync log with results", "Alerts when a sync stops"],
        },
        {
          art: "sw-support",
          title: "Monthly report",
          body: "Runs, failures, fixes and the next processes to automate.",
          points: ["Runs and success rate", "Issues and fixes", "What to automate next"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "14 h",
          label: "of manual work saved each month",
          context: "Sample figure for an office supplies wholesaler. Not a real client yet.",
        },
        {
          sample: true,
          metric: "40 s",
          label: "from enquiry to first reply",
          context: "Sample figure for a solar installer. Not a real client yet.",
        },
      ],
      stack: ["n8n", "Make", "Node.js", "Google Sheets", "Gmail", "Zoho Books", "Tally", "Razorpay", "IndiaMART", "Nirman CRM"],
      faqs: [
        {
          q: "No-code tools or custom code?",
          a: "No-code tools such as n8n or Make are quick to build and easy to adjust. Custom code suits high volumes, complex logic or tools without ready connectors. Many projects use both.",
        },
        {
          q: "Which tools can you connect?",
          a: "Most tools with an API or webhooks: website forms, IndiaMART, JustDial, Razorpay, Tally, Zoho, Google Workspace, email and your CRM. If a tool has no API, we look at other options such as scheduled exports.",
        },
        {
          q: "What happens if an automation breaks?",
          a: "Failed runs are retried automatically and logged. If something keeps failing, the right person gets an alert, and on a support plan we fix it.",
        },
        {
          q: "Can WhatsApp messages be automated?",
          a: "Yes, through the official WhatsApp Business API with message templates approved by WhatsApp, usually sent through Nirman CRM.",
        },
        {
          q: "Do we have to change the tools we use?",
          a: "Usually not. The point is to connect what you already have. We only suggest a change when a tool is the real bottleneck.",
        },
        {
          q: "Is our data safe?",
          a: "Connections use secure keys stored in one place, with access limited to what each automation needs, and logs you can review.",
        },
      ],
    },
  },
];
