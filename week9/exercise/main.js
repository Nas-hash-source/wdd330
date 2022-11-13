const url = 'https://spbooks.github.io/jsninja2/questions.json';
fetch(url)
    .then(res => res.json())
    .then(quiz => {
        view.start.addEventListener('click', () =>
            game.start(quiz.questions), false);
        view.response.addEventListener('click', (event) =>
            game.check(event), false);
});

function random(a,b=1) {
    // if only 1 argument is provided, we need to swap the values of a and b
    if (b === 1) {
        [a,b] = [b,a];
    }
    return Math.floor((b-a+1) * Math.random()) + a;
}

function shuffle(array) {
    for (let i = array.length; i; i--) {
        let j = random(i)-1;
        [array[i - 1], array[j]] = [array[j], array[i - 1]];
    }
}

// View Object 
const view = { 
	score: document.querySelector('#score strong'),
    timer: document.querySelector('#timer strong'),
	question: document.getElementById('question'), 
    response: document.querySelector('#response'),
	result: document.getElementById('result'), 
	info: document.getElementById('info'),
    start: document.getElementById('start'),
    show(element){
        element.style.display = 'block';
        },

    hide(element){
        element.style.display = 'none';
        },

	render(target,content,attributes) { 
		for(const key in attributes) { 
			target.setAttribute(key, attributes[key]); 
		}
		target.innerHTML = content;
	},
    setup(){
        this.show(this.question);
        this.show(this.response);
        this.show(this.result);
        this.hide(this.start);
        this.render(this.score,game.score);
        this.render(this.result,'');
        this.render(this.info,'');
    },
    
    teardown(){
        this.hide(this.question);
        this.hide(this.response);
        this.show(this.start);
    },

    buttons(array){
        return array.map(value => `<button>${value}</button>`).join('');
    }        
};

const game = {
    start(quiz){
        this.questions = [...quiz];
        this.score = 0;
        view.setup();
        this.ask();
        this.secondsRemaining = 20;
        this.timer = setInterval( this.countdown , 1000 );
    },

    countdown() {
        game.secondsRemaining--;
        view.render(view.timer,game.secondsRemaining);
        if(game.secondsRemaining < 0) {
            game.gameOver();
        }
    },        
    
    ask(name){
		console.log('ask() invoked');
        if(this.questions.length > 2) {
            shuffle(this.questions);
            this.question = this.questions.pop();
            const options = [this.questions[0].realName, this.questions[1].realName, this.question.realName];
            shuffle(options);
            const question = `What is ${this.question.name}'s real name?`;
            view.render(view.question,question);
            view.render(view.response,view.buttons(options));
        }
        else {
            this.gameOver();
        }
    },

    check(event){
        console.log('check(event) invoked');
        const response = event.target.textContent;
        const answer = this.question.realName;
        if(response === answer){
            view.render(view.result,'Correct!',{'class':'correct'});
            this.score++;
            view.render(view.score,this.score);
        } else {
            view.render(view.result,`Wrong! The correct answer was ${answer}`,{'class':'wrong'});
        }
        this.ask();
    },

    gameOver(){
        view.render(view.info,`Game Over, you scored ${this.score} point${this.score !== 1 ? 's' : ''}`);
        view.teardown();
        clearInterval(this.timer);
        }
    }
    
