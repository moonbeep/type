import type { Challenge, Difficulty } from '$lib/types';

export const BANNER = `
  ███╗   ███╗ █████╗ ██╗    ██╗███████╗███╗   ██╗███████╗██╗    ████████╗██╗   ██╗██████╗ ███████╗
  ████╗ ████║██╔══██╗██║    ██║██╔════╝████╗  ██║╚══███╔╝██║    ╚══██╔══╝╚██╗ ██╔╝██╔══██╗██╔════╝
  ██╔████╔██║███████║██║ █╗ ██║█████╗  ██╔██╗ ██║  ███╔╝ ██║       ██║    ╚████╔╝ ██████╔╝█████╗
  ██║╚██╔╝██║██╔══██║██║███╗██║██╔══╝  ██║╚██╗██║ ███╔╝  ██║       ██║     ╚██╔╝  ██╔═══╝ ██╔══╝
  ██║ ╚═╝ ██║██║  ██║╚███╔███╔╝███████╗██║ ╚████║███████╗██║       ██║      ██║   ██║     ███████╗
  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚══════╝╚═╝  ╚═══╝╚══════╝╚═╝       ╚═╝      ╚═╝   ╚═╝     ╚══════╝
`; // Font: ANSI Shadow
export const TRANSITION_DURATION = 300; // ms

export const WPM_CHALLENGE: Challenge = {
	id: 'wpm5',
	name: '+5 WPM',
	description: 'Target speed increased by 5 words per minute',
	odds: 0
};

export const CHALLENGES: Challenge[] = [
	{
		id: 'wordSwap',
		name: 'Word Swap',
		description:
			"The next word swaps to a different word just as you're about to type it. Up to 3 swaps per round",
		odds: 1
	},
	{
		id: 'shortSighted',
		name: 'Short Sighted',
		description:
			'Only the current word is visible. All other words are hidden until you reach them',
		odds: 1
	},
	{
		id: 'screenShift',
		name: 'Screen Shift',
		description: 'After each completed word, the typing area shifts to a new on-screen position',
		odds: 1
	},
	{
		id: 'specialChars',
		name: 'Special Characters',
		description: 'Numbers and special characters are mixed into the words this round',
		odds: 1
	},
	{
		id: 'timePenalty',
		name: '-5s',
		description: 'You only have 25 seconds to complete this round',
		odds: 1
	}
];

export const DIFFICULTY_ORDER: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export const DIFFICULTY_BASE_WPM: Record<Difficulty, number> = {
	Beginner: 45,
	Intermediate: 60,
	Advanced: 75,
	Expert: 100
};

