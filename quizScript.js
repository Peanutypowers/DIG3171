"use strict";

/* Generates a random question */

const POS_PRONOUN = "#possessivePronoun#";
const PRONOUN = "#pronoun#";
const NAME = "#name#";
const YEARS = "#years#";
const PROJECT_TYPE = "#projectType#";
const PLACE = "#place#";
const CONTENT = "#content#";

const formatObject = {
  "pronoun": ["he", "she", "they"],
  "possessivePronoun": ["his", "her", "their", ],
  "name": ["Alex", "Andy", "Frankie", "Max", "Remy"],
  "years": ["six", "two", "three", "four", "five"],
  "projectType": ["book keeping", "program", "animation", "shelf stocking", "cleaning", "writing", "accounting", "sculpting"],
  "place": ["Oralndo", "Tampa", "Atlanta", "New York City", "Salem", "Boston", "Farmington"],
  "content": ["cosplay", "coding", "DnD", "dancing", "baking", "reading", "knitting", "sewing"]
}

function generateString(obj, rule) {
  return expandRule(obj, rule);
}

function expandRule(obj, rule) {
  let result = rule;
  let match = /#(\w+(?:\.\w+)*)#/.exec(result);
  while (match) {
    const tag = match[1];
    const replacement = handleTag(obj, tag);
    result = result.replace(match[0], replacement);
    match = /#(\w+(?:\.\w+)*)#/.exec(result);
  }
  return result;
}

function handleTag(obj, tag) {
  const parts = tag.split('.');
  const key = parts[0];
  const modifiers = parts.slice(1);
  
  if (!obj[key]) return "#" + tag + "#";
  
  const selected = obj[key][Math.floor(Math.random() * obj[key].length)];
  let result = expandRule(obj, selected);
  
  // Apply modifiers
  if (modifiers.includes('capitalize') && result.length > 0) {
    result = result.charAt(0).toUpperCase() + result.slice(1);
  }
  
  return result;
}

function displayString(obj, question) {
    return generateString(obj, question);
}

