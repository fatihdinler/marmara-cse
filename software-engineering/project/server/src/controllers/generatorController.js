// /backend/controllers/generatorController.js

const Excuse = require('../models/Excuse');

// Excuse templates by scenario and type (expanded heavily)
const excuseTemplates = {
  work: {
    believable: [
      "I had a family emergency that required my immediate attention.",
      "My car broke down and I'm waiting for the tow truck.",
      "I woke up feeling very sick and didn't want to risk infecting anyone.",
      "There was a water leak in my apartment that I had to deal with immediately.",
      "I had to take my pet to the emergency vet.",
      "My neighbor's house was burglarized, and I had to give a statement.",
      "My internet connection was completely out, and I couldn’t access the files.",
      "My computer unexpectedly went into a critical update and froze.",
      "I spilled coffee on my laptop, and it wouldn’t boot afterward.",
      "My childcare fell through at the last minute, so I had to stay home."
    ],
    funny: [
      "My alarm clock and I are not on speaking terms right now.",
      "I got trapped in my own house by a very determined cat.",
      "I accidentally wore my pajamas to work and had to turn back home.",
      "My coffee maker staged a rebellion this morning.",
      "I was kidnapped by my bed—it refused to let me go.",
      "I mistook my dog’s toy for my phone and spent 30 minutes talking to a chew toy.",
      "My goldfish had an existential crisis and needed emotional support.",
      "A swarm of bees set up camp outside my door, and I’m waiting for them to move on.",
      "My socks mysteriously disappeared, and I had to search the entire house.",
      "My fridge declared a union strike—no food until negotiations start."
    ],
    dramatic: [
      "I witnessed a crime and had to give a statement to the police.",
      "My house was struck by lightning and I'm dealing with the aftermath.",
      "I saved a child from a burning building on my way to work.",
      "A meteor crashed in my backyard and I'm waiting for NASA.",
      "I was chosen by aliens for a brief intergalactic meeting.",
      "I was caught in a flash flood while hiking, and my phone got destroyed.",
      "I got into a minor accident saving a kitten from the road.",
      "My roof collapsed from heavy rain, and I’m waiting for emergency services.",
      "I unsealed an ancient tomb by accident and now I’m under quarantine.",
      "I got detained by secret agents who mistook me for a spy."
    ],
    sarcastic: [
      "I’m so excited to sit in traffic for three hours, can’t miss that opportunity.",
      "I decided to stay home and single-handedly negotiate world peace instead.",
      "I tested a new revolutionary alarm clock—turns out it just doesn’t ring.",
      "I spent the morning trying to teach my stapler how to make coffee.",
      "I was busy reading a riveting manual on paint drying techniques.",
      "I gave my goldfish a motivational speech and got too wrapped up in its tears.",
      "I stayed home to finalise the annual counting of the dust bunnies under my bed.",
      "I drafted a novel about grass growing—deadline was today.",
      "I volunteered as tribute to taste-test every flavor of potato chip in existence.",
      "I timed how long it takes for ice to melt in my freezer for scientific reasons."
    ],
    urgent: [
      "My doctor scheduled an emergency procedure and canceled it at the last second.",
      "I lost my wallet overnight and need to cancel all my cards immediately.",
      "My phone battery died mid-conference call, and I had no backup charger.",
      "My neighbor’s house alarm kept going off and I had to check it out.",
      "My apartment building had a gas leak scare; I couldn’t leave until cleared.",
      "I had an urgent legal matter I had to attend to at the courthouse.",
      "I was informed my friend had a medical crisis, and I had to be there.",
      "My child’s school locked down unexpectedly; I couldn’t leave until all clear.",
      "I had to pick up my pet from the groomer’s after they misbehaved badly.",
      "My work laptop failed its security update, and the entire network went down."
    ]
  },

  school: {
    believable: [
      "I had a doctor’s appointment that ran longer than expected.",
      "My internet went down and I couldn't access the online materials.",
      "I had to help my elderly neighbor with an emergency.",
      "My laptop crashed and I lost all my work.",
      "There was a family situation that needed immediate attention.",
      "My library overdue fines put a hold on my account and I had to resolve it.",
      "My group member disappeared at the last minute; I stayed to figure things out.",
      "My dorm lost power all weekend, so I had no way to charge anything.",
      "I tested positive for a contagious bug and needed to quarantine.",
      "The university shuttle broke down, leaving me stranded miles away."
    ],
    funny: [
      "My textbook ate my homework—it’s a very hungry book.",
      "I was teaching my goldfish math and lost track of time.",
      "My homework decided to run away from home.",
      "I got lost in my own neighborhood for three hours.",
      "My pen ran out of ink and every store in town was closed.",
      "I got locked inside the chemistry lab by accident and only escaped now.",
      "My roommate hid all my pens as a practical joke gone too far.",
      "My grade calculator caught on fire—turns out it overheated from stress.",
      "I got distracted organizing my bookshelf alphabetically by color.",
      "I taught my hamster to ride a unicycle; it took longer than expected."
    ],
    dramatic: [
      "I discovered a hidden treasure map in my attic and had to investigate.",
      "A Hollywood director spotted me and insisted on an impromptu audition.",
      "I was recruited by the government for a top-secret mission.",
      "My house was invaded by a family of raccoons staging a coup.",
      "I accidentally time-traveled and only just made it back today.",
      "I survived an earthquake on my way here and had to help rescue casualties.",
      "I uncovered a secret society meeting under campus and was taken to debrief.",
      "I almost got hit by a falling tree branch from campus maintenance work.",
      "I was conscripted into a local amateur play and it ran late rehearsal.",
      "I intercepted a mysterious encrypted message and had to decipher it."
    ],
    sarcastic: [
      "I spent all night memorizing the entire encyclopedia, sorry I’m late.",
      "I gave a lecture to my cat on quantum physics; she barely paid attention.",
      "I was too busy mastering the art of doodling to finish my assignment.",
      "I held a symposium on whether pizza should have pineapple.",
      "I taught my houseplant how to do calculus and lost track of the clock.",
      "My coffee decided to drink me instead of me drinking it.",
      "I organized a TED Talk for my socks; they had a lot to share.",
      "I was writing a thesis on how long it takes for ramen to cook.",
      "I stayed up arguing with my reflection about thesis statements.",
      "I had a philosophical debate with my textbooks about the meaning of notes."
    ],
    urgent: [
      "My laboratory experiment exploded and set off the sprinkler system.",
      "I was called to the dean’s office for an unexpected disciplinary hearing.",
      "My scholarship paperwork was lost and I had to spend hours retrieving it.",
      "My study group got locked out of the library until security arrived.",
      "I had an urgent visa appointment moved up to today.",
      "My campus ID card got deactivated, so I had to stand in line to fix it.",
      "My group project partner was hospitalized, and I needed to handle replacements.",
      "My laptop was sent in for repair unexpectedly, so I couldn’t access my files.",
      "I had to petition the registrar for a late add/drop and it took all day.",
      "My dorm was evacuated for a gas leak, and I only just got home."
    ]
  },

  social: {
    believable: [
      "I'm not feeling well and don't want to risk spreading anything.",
      "I have a work deadline that I absolutely cannot miss.",
      "My babysitter canceled at the last minute.",
      "I have a family obligation I completely forgot about.",
      "My car is in the shop and I don't have transportation.",
      "My ride canceled on me when I was already halfway there.",
      "My significant other surprised me with an emergency date night.",
      "My friend had a minor accident and I needed to be by their side.",
      "My pet sitter ghosted me, so I had to stay home all evening.",
      "My flight was delayed due to maintenance issues."
    ],
    funny: [
      "I'm having an intense relationship with my couch tonight.",
      "My plants are throwing a party and I promised to be the DJ.",
      "I'm in the middle of teaching my cat to play chess.",
      "Netflix released a new show and I'm contractually obligated to watch it.",
      "I'm having a deep philosophical conversation with my refrigerator.",
      "My T-shirt and I are staging a sit-in to protest laundry day.",
      "My goldfish is feeling lonely—he insisted I stay home.",
      "I’m stuck untangling earphones for a therapy session.",
      "My bed and I had a groundbreaking reconciliation talk.",
      "My pizza delivery was too delicious; I decided to stay forever."
    ],
    dramatic: [
      "I'm being hunted by an ancient curse that only affects social gatherings.",
      "The FBI needs me to go undercover at a book club meeting.",
      "I've been chosen to guard the last remaining pizza in the city.",
      "My evil twin escaped and I need to track them down tonight.",
      "I'm the only one who can prevent the robot uprising scheduled for tonight.",
      "I was abducted by streaming aliens who needed binge-watch advice.",
      "My horoscope warned of social disasters, so I had to hide in my closet.",
      "I intercepted a secret spy message at the grocery store; I can't explain more.",
      "I had to bargain with a ghost in my attic before I could leave.",
      "I was briefly possessed by an ancient spirit demanding solitude."
    ],
    sarcastic: [
      "I promised my couch I’d meditate with it until dawn.",
      "My fridge demanded a union negotiation and it got heated.",
      "I taught my socks how to tango and lost track of reality.",
      "I got caught up in a long staring contest with my cereal box.",
      "My TV remote went missing so I held a funeral for it.",
      "I refereed a tiny wrestling match between my pillows.",
      "My houseplants started a flash mob and I couldn’t say no.",
      "I gave my phone a pep talk about user engagement metrics.",
      "I performed a one-person musical about my inner thoughts.",
      "I spent the evening explaining quantum mechanics to a rubber duck."
    ],
    urgent: [
      "The local animal shelter called: my foster kitten is in crisis.",
      "My friend needs emergency emotional support, so I can’t leave him alone.",
      "My flight out of town got moved up two hours, and I’m still packing.",
      "My neighbor’s pet raccoon escaped and I had to help catch it.",
      "I got notified about a safety recall on my laptop—had to rush to the store.",
      "My best friend’s birthday is today and they planned a surprise party.",
      "My boss texted me at midnight saying “urgent meeting,” so I couldn’t come.",
      "My phone alarm was set in GMT, so I missed all my reminders.",
      "I had to drop everything for a last-minute medical test.",
      "My bank froze my credit card over suspicious activity—spent the day fixing it."
    ]
  }
};

