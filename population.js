// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {
  constructor(phrase, mutRate, popMax) {
    // Array to hold the current population
    // this.population;
    // ArrayList which we will use for our "mating pool"
    // this.matingPool;
    
    // Number of generations
    this.generations = 0;
    // Are we finished evolving?
    this.finished = false;
    // Target phrase
    this.target = phrase;
    // Mutation rate
    this.mutationRate = mutRate;
    this.perfectScore = 1;

    this.best = "";

    // STEP 1 in action
    this.population = [];
    for (let i = 0; i < popMax; i++) {
      // creating a DNA object which itself 
      // is an array called genes
      // each element is a single character
      this.population[i] = new DNA(this.target.length);
    }
    this.matingPool = [];
    this.fitness();
  }

  // STEP 2: Selection
  // STEP 2a: Calc fitness
  // Fill our fitness array with a value 
  // for every member of the population
  // loop thru all members and call calcFitness
  // and check fitness against target phrase
  // see DNA class for calcFitness 
  fitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);
    }
  }

  // STEP 2b: Build mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }

    // Add each member n times according to score
    // Based on fitness, each member will get 
    // added to the mating pool a certain number of times
    // a higher fitness = more entries to 
    // mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to 
    // mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {

      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
      for (let j = 0; j < n; j++) { // and pick two random numbers
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // STEP 3: Reproduction
  // Create a new generation
  generate() {
    // Refill the population with children 
    // from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      
      // STEP 3a: Crossover
      let child = partnerA.crossover(partnerB);
      // STEP 3b: Mutation
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }


  getBest() {
    return this.best;
  }

  // Compute the current "most fit" member 
  // of the population
  evaluate() {
    let worldrecord = 0.0;
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
      }
    }

    this.best = this.population[index].getPhrase();
    if (worldrecord === this.perfectScore) {
      this.finished = true;
    }
  }

  // The target was reached!
  isFinished() {
    return this.finished;
  }

  // For Displaying Stats
  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / (this.population.length);
  }

  //mess around with the phrases displayed
  allPhrases() {
    let everything = "";
   
    let displayLimit = min(this.population.length,50);
   
   for (let i = 0; i < displayLimit; i++) {
      everything += this.population[i].getPhrase() + "<br>";
    }
    return everything;
  }
}