/* The Nature of Code
Daniel Shiffman
http://natureofcode.com

Genetic Algorithm, Evolving Shakespeare
Demonof using a genetic algorithm to perform a search

// setup()
# Step 1: The Population
# Create an empty population (an array or ArrayList)
# Fill it with DNA encoded objects (pick random values to start)

draw()
# Step 1: Selection
# Create an empty mating pool (an empty ArrayList)
# For every member of the population, evaluate its fitness based on some criteria / function,
and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

# Step 2: Reproduction Create a new empty population
# Fill the new population by executing the following steps:
1. Pick two "parent" objects from the mating pool.
2. Crossover -- create a "child" object by mating these two parents.
3. Mutation -- mutate the child's DNA based on a given probability.
4. Add the child object to the new population.
# Replace the old population with the new population
# Rinse and repeat

Reference: https://github.com/nature-of-code/noc-examples-p5.js/tree/master/chp09_ga/NOC_9_01_GA_Shakespeare
*/

var foo = new p5.Speech(); // speech synthesis object
foo.setVoice('Zosia');


let bestAnswers = [];
let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

function setup() {
  bestPhrase = createP("those we've lost:");
  bestPhrase.position(10,10);
  bestPhrase.class("best");

  //unfit results list 
  allPhrases = createP("Say their names:");
  allPhrases.position(450, 10);
  allPhrases.class("all");  

  stats = createP("mispronounciations");
  stats.position(10,200);
  stats.class("stats");

  // STEP 0 
  // Initialize target phrase
  target = "george floyd";
  //target = "breonna taylor";
  //target = "rekia boyd";
  //target = "Layleen Xtravaganza Cubilette-Polanco";
  
  // population total
  popmax = 100;
  
  // mutation rate
  mutationRate = 0.01;

  // STEP 1 Initialize Population
  // Create a population with a target phrase, 
  // mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
  
  
 
}

function draw() {
  if (frameCount % 50 == 0) {
    
  // Step 2b Generate mating pool
  population.naturalSelection();
  // Step 3 Reproduction, Create next generation
  population.generate();
    // Step 2a Calculate fitness
  population.fitness();
  // Step 4 Check to see if we're finished
  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    noLoop();
  }
    displayInfo();    
   }
}


function displayInfo() {
  // Display current status of population
  let answer = population.getBest();
  console.log(answer);
  foo.speak(answer);
  bestAnswers.push(answer);
  
  

  bestPhrase.html("those we've lost:<br>" + answer);

  let statstext = "mispronounciations:     " + population.getGenerations() + "<br>";

  stats.html(statstext);

  allPhrases.html("Say their names:<br>" + population.allPhrases())
}