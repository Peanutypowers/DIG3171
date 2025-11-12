const quizQuestions = [
  {
    question: "name is asked by possessivePronoun boss name to skip possessivePronoun lunch break until pronoun finishes her projectType. What type of workplace violation is this?", 
    choices: ["Economic violation", "Safety violation", "Hour entitlement violation", "Denial of leave violation"],
    answer: "Hour entitlement violation"
  },
  
  {
    question: "name is told by possessivePronoun boss name that possessivePronoun biweekly pay will be docked if pronoun does not go to the off hours office party. What type of workplace violation is this?", 
    choices: ["Ecenomic violation", "Safety violation", "Hour entitilement violation", "Denial of leave violation"],
    answer: "Ecenomic violation"
  },
  
  {
    question: "name is told by possessivePronoun boss name that pronoun will not receive a hardhat on the construction site due to cost cutting measures. What type of workplace violation is this?", 
    choices: ["Economic violation", "Safety violation", "Hour entitlement violation", "Denial of leave violation"],
    answer: "Safety violation"
  },
  
  {
    question: "name is consistently having her vacation time denied by possesivePronoun boss. What type of workplace violation is this?", 
    choices: ["Economic violation", "Safety violation", "Hour entitilement violation", "Denial of leave violation"],
    answer: "Denial of leave violation"
  },
  
  {
    question: "name works for the company companyName. During his number years at the company, he has seen multiple of his coworkers apply for workers comp due to a workplace injury. How would a union impact the health environment of the workplace?", 
    choices: ["A union would worsen the health environment of the workplace by forcing management to cut costs for safety equipment.", "A union would worsen the health environment of the workplace by offloading the work on the non-unionized workers.", "A union would better the health environment of the workplace by encouraging workers comp claims and implementing hazard identification training.", "A union would better the health environment of the workplace by reducing worker hours and increasing pay."],
    answer: "A union would better the health environment of the workplace by encouraging workers comp claims and implementing hazard identification training."
  },
  
  {
    question: "What is an historical weakness of unions?", 
    choices: ["They have discriminated against minority groups like migrants and women in the past.", "They have increased the competitiveness of the job market by monopolizing labor.", "They have worsened conditions for non-union workers.", "They have reduced the efficiency of the sectors they appear in."],
    answer: "They have discriminated against minority groups like migrants and women in the past."
  },
  
  {
    question: "name has decided that pronoun wants to form a union with possesivePronoun coworkers. What is the first step pronoun should take?", 
    choices: ["name should petition to form a union at the workplace", "name should make merch and flyers to advertise the union", "name should start by talking with possessivePronoun coworkers to build momentum", "name should contact legal specialists and partner with an established union"],
    answer: "name should start by talking with possessivePronoun coworkers to build momentum"
  },
  
  {
    question: "How can unions combat toxic workplaces?", 
    choices: ["Increase wages", "Create working hour limits", "Implement workplace hazard protections", "All of the above"],
    answer: "All of the above"
  },
  
  {
    question: "How do exploitative employers keep employees within the workplace?", 
    choices: ["Nothing stops employees from leaving exploitative workplaces.", "Pizza parties.", "Employers promise to change their behaivors, keeping workers hopeful things will change.", "Employees see themselves as reliant on these exploitative workplaces to econmoically support themselves. Thus, they develop a learned helplessness and stay loyal to a company."],
    answer: "Employees see themselves as reliant on these exploitative workplaces to econmoically support themselves. Thus, they develop a learned helplessness and stay loyal to a company."
  },
  
  {
    question: "When creating a union, your coworker name asks how unions gain bargaining power over management. The correct reply is:", 
    choices: ["Unions gain leverage over management by threatening collective action and slowing production.", "Unions gain leverage over management by appealing to their sense of humanity.", "Unions gain leverage over management by not going to the after-work pizza party.", "Unions gain leverage over management by stripping management’s benefits."],
    answer:
  }
  
];
/* options = choice*/
let currentQuestion = 0;
let score = 0;
const questionEl = document.querySelector('.question');
const answerEl = document.querySelector('.choices')
const resultEl = document.querySelector('.result');
const scoreEl = document.getElementById('score');
const restart = document.querySelector('.restart');

function loadQuestion() {
  if(currentQuestion >= quizQuestions.length) {
    endQuiz();
    return;
  }
  const currentQuiz = quizQuestions[currentQuesiton];
  questionEl.textContent = currentQuiz.question;
  choicesEl.innerHTML = '';
  currentQuiz.answers.forEach(choice => {
    const button = document.createElement('button');
    button.classList.add('choice');
    button.textContent = choice;
    button.onClick = () => grader(choice);
    answerEl.appendChild(button);
  });
}

function grader(selection) {
  if(selection === quizQuestions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  loadQuestion();
}

function end() {
  questionEl.style.display = 'none';
  choicesEl.style.display = 'none';
  resultsEl.style.display = 'block';
  scoreEl.textContent = score;
  restart.style.display = 'block';
}

restart.addEventListener('click', () => {
  currentQuestion = 0;
  score = 0;

  questionEl.style.display = 'block';
  choicesEl.style.display = 'flex';
  resultEl.style.display = 'none';
  restart.style.display = 'none';

  loadQuestion();
});


loadQuestion();







  
