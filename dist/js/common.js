Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})


var heightBlock1 = document.getElementById('content-1').clientHeight - 10;
var heightBlock2 = document.getElementById('content-2').clientHeight;
var heightBlock3 = document.getElementById('content-3').clientHeight;
// var infoItems = document.querySelectorAll('#content-2 .info-items');


var app = new Vue ({
	el: '#app',
	data: {
		message: '',
		names: ['example.ru' , 'domen.ru'],
		isTrue: false,
		isFreeCallback: '',
		scrollPosition: null,
		alertElement: null,
		isActive: false,
		sElement: null,
		rightAnswer: null,
		isAccept: false,
		infoItem: [],
		infoItemActive: null,
		infoArray1: [],
		infoArray2: [],
		infoActive: false,
		infoText: '',
		infoClass: '',
		triangle: {
			down: false,
			up: true,
		},
		dots: [
				{
					isActive: true,
					value: 1
				},
				{
					isActive: false,
					value: 2
				},
				{
					isActive: false,
					value: 3
				}
			],
		},
	methods: {
		readTextFile: function () {
		      var xhr = new XMLHttpRequest()
		      xhr.open('GET', ".././texts.json")
		      var self = this;
		      xhr.onload = function () {
		        self.infoItem = JSON.parse(xhr.responseText)
		        console.log(self.infoItem)
		        for(let i = 0; i < self.infoItem.items.length; i++) {
		        	if( i <= 3) {
		        		self.infoArray1.push(self.infoItem.items[i]);
		        	} else {
		        		self.infoArray2.push(self.infoItem.items[i]);
		        	}
		        }
		        return self.infoItem;
		      }
		      xhr.send()
		},
		domenName: function(message) {
			var isFree = 'свободен';
			this.names.forEach(function(name){
				if(message === name) {
					isFree = 'занят';
					return isFree;
				}
			});
		this.isTrue = true; 
		this.isFreeCallback = isFree;
		},
		onScroll(event) {

			var position = event.currentTarget.scrollY;
			var range = heightBlock1 + heightBlock2 - 200;
			this.scrollPosition = position;

			for(let i = 0; i < this.dots.length; i++) {
				if (this.scrollPosition <= heightBlock2) {
					this.alertElement = 0;
				} else if ((this.scrollPosition > heightBlock1) && (this.scrollPosition < range)) {
					this.alertElement = 1;
				} else if (this.scrollPosition > range) {
					this.alertElement = 2;
				}
				if(i === this.alertElement) {
					this.dots[i].isActive = true;
				} else {
					this.dots[i].isActive = false;
				}
			}
			// console.log(this.infoText);
		},
		goTo: function(dot) {
			var scrollToElement = dot.value;
			switch(scrollToElement) {
			  case 1: 
			    this.sElement = '#content-1';
			    break;
			  case 2: 
				this.sElement = '#content-2';
			    break;
			  case 3:
				this.sElement = '#content-3';
			    break;
			}
		},
		viewInfoText: function(item) {
			this.infoItemActive = item;
			this.infoItemActive.active = true;
			var value = this.infoItemActive.value;
			if(value <= 3) {
				this.triangle.up = true;
				this.triangle.down = false;
			} else {
				this.triangle.up = false;
				this.triangle.down = true;
			}
			this.infoText = item.text;
			switch(value) {
				case 0: 
				this.infoClass = "l-1";
				break
				case 1: 
				this.infoClass = "l-4";
				break
				case 2: 
				this.infoClass = "l-7";
				break
				case 3: 
				this.infoClass = "l-10";
				break
				case 4: 
				this.infoClass = "l-1";
				break
				case 5: 
				this.infoClass = "l-4";
				break
				case 6: 
				this.infoClass = "l-7";
				break
				case 7: 
				this.infoClass = "l-10";
				break
			}
			this.infoActive = true;
		},
		pressEnter: function(event) {
			if(event.keyCode === 13) {
				this.domenName(event.currentTarget.value);
			}
		},
	},
	beforeMount(){
		this.readTextFile(".././texts.json" , function(text){	
		});
	},
})