// Generate excuse based on scenario and type
exports.generateExcuse = async (req, res) => {
  try {
    const { scenario, type, isPublic = false } = req.body;

    if (!scenario || !type) {
      return res.status(400).json({ msg: 'Scenario and type are required' });
    }
    if (
      !excuseTemplates[scenario] ||
      !excuseTemplates[scenario][type]
    ) {
      return res.status(400).json({ msg: 'Invalid scenario or type' });
    }

    const templates = excuseTemplates[scenario][type];
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    const excuse = new Excuse({
      text: randomTemplate,
      user: req.user.id,
      scenario,
      type,
      isPublic,
      upvotes: 0,
      downvotes: 0,
      score: 0
    });

    await excuse.save();
    await excuse.populate('user', 'name');

    return res.json(excuse);
  } catch (err) {
    console.log('err -->', err)
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Get random excuse (Surprise Me feature)
exports.surpriseMe = async (req, res) => {
  try {
    const scenarios = Object.keys(excuseTemplates);
    const randomScenario =
      scenarios[Math.floor(Math.random() * scenarios.length)];

    const types = Object.keys(excuseTemplates[randomScenario]);
    const randomType =
      types[Math.floor(Math.random() * types.length)];

    const templates = excuseTemplates[randomScenario][randomType];
    const randomTemplate =
      templates[Math.floor(Math.random() * templates.length)];

    const excuse = new Excuse({
      text: randomTemplate,
      user: req.user.id,
      scenario: randomScenario,
      type: randomType,
      isPublic: false,
      upvotes: 0,
      downvotes: 0,
      score: 0
    });

    await excuse.save();
    await excuse.populate('user', 'name');

    return res.json(excuse);
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
};

// Get available scenarios and types (now includes new types)
exports.getOptions = async (req, res) => {
  try {
    const options = {
      scenarios: Object.keys(excuseTemplates),
      types: ['believable', 'funny', 'dramatic', 'sarcastic', 'urgent']
    };
    return res.json(options);
  } catch (err) {
    return res.status(500).json({ msg: 'Server error' });
  }
};