/* Creates the quiz */
const quizQuestions = [
  {
    question: displayString(formatObject, `${NAME} is asked by ${POS_PRONOUN} boss ${NAME} to skip ${POS_PRONOUN} lunch break until ${PRONOUN} finishes ${POS_PRONOUN} ${PROJECT_TYPE}. What type of workplace violation is this?`), 
    choices: ["Economic violation", "Safety violation", "Hour entitlement violation", "Denial of leave violation"],
    answer: "Hour entitlement violation"
  },
  
  {
    question: displayString(formatObject, `${NAME} is told by ${POS_PRONOUN} boss ${NAME} that ${POS_PRONOUN} biweekly pay will be docked if ${PRONOUN} does not go to the off hours office party. What type of workplace violation is this?`), 
    choices: ["Ecenomic violation", "Safety violation", "Hour entitilement violation", "Denial of leave violation"],
    answer: "Ecenomic violation"
  },
  
  {
    question: displayString(formatObject, `${NAME} is told by ${POS_PRONOUN} boss ${NAME} that ${PRONOUN} will not receive a hardhat on the construction site due to cost cutting measures. What type of workplace violation is this?`), 
    choices: ["Economic violation", "Safety violation", "Hour entitlement violation", "Denial of leave violation"],
    answer: "Safety violation"
  },
  
  {
    question: displayString(formatObject, `${NAME} is consistently having her vacation time denied by ${POS_PRONOUN} boss. What type of workplace violation is this?`), 
    choices: ["Economic violation", "Safety violation", "Hour entitilement violation", "Denial of leave violation"],
    answer: "Denial of leave violation"
  },
  
  {
    question: displayString(formatObject, `${NAME} works for the company companyName. During his ${YEARS} years at the company, he has seen multiple of his coworkers apply for workers comp due to a workplace injury. How would a union impact the health environment of the workplace?`), 
    choices: ["A union would worsen the health environment of the workplace by forcing management to cut costs for safety equipment.", "A union would worsen the health environment of the workplace by offloading the work on the non-unionized workers.", "A union would better the health environment of the workplace by encouraging workers comp claims and implementing hazard identification training.", "A union would better the health environment of the workplace by reducing worker hours and increasing pay."],
    answer: "A union would better the health environment of the workplace by encouraging workers comp claims and implementing hazard identification training."
  },
  
  {
    question: displayString(formatObject, `What is an historical weakness of unions?`), 
    choices: ["They have discriminated against minority groups like migrants and women in the past.", "They have increased the competitiveness of the job market by monopolizing labor.", "They have worsened conditions for non-union workers.", "They have reduced the efficiency of the sectors they appear in."],
    answer: "They have discriminated against minority groups like migrants and women in the past."
  },
  
  {
    question: displayString(formatObject, `${NAME} has decided that ${PRONOUN} wants to form a union with ${POS_PRONOUN} coworkers. What is the first step ${PRONOUN} should take?`), 
    choices: ["They should petition to form a union at the workplace", "They should make merch and flyers to advertise the union", "They should start by talking with their coworkers to build momentum", "They should contact legal specialists and partner with an established union"],
    answer: "They should start by talking with their coworkers to build momentum"
  },
  
  {
    question: displayString(formatObject, `How can unions combat toxic workplaces?`), 
    choices: ["Increase wages", "Create working hour limits", "Implement workplace hazard protections", "All of the above"],
    answer: "All of the above"
  },
  
  {
    question: displayString(formatObject, `How do exploitative employers keep employees within the workplace?`), 
    choices: ["Nothing stops employees from leaving exploitative workplaces.", "Pizza parties.", "Employers promise to change their behaivors, keeping workers hopeful things will change.", "Employees see themselves as reliant on these exploitative workplaces to econmoically support themselves. Thus, they develop a learned helplessness and stay loyal to a company."],
    answer: "Employees see themselves as reliant on these exploitative workplaces to econmoically support themselves. Thus, they develop a learned helplessness and stay loyal to a company."
  },
  
  {
    question: displayString(formatObject, `When creating a union, your coworker ${NAME} asks how unions gain bargaining power over management. The correct reply is:`), 
    choices: ["Unions gain leverage over management by threatening collective action and slowing production.", "Unions gain leverage over management by appealing to their sense of humanity.", "Unions gain leverage over management by not going to the after-work pizza party.", "Unions gain leverage over management by stripping management’s benefits."],
    answer: "Unions gain leverage over management by threatening collective action and slowing production."
  }
  
];
/* options = choice*/
let currentQuestion = 0;
let score = 0;
const questionEl = document.querySelector('.question');
const answerEl = document.querySelector('.choices')
const resultEl = document.querySelector('.result');
const scoreEl = document.querySelector('.score');
const restart = document.querySelector('.restart');

function loadQuestion() {
  if(currentQuestion >= quizQuestions.length) {
    end();
    return;
  }
  const currentQuiz = quizQuestions[currentQuestion];
  questionEl.textContent = currentQuiz.question;
  answerEl.innerHTML = '';
  currentQuiz.choices.forEach(choice => {
    const button = document.createElement('button');
    button.classList.add('choice');
    button.textContent = choice;
    button.onclick = () => grader(choice);
    answerEl.appendChild(button);
  });
}

function grader(selection) {
  if(selection == quizQuestions[currentQuestion].answer) {
    score++;
    scoreEl.textContent = score;
  }
  currentQuestion++;
  loadQuestion();
}

function end() {
  questionEl.style.display = 'none';
  answerEl.style.display = 'none';
  resultEl.style.display = 'block';
  scoreEl.textContent = score;
  restart.style.display = 'block';
}

restart.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;

  questionEl.style.display = 'block';
  answerEl.style.display = 'flex';
  resultEl.style.display = 'none';
  restart.style.display = 'none';
  scoreEl.textContent = score;

  loadQuestion();
});



loadQuestion();







  
