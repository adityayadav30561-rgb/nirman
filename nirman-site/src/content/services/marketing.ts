import type { Service } from "./types";

// Marketing pillar: hub + 2 (P4.6). Not offered: PPC and social media
// marketing (client rule), so nothing here may suggest them. Campaigns run
// from Nirman CRM, offered only through "Book a demo". Results and mockup
// figures are SAMPLE data. Never name a price.

export const marketingServices: Service[] = [
  {
    path: "/services/marketing/",
    kind: "hub",
    pillar: "marketing",
    name: "Marketing automation",
    serviceType: "Marketing automation via CRM",
    visual: "marketing",
    content: {
      outcome:
        "Turn enquiries into customers and customers into repeat buyers, with WhatsApp and email campaigns that run from Nirman CRM.",
      segments: [
        {
          title: "Online stores and D2C brands",
          photo: "shopperPhone",
          search: "handmade ceramic mugs",
          problem: "Customers buy once and never hear from you again, and abandoned carts are simply lost.",
          outcomes: [
            "Abandoned-cart reminders by WhatsApp and email",
            "Offers to past buyers at the right moment",
            "Orders from every campaign tracked",
          ],
        },
        {
          title: "Real estate and high-value sales",
          photo: "modernHome",
          search: "3bhk flat in baner",
          problem: "Enquiries go cold because follow-ups depend on busy agents remembering to send them.",
          outcomes: [
            "An instant reply to every enquiry",
            "Follow-ups that run until someone replies",
            "Interested leads handed straight to sales",
          ],
        },
        {
          title: "Education and coaching",
          photo: "students",
          search: "jee coaching in pune",
          problem: "Admission season floods you with enquiries, and most never hear back after the first call.",
          outcomes: [
            "Course details sent the moment someone asks",
            "Reminders before deadlines and demo classes",
            "Counsellors alerted when a parent replies",
          ],
        },
        {
          title: "Restaurants, clinics and local businesses",
          photo: "restaurantOwner",
          search: "family restaurant near me",
          problem: "Regulars drift away, and there's no simple way to tell them about offers or remind them to come back.",
          outcomes: [
            "Offers to regulars who opted in",
            "Booking and appointment reminders",
            "Review requests after each visit",
          ],
        },
      ],
      deliverables: [],
      process: [
        {
          title: "Plan",
          body: "Your customers, their journey and a calendar of campaigns and automations for the first three months.",
          duration: "Week 1",
          photo: "stickyWall",
          art: "mk-calendar",
        },
        {
          title: "Set up",
          body: "WhatsApp Business API, your email domain and Nirman CRM connected to your website, store or forms.",
          duration: "Weeks 1–2",
          photo: "codeScreen",
          art: "mk-deliverability",
        },
        {
          title: "Build journeys",
          body: "Welcome, follow-up, abandoned-cart and win-back journeys that run on their own.",
          duration: "Weeks 2–3",
          photo: "whiteboard",
          art: "mk-journey",
        },
        {
          title: "Launch campaigns",
          body: "Broadcasts and newsletters written, designed and sent to the right audience.",
          duration: "Week 4 onwards",
          photo: "phoneLaptop",
          art: "mk-broadcast",
        },
        {
          title: "Report and improve",
          body: "A monthly report on replies, orders and bookings, and changes to what isn't working.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "mk-report",
        },
      ],
      reports: [
        {
          art: "mk-report",
          title: "Campaign report",
          body: "Every campaign on WhatsApp and email side by side, measured by orders and bookings, not only opens.",
          points: ["Sent, read and opened", "Replies and orders per campaign", "Unsubscribes and list health"],
        },
        {
          art: "mk-journey",
          title: "Automated journeys",
          body: "The follow-ups that run on their own, with how many people are in each and what they did.",
          points: ["Each step and its timing", "People in the journey", "Replies and bookings"],
        },
        {
          art: "mk-segments",
          title: "Audiences",
          body: "Lists built from your CRM data, so each message goes to the people it fits.",
          points: ["Segments by behaviour and location", "Only opted-in contacts", "Sizes updated live"],
        },
        {
          art: "mk-calendar",
          title: "Campaign calendar",
          body: "What goes out each week across WhatsApp and email, planned around your season.",
          points: ["Campaigns by channel", "Festivals and launches", "Always-on automations"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "18%",
          label: "of abandoned carts recovered",
          context: "Sample figure for a ceramics store. Not a real client yet.",
        },
        {
          sample: true,
          metric: "41%",
          label: "of new enquiries replied to the first follow-up",
          context: "Sample figure for a real estate developer. Not a real client yet.",
        },
      ],
      stack: [
        "Nirman CRM",
        "WhatsApp Business API",
        "Gmail",
        "Shopify",
        "WooCommerce",
        "Razorpay",
        "Google Sheets",
        "Google Analytics 4",
        "Google Postmaster Tools",
      ],
      faqs: [
        {
          q: "Do we need Nirman CRM for this?",
          a: "Campaigns, journeys and replies run from Nirman CRM, which has WhatsApp and email built in. Book a demo to see it. If you already use another CRM, we can connect it or move your contacts across.",
        },
        {
          q: "Is WhatsApp marketing allowed?",
          a: "Yes, through the official WhatsApp Business API, to people who have agreed to hear from you, using message templates approved by WhatsApp. Every marketing message offers a way to opt out.",
        },
        {
          q: "Will our number get blocked?",
          a: "Numbers get restricted when people report messages as spam. We only message opted-in contacts, keep frequency sensible and watch your quality rating every week.",
        },
        {
          q: "How often should we message customers?",
          a: "Automated messages go out when something happens, such as an order or enquiry. For offers and newsletters, two to four a month is usually enough. We adjust based on replies and opt-outs.",
        },
        {
          q: "Do you write the messages and design the emails?",
          a: "Yes. We write every message and design email templates in your brand, and you approve them before anything is sent.",
        },
        {
          q: "Can we see which campaigns bring sales?",
          a: "Yes. Replies, orders and bookings are tracked back to the campaign in Nirman CRM and Google Analytics, and summarised in the monthly report.",
        },
      ],
    },
  },
  {
    path: "/services/marketing/whatsapp-marketing/",
    kind: "detail",
    pillar: "marketing",
    name: "WhatsApp marketing",
    serviceType: "WhatsApp Business API marketing",
    visual: "marketing",
    card: { art: "mk-broadcast" },
    content: {
      outcome:
        "Reach customers where they already read their messages, with WhatsApp broadcasts, follow-ups and replies handled from Nirman CRM.",
      segments: [
        {
          title: "Restaurants and cafés",
          photo: "restaurantOwner",
          search: "south indian restaurant baner",
          problem: "Your offers only reach the people who happen to call or walk in that day.",
          outcomes: [
            "Weekend offers to regulars who opted in",
            "Table bookings and orders straight from the chat",
            "Repeat visits you can count",
          ],
        },
        {
          title: "Online stores",
          photo: "packingLabel",
          search: "handmade stoneware plates",
          problem: "Order updates go by SMS that nobody reads, and abandoned carts get no reminder at all.",
          outcomes: [
            "Order and shipping updates on WhatsApp",
            "Abandoned-cart reminders within the hour",
            "Restock alerts for people who asked",
          ],
        },
        {
          title: "Coaching and education",
          photo: "students",
          search: "neet coaching classes near me",
          problem: "Parents and students miss emails about batches, fees and results.",
          outcomes: [
            "Batch and demo class reminders",
            "Fee reminders sent on schedule",
            "Results and announcements that get read",
          ],
        },
        {
          title: "Salons and clinics",
          photo: "barber",
          search: "unisex salon near me",
          problem: "No-shows and empty slots cost you every week, and regulars forget to rebook.",
          outcomes: [
            "Appointment reminders the day before",
            "Rebooking nudges when it's time again",
            "Review requests after each visit",
          ],
        },
      ],
      deliverables: [
        {
          title: "WhatsApp Business API set-up",
          body: "Business verification, display name and your number connected to the official API through Nirman CRM.",
        },
        {
          title: "Template writing and approval",
          body: "Message templates written for each use, submitted to WhatsApp and tracked until approved.",
        },
        {
          title: "Opt-in collection",
          body: "Consent gathered on your website, at checkout, by QR code at the counter and in replies.",
        },
        {
          title: "Broadcast campaigns",
          body: "Offers, launches and announcements sent to the right segment at the right time.",
        },
        {
          title: "Automated journeys",
          body: "Welcome, follow-up, abandoned-cart and rebooking messages that run on their own.",
        },
        {
          title: "Order and booking updates",
          body: "Confirmations, shipping updates and reminders sent from your store or booking system.",
        },
        {
          title: "Shared inbox",
          body: "Every reply lands in Nirman CRM, assigned to the right person, with the customer's history beside it.",
        },
        {
          title: "Quality and compliance",
          body: "Opt-outs honoured automatically, sending limits respected and your quality rating watched.",
        },
        {
          title: "Monthly reporting",
          body: "Delivered, read, replied and the orders or bookings each campaign brought.",
        },
      ],
      process: [
        {
          title: "Set up the API",
          body: "Business verification, number set-up and Nirman CRM connected.",
          duration: "Weeks 1–2",
          photo: "codeScreen",
          art: "mk-templates",
        },
        {
          title: "Grow opted-in contacts",
          body: "Consent added to your forms, checkout and counter, and existing customers invited to join.",
          duration: "Week 2",
          photo: "shopperPhone",
          art: "mk-segments",
        },
        {
          title: "Templates and journeys",
          body: "Messages written and approved, and automated journeys switched on.",
          duration: "Weeks 2–3",
          photo: "writingNotes",
          art: "mk-journey",
        },
        {
          title: "Campaigns",
          body: "Broadcasts planned around your season and sent to the right segments.",
          duration: "Week 3 onwards",
          photo: "phoneLaptop",
          art: "mk-broadcast",
        },
        {
          title: "Report",
          body: "A monthly report on reads, replies and orders, with next month's plan.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "mk-report",
        },
      ],
      reports: [
        {
          art: "mk-broadcast",
          title: "Broadcast results",
          body: "For every broadcast: how many received it, read it and replied, and what they bought or booked.",
          points: ["Sent, delivered and read", "Replies handled", "Orders and bookings traced"],
        },
        {
          art: "mk-templates",
          title: "Templates",
          body: "Your approved message templates, what each is for, and any waiting for approval.",
          points: ["Utility and marketing templates", "Approval status", "Opt-out on every marketing message"],
        },
        {
          art: "mk-report",
          title: "Campaign report",
          body: "WhatsApp campaigns compared with each other and with email, measured by results.",
          points: ["Read and reply rates", "Orders per campaign", "Opt-outs and quality"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "81%",
          label: "of broadcast messages read",
          context: "Sample figure for a restaurant's weekend offer. Not a real client yet.",
        },
        {
          sample: true,
          metric: "96",
          label: "bookings and orders from one broadcast",
          context: "Sample figure for the same restaurant. Not a real client yet.",
        },
      ],
      stack: ["Nirman CRM", "WhatsApp Business API", "Shopify", "WooCommerce", "Razorpay", "Google Sheets", "Google Analytics 4"],
      faqs: [
        {
          q: "What is the WhatsApp Business API?",
          a: "It is WhatsApp's official way for businesses to message customers at scale, with approved templates, automation and a shared inbox. It is different from the free WhatsApp Business app on a single phone.",
        },
        {
          q: "Can we keep our current number?",
          a: "Usually, yes. A number can be moved to the API, but it then stops working in the regular WhatsApp app. Some businesses use a new number for the API instead. We explain the options before we start.",
        },
        {
          q: "Does WhatsApp charge for messages?",
          a: "Yes. WhatsApp charges for some messages, at rates it sets by country and message type. These are billed separately from our work, and we include an estimate for your volumes in the quote.",
        },
        {
          q: "Will our number get blocked?",
          a: "Numbers get restricted when people report spam. We only message opted-in contacts, keep frequency sensible, include an opt-out and watch your quality rating.",
        },
        {
          q: "Can customers reply?",
          a: "Yes, and they do. Replies arrive in Nirman CRM, are assigned to your team and stay linked to the customer's record.",
        },
        {
          q: "How do we collect opt-ins?",
          a: "With a tick box on your forms and checkout, a QR code at your counter, and a message inviting existing customers to join. Each opt-in is recorded with the date and source.",
        },
      ],
    },
  },
  {
    path: "/services/marketing/email-marketing/",
    kind: "detail",
    pillar: "marketing",
    name: "Email marketing",
    serviceType: "Email marketing automation",
    visual: "marketing",
    card: { art: "mk-email" },
    content: {
      outcome:
        "Emails people open: newsletters, automated sequences and offers that reach the inbox and bring orders and enquiries.",
      segments: [
        {
          title: "Online stores",
          photo: "shopOnline",
          search: "linen bedsheets online",
          problem: "Your list grows with every order, but you only email when there's a sale.",
          outcomes: [
            "A welcome series for new subscribers",
            "Care guides and reviews after each purchase",
            "Win-back emails for lapsed customers",
          ],
        },
        {
          title: "B2B and service firms",
          photo: "consultant",
          search: "warehouse automation consultant",
          problem: "Sales take months, and leads forget you between the first call and the decision.",
          outcomes: [
            "Nurture emails with useful examples",
            "Sales alerted when a lead re-engages",
            "A newsletter that keeps you remembered",
          ],
        },
        {
          title: "SaaS and subscription businesses",
          photo: "devTeam",
          search: "online invoicing software",
          problem: "People sign up for your product, try it once and never come back.",
          outcomes: [
            "Onboarding emails that lead to first success",
            "Nudges based on what users actually do",
            "Renewal and upgrade reminders",
          ],
        },
        {
          title: "Firms whose emails land in spam",
          photo: "professional",
          search: "chartered accountants in delhi",
          problem: "Your emails land in spam or promotions, and you're not sure anyone reads them.",
          outcomes: [
            "Your domain authenticated properly",
            "A clean list without bounces",
            "Inbox placement checked every month",
          ],
        },
      ],
      deliverables: [
        {
          title: "Domain set-up",
          body: "SPF, DKIM and DMARC configured, plus a custom link domain, so mailbox providers trust your emails.",
        },
        {
          title: "Template design",
          body: "On-brand, mobile-first templates that look right in Gmail, Outlook and Apple Mail.",
        },
        {
          title: "Welcome and onboarding",
          body: "A short series that introduces you to new subscribers, buyers or users.",
        },
        {
          title: "Newsletters",
          body: "Regular emails people look forward to, written and designed with you.",
        },
        {
          title: "Cart and browse reminders",
          body: "Timed emails for shoppers who left something behind, coordinated with WhatsApp.",
        },
        {
          title: "Segmentation",
          body: "Audiences built from purchases, behaviour and CRM stage, so each email fits who receives it.",
        },
        {
          title: "List hygiene",
          body: "Bounces, inactive contacts and duplicates cleaned out to protect your sender reputation.",
        },
        {
          title: "A/B testing",
          body: "Subject lines, send times and content tested, with the winners kept.",
        },
        {
          title: "Monthly reporting",
          body: "Opens, clicks, orders, enquiries and list health in one short report.",
        },
      ],
      process: [
        {
          title: "Audit",
          body: "Your domain set-up, list health and past results.",
          duration: "Week 1",
          photo: "analyticsLaptop",
          art: "mk-deliverability",
        },
        {
          title: "Plan",
          body: "Audiences, automations and a calendar of campaigns.",
          duration: "Weeks 1–2",
          photo: "stickyWall",
          art: "mk-calendar",
        },
        {
          title: "Design templates",
          body: "Email templates in your brand, tested on phones and the main email apps.",
          duration: "Week 2",
          photo: "designerTablet",
          art: "mk-email",
        },
        {
          title: "Build automations",
          body: "Welcome, nurture, cart and win-back sequences switched on in Nirman CRM.",
          duration: "Weeks 2–4",
          photo: "whiteboard",
          art: "mk-journey",
        },
        {
          title: "Send and improve",
          body: "Campaigns sent, tested and improved every month.",
          duration: "Monthly",
          photo: "laptopDashboard",
          art: "mk-report",
        },
      ],
      reports: [
        {
          art: "mk-email",
          title: "Email and results",
          body: "Each email as your subscribers see it, with its opens, clicks and orders.",
          points: ["Design checked on phones", "Opens and clicks", "Orders and enquiries"],
        },
        {
          art: "mk-deliverability",
          title: "Deliverability",
          body: "Whether your emails reach the inbox, and the set-up that keeps them there.",
          points: ["SPF, DKIM and DMARC status", "Inbox placement", "Bounces and complaints"],
        },
        {
          art: "mk-report",
          title: "Campaign report",
          body: "Every campaign compared, with what we will change next month.",
          points: ["Opens, clicks and orders", "Best subject lines", "List growth and unsubscribes"],
        },
        {
          art: "mk-segments",
          title: "Audiences",
          body: "The segments your emails go to, built from your CRM and store data.",
          points: ["Segments and sizes", "Rules for each", "Opted-in contacts only"],
        },
      ],
      results: [
        {
          sample: true,
          metric: "46%",
          label: "average open rate",
          context: "Sample figure for a ceramics store's newsletter. Not a real client yet.",
        },
        {
          sample: true,
          metric: "58",
          label: "orders from one newsletter",
          context: "Sample figure for the same store. Not a real client yet.",
        },
      ],
      stack: ["Nirman CRM", "Google Postmaster Tools", "Gmail", "Outlook", "Shopify", "WooCommerce", "Figma", "Google Analytics 4"],
      faqs: [
        {
          q: "Why do our emails go to spam?",
          a: "Usually because the domain is not authenticated, the list has old or bounced addresses, or people mark the emails as spam. We fix the set-up, clean the list and make the emails worth opening.",
        },
        {
          q: "What are the Gmail and Yahoo sender rules?",
          a: "Since 2024, Gmail and Yahoo require bulk senders to authenticate their domain, offer one-click unsubscribe and keep spam complaints low. We set all of this up as standard.",
        },
        {
          q: "How often should we send?",
          a: "Automated emails go out when something happens. For newsletters and offers, two to four a month suits most businesses. We adjust based on opens and unsubscribes.",
        },
        {
          q: "Can we bring our existing list?",
          a: "Yes, if the contacts agreed to hear from you. We clean it first, removing bounced and long-inactive addresses, to protect your sender reputation.",
        },
        {
          q: "Do you write and design the emails?",
          a: "Yes. We write the copy and design templates in your brand, and you approve each campaign before it goes out.",
        },
        {
          q: "Will the emails look right on phones?",
          a: "Yes. Templates are designed for phones first and tested in the main email apps before anything is sent.",
        },
      ],
    },
  },
];