export const CORPUS: string[] = [
	// Nature
	'the ancient forest stretches endlessly beneath a canopy of emerald leaves where sunlight filters through the branches and paints golden patterns on the mossy ground',
	'rivers carve their way through deep valleys carrying stones and sediment toward the distant ocean where waves crash against weathered cliffs',
	'in the meadow wildflowers bloom in every color imaginable attracting butterflies and bees that drift lazily from petal to petal',
	'the mountain peaks rise above the clouds their snow covered summits glistening in the morning light as eagles soar on thermal currents',
	'autumn leaves fall gently from the oak trees painting the ground in shades of amber crimson and gold while the wind whispers through the branches',
	'the desert stretches vast and silent under a blazing sun where lizards hide beneath rocks and cacti stand like sentinels against the sky',
	'a gentle rain begins to fall on the quiet lake sending ripples across the still surface while frogs sing their evening chorus',
	'the tide retreats slowly from the shore leaving behind tide pools filled with anemones crabs and small fish darting between the rocks',
	'thick fog rolls in from the sea blanketing the coastal town in a cool grey silence that muffles every sound',
	'fireflies blink softly in the warm summer dusk drifting above the tall grass like scattered sparks from a dying fire',
	'the old pine tree has stood at the ridge for two hundred years its bark deeply furrowed and its roots gripping the stone',
	'snowflakes settle on bare branches turning the sleeping orchard into a quiet sculpture garden overnight',
	'the river slows as it reaches the delta spreading itself into dozens of shallow channels threading through reeds toward the open sea',
	'wolves move through the winter forest in single file each one stepping exactly into the prints left by the one ahead',
	'the coral reef pulses with color and motion an entire civilization of creatures occupying every crack and crevice of the structure',
	'a thunderstorm builds slowly on the horizon the distant rumble growing louder as the sky turns from grey to a deep bruised purple',
	'migrating birds follow invisible highways written into their instincts crossing continents and oceans guided only by stars and magnetic fields',

	// Technology
	'the network processes millions of requests every second routing data through fiber optic cables that span the entire globe',
	'engineers design elegant algorithms that transform raw data into meaningful patterns revealing hidden connections between seemingly unrelated events',
	'the processor executes instructions at remarkable speed while memory controllers shuffle bytes between cache layers and storage devices',
	'modern software systems rely on distributed architectures where microservices communicate through message queues and event streams',
	'artificial intelligence models learn from vast datasets discovering patterns that humans might never notice on their own',
	'the terminal displays lines of code scrolling rapidly as the compiler transforms human readable text into machine instructions',
	'cloud platforms provision virtual machines on demand scaling resources up and down to match the ever changing workload',
	'a single misplaced semicolon can halt an entire program reminding programmers that precision is the foundation of reliable software',
	'version control systems keep a complete history of every change allowing teams to collaborate without overwriting each other work',
	'the database query planner evaluates dozens of possible execution paths before choosing the one that will return results fastest',
	'open source communities build tools that power most of the internet driven entirely by curiosity and the desire to share knowledge',
	'debugging is the art of reading a program twice once as the author intended and once as the computer actually runs it',
	'containerization packages an application with all its dependencies so it behaves identically whether running on a laptop or a data center',
	'the compiler strips away abstraction layer by layer until only bare instructions remain ready for the processor to execute',
	'every function is a promise to the caller that given the right inputs it will always produce the same predictable output',
	'latency hides in unexpected places a misconfigured cache or a missing index can turn milliseconds into seconds at the worst moment',
	'the best interface disappears entirely leaving the user with the feeling that they are working directly with their ideas not with software',
	'recursion is the art of solving a problem by pretending it is already solved and working backwards to make that true',

	// Philosophy
	'the nature of consciousness remains one of the deepest mysteries that philosophers and scientists continue to explore without resolution',
	'ancient thinkers believed that knowledge comes from careful observation of the world combined with rigorous logical reasoning',
	'the boundary between perception and reality blurs when we consider how much our minds shape the world we experience',
	'free will and determinism present a paradox that has puzzled great minds for centuries without a definitive resolution',
	'meaning emerges not from the universe itself but from the stories we tell and the connections we forge with others',
	'wisdom is not merely the accumulation of facts but the ability to see clearly and act with compassion in uncertain times',
	'every ethical system must eventually answer whether the ends can justify the means and few thinkers have agreed on the answer',
	'the ship of theseus asks us whether identity persists through total change a question that applies equally to people and institutions',
	'language does not merely describe the world it actively shapes how we perceive and categorize everything we encounter',
	'doubt when used carefully is not weakness but the most powerful tool available to anyone seeking genuine understanding',
	'the examined life demands that we question not only the world around us but the assumptions we carry without noticing',
	'justice is easiest to define in the abstract and hardest to achieve when it requires someone powerful to accept a cost',
	'the paradox of tolerance asks whether a society that tolerates everything will eventually be consumed by the things it refused to resist',
	'every generation believes it has finally seen through the illusions that deceived its predecessors and every generation is partly right',
	'memory is not a recording but a reconstruction and each time we recall an event we alter it slightly in the retelling',
	'the hardest philosophical problems are not those we cannot answer but those where we cannot agree on what an answer would look like',

	// Everyday life
	'the morning coffee brews slowly filling the kitchen with a rich warm aroma that signals the start of another day',
	'children play in the park chasing each other around the old oak tree while their parents sit on benches and watch',
	'the busy market comes alive at dawn with vendors arranging colorful fruits and vegetables on wooden tables under striped awnings',
	'a cat stretches lazily on the windowsill watching birds hop along the garden fence before settling back into a peaceful nap',
	'the old bookshop on the corner holds thousands of stories waiting patiently on dusty shelves for curious readers to discover them',
	'neighbors gather around the table sharing food and laughter as the evening sun dips below the rooftops and streetlights flicker on',
	'the train pulls into the station right on time and passengers step onto the platform carrying bags and umbrellas into the cool air',
	'the library is quiet on weekday mornings when only a handful of regulars sit beneath the high windows lost in their reading',
	'she rewrites the same paragraph four times before accepting that some ideas resist being put neatly into words',
	'the smell of bread baking in the oven on a cold afternoon is one of those small pleasures that asks nothing of you',
	'two strangers share an umbrella at a crosswalk and exchange a few words before the light changes and they part forever',
	'the hardware store on the edge of town smells of sawdust and machine oil and the owner knows where everything is kept',
	'late at night the city reveals a quieter version of itself as delivery trucks replace taxis and street cleaners follow empty avenues',
	'the post office at the end of the street has not changed its hours or its counter in thirty years and that is part of its appeal',
	'he sits at the same corner table every morning orders the same coffee and reads the newspaper as though the ritual itself keeps the world stable',
	'the repair shop takes on jobs that everyone else has given up on and the owner treats each broken thing as a problem worth solving',
	'on the first cold morning of autumn people rediscover their coats and the city briefly smells of cedar and old wool',

	// Science and space
	'distant galaxies spin slowly in the void their spiral arms containing billions of stars each with the potential for orbiting worlds',
	'the ocean depths hide creatures so strange and wonderful that scientists discover new species with every deep sea expedition',
	'atoms bond together forming molecules that arrange themselves into the complex structures we call life',
	'the speed of light sets an absolute limit on how fast information can travel through the fabric of spacetime',
	'evolution shaped every living creature on earth through countless generations of adaptation and natural selection',
	'black holes bend spacetime so severely that even light following the straightest possible path curves inward and cannot escape',
	'the periodic table organizes all known matter into a grid that reveals deep patterns in how elements bond and behave',
	'quantum mechanics tells us that particles exist in superpositions of states until the moment they are observed and measured',
	'plate tectonics explains why continents drift why volcanoes form along certain edges and why earthquakes cluster in predictable zones',
	'the immune system maintains a molecular memory of every pathogen it has encountered ready to mount a faster defense next time',
	'radio telescopes listen to the universe in wavelengths invisible to the eye translating the hiss and crackle of space into data',
	'carbon dating measures the slow decay of an unstable isotope to estimate how long ago a living thing last drew breath',
	'the double helix of deoxyribonucleic acid encodes the instructions for building and operating every known living organism on earth',
	'dark matter makes up most of the mass of the universe yet has never been directly observed only inferred from its gravitational effects',
	'the mitochondria convert chemical energy into a form the cell can use performing this transformation billions of times each second',
	'superconductors carry electricity with zero resistance but only at temperatures so cold they require more energy to maintain than they save',
	'the mathematical structures invented by pure theorists purely for their elegance have a stubborn habit of turning up in physical reality',

	// History
	'the printing press spread ideas across europe faster than any authority could suppress them reshaping religion politics and science alike',
	'ancient trade routes carried silk spices and ideas between civilizations that would otherwise never have known the other existed',
	'the fall of empires rarely happens in a single dramatic moment but through a slow accumulation of pressures both internal and external',
	'every archive holds documents that were considered trivial at the time of writing and indispensable to historians centuries later',
	'the invention of writing transformed human memory from something held in individual minds to something that could outlast any single life',
	'revolutions often begin with a narrow grievance and expand only once the authorities respond with a harshness that alienates the moderate center',
	'cartographers of earlier centuries filled unknown coastlines with speculation and sometimes with sea monsters to acknowledge the edges of knowledge',
	'the first cities grew up along rivers not only for water but because floods deposited the rich silt that made farming possible at scale',
	'the telegraph shrank the world in a way people struggled to comprehend making it possible to send a message faster than a horse could carry it',
	'oral traditions preserved histories laws and cosmologies intact across hundreds of generations before anyone thought to write them down',
	'the samurai code was written down only after the age of samurai was already ending as a way of preserving something already becoming legend',

	// Creative and abstract
	'music flows through the room like water filling every corner with melody and rhythm that moves the soul without explanation',
	'the painter dips her brush into vivid blue and sweeps it across the canvas creating a sky that seems to breathe',
	'words have the power to build bridges between strangers turning distant minds into kindred spirits across any distance',
	'time moves forward like a river that never reverses its course carrying memories downstream into the vast ocean of the past',
	'silence can speak louder than words when two people share a moment of understanding without saying anything at all',
	'the best stories do not resolve every tension but leave the reader holding something unfinished the way life itself does',
	'a good photograph does not capture what a place looks like but how it felt to stand there at that particular moment',
	'architecture is the only art form you are forced to walk through inhabit and navigate whether you chose to engage with it or not',
	'metaphors are not decorations added to plain speech they are the mechanism by which the mind grasps anything genuinely new',
	'every creative constraint whether a fixed form a limited palette or a deadline tends to produce more invention not less',
	'the novelist knows that the first draft is just a way of finding out what the story is actually about',
	'an unfinished melody can haunt the listener more persistently than a resolved one because the mind keeps reaching for the note that never comes',
	'craft is the part of creativity that can be taught and practiced and it is the part that makes inspiration useful rather than merely beautiful',
	'the stage is one of the few places where failure is immediate and visible and where the audience and performer share the same fragile moment'
];
