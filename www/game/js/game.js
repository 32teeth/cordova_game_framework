/*
** @author Eugene Andruszczenko
** @version 0.1
** @date September 18th, 2015
** @description 
** game.js is a a full canvas timber game
*/
var game = (function(){
	/*
	** @param canvas {object}
	*/	
	var canvas = document.getElementById("game");

	/*
	** @param ctx {context}
	*/		
	var ctx = canvas.getContext('2d');
	ctx.imageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.webkitImageSmoothingEnabled = false;

	/*
	** @param width {int}
	** @param height {int}
	*/		
	var width = 320;
	var height = 568;

	/*
	** @param px {int}
	** @param py {int}
	*/		
	var px = 0;
	var py = 0;	
	
	/*
	** @param scale {array}
	*/			
	var scale = [
		(window.innerWidth/width),
		(window.innerHeight/height)
	];

	/*
	** @desc autoscale
	*/	
	ctx.canvas.width = width*scale[0];
	ctx.canvas.height = height*scale[1];	
	ctx.scale(scale[0], scale[1]);	

	/*
	** @param image {image}
	*/
	var image = new Image();

	/*
	** @method asset
	** @param src {string}
	** @description source to load
	** @return image obje
	*/	
	function asset(src)
	{
		image = new Image();
		image.src = "game/img/" + src;
		return image;
	}

	/*
	** @param assets {object}
	*/
	var assets = {
		intro:asset("intro.png"),
		instructions:asset("instructions.png"),
		gameover:asset("gameover.png"),
		ad:asset("ad.png"),
		bgsound_on:asset("note.png"),
		bgsound_off:asset("note_off.png")		
	};

	/*
	** @param bit {object}
	** @description 8 bit font used in application
	*/
	var bit = {
		small:'16px "bit"',
		medium:'24px "bit"',
		large:'48px "bit"',
		huge:'96px "bit"'
	}

	/*
	** @param colors {object}
	** @description color collection used in app in rgba format
	*/
	var colors = {
		black:"rgba(0,0,0,1)",
		background:"rgba(239,239,239,1)",
		white:"rgba(255,255,255,1)",
	}	

	/*
	** @description sounds
	*/
	var click = new Audio("game/music/click.wav");
	var music = new Audio("game/music/music.wav");
	var bgsound = true;		

	/*
	** @param fps {int}
	*/
	var fps = 60;

	/*
	** @param toggle {boolean}
	*/
	var toggle = false;

	/*
	** @param ready {boolean}
	*/
	var ready = false;	

	/*
	** @param pause {boolean}
	*/
	var pause = false;

	/*
	** @param games {int}
	*/
	var games_played = 0;

	/*
	** @param shoads {int}
	*/
	var show_ad_after_games = 3;	

	/*
	** @param rated {boolean}
	*/
	var rated = false;

	/*
	** @param state {string}
	*/
	var state = "intro";

	/*
	** @ params sx sy 
	** @description twitter coord
	 */
	var sx = 70;
	var sy = 390;

	/*
	** @method init
	** @description 
	*/
	function init()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.style.backgroundColor = colors.background;

		window.navigator.userAgent.indexOf("Firefox") != -1 || window.navigator.userAgent.indexOf("Chrome") != -1 || window.navigator.userAgent.indexOf("OS X") != -1? 
		canvas.addEventListener('mousedown', game.controls, false) :
		canvas.addEventListener('touchstart', game.controls, false);

		window.navigator.userAgent.indexOf("Firefox") != -1 || window.navigator.userAgent.indexOf("Chrome") != -1 || window.navigator.userAgent.indexOf("OS X") != -1? 
		canvas.addEventListener('mouseup', game.controls, false) :
		canvas.addEventListener('touchend', game.controls, false);	


		score.init("BOTTOM_RIGHT");

		music.play();

    setTimeout(function(){ready = true;},250);
	}

	/*
	** @method draw
	** @description this is the core of the loop
	*/
	function draw()
	{
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		canvas.style.backgroundColor = colors.background;

		switch(state)
		{
			case "intro":
			case "instructions":
			case "ad":
				ctx.drawImage(assets[state], 0, 0, width, height);
			break;
			case "play":
				score.draw();
			break;
			case "gameover":
				ctx.drawImage(assets[state], 0, 0, width, height);
				gameover();
			break;
		}

		/*
		** @description sound and music loop
		*/
		if(music.currentTime >= music.duration)
		{
			music.currentTime = 0;
			music.play();
		}	
		sound();

	}

	/*
	** @method gameover
	** @description 
	*/
	function gameover()
	{
		var y = 195;
		ctx.fillStyle = colors.black;
		ctx.font = bit.small;
		ctx.textAlign = "left";
		ctx.fillText("last score", 30, y);	
		ctx.textAlign = "right";
		ctx.fillText("best score", width-30, y);				
		y+=30;
		ctx.font = bit.medium;
		ctx.textAlign = "left";
		ctx.fillText(score.current, 30, y);	
		ctx.textAlign = "right";
		ctx.fillText(score.best, width-30, y);		

		/*
		** @description draw twitter share
		*/
		share();	
	}	

	/*
	** @method share
	** @description 
	*/
	function share()
	{
			var st = "tweet score";

			ctx.fillStyle = colors.water;
			ctx.beginPath();
			ctx.fillRect(sx,sy,24,24);
			ctx.fill();	
			ctx.closePath();

			ctx.fillStyle = colors.blue;
			ctx.beginPath();
			ctx.fillRect(sx + 6,sy + 7,6,12);
			ctx.fillRect(sx + 7,sy + 5,4,14);
			ctx.fillRect(sx + 10,sy + 8,6,11);
			ctx.fillRect(sx + 6,sy + 9,12,4);		
			ctx.fillRect(sx + 6,sy + 14,12,4);
			ctx.fill();	
			ctx.closePath();

			ctx.fillStyle = colors.white;
			ctx.beginPath();
			ctx.fillRect(sx + 7,sy + 6,4,11);
			ctx.fillRect(sx + 7,sy + 9,10,4);
			ctx.fillRect(sx + 7,sy + 14,10,4);
			ctx.fill();	
			ctx.closePath();	

			ctx.textAlign = "left";
			ctx.fillStyle = colors.black;
			ctx.font = bit.medium;
			ctx.fillText(st, sx + 35, sy + 20);		
	}		

	/*
	** @method sound
	** @description 
	*/
	function sound()
	{
		var src = bgsound ? assets.bgsound_on : assets.bgsound_off ;
		ctx.drawImage(src, 10, height - 30, 14, 20);
	}	

	/*
	** @method score
	** @description 
	*/
	var score = {
		current:0,
		best:0,
		size:"small",
		position:[],
		cardinals:{
			TOP_LEFT:[10,20, "left"],
			TOP_RIGHT:[width-10, 20, "right"],
			BOTTOM_LEFT:[10,height-10, "left"],
			BOTTOM_RIGHT:[width-10, height-10, "right"]		
		},
		init:function(pos)
		{
			score.position = score.cardinals[pos];
			score.current = 0;
		},
		draw:function()
		{
			ctx.textAlign = score.position[2];
			ctx.font = bit[score.size];
			ctx.fillStyle = colors.black;
			ctx.fillText(score.current, score.position[0], score.position[1]);			
		},
		update:function(p)
		{			
			score.current += p;
			if(score.current > score.best)
			{
				score.best = score.current;
			}
			score.draw();
		}
	}	

	/*
	** @method controls
	** @param evt {event}
	** @description this is the 
	*/	
	function controls(evt)
	{
		px = evt.pageX;
		py = evt.pageY;
		switch(evt.type)
		{
			case "mouseup":
			case "touchend":
				switch(state)
				{
					case "play":
						
					break;
				}
			break;	
			case "mousedown":
			case "touchstart":

				/*
				** sound control
				*/
				if(px/scale[0] > 0 && px/scale[0] < 40)
				{
					if(py/scale[1] > height-40 && py/scale[1] < height)
					{
						bgsound = !bgsound;
						bgsound ? music.play() : music.pause();
						return false;
					}
				}				

				/*
				** click sound
				*/
				switch(state)
				{
					case "intro":
					case "instructions":
					case "gameover":
					case "ad":
						click.pause();
						click.currentTime = 0;
						click.play();	
					break;	
				}			

				/*
				** game state
				*/
				switch(state)
				{
					case "intro":
						state = "instructions";
					break;
					case "instructions":
						state = "play";
					break;					
					case "play":		
						state = "gameover";
					break;
					case "gameover":
						/*
						** @description twitter post
						*/
						if(px/scale[0] > sx && px/scale[0] < (sx+173))
						{
							if(py/scale[1] > sy-10 && py/scale[1] < sy+44)
							{
								social.post('twitter', score.current);
								return false;
							}
						}	
						/*
						** @description serve ad
						*/											
						if(games_played == show_ad_after_games)
						{
							state = "ad";							
							if(!rated)
							{
            		if(typeof AppRate != "undefined"){AppRate.promptForRating(true);}
            		rated = true;								
							}
							ads.banner();
						}
						/*
						** @description continue playing
						*/						
						else
						{
							state = "play";
						}
						/*
						** @description incriment games played
						*/						
						games_played++;
					break;
					case "ad":
						/*
						** @description destroy banner
						*/
						ads.destroy();
						/*
						** @description reset game stuff
						*/
						score.current = 0;
						games_played = 0;						
						state = "play";
					break;				
				}
			break;
		}	
	}	

	/*
	** @method loop {iife}
	** @description this is the 
	*/	
	(function loop(){
		toggle = toggle ? false : true;
		if(toggle)
		{
			requestAnimationFrame(loop);
			return;
		}
		if(ready && !pause){draw();}
		requestAnimationFrame(loop);
	})();

	return {
		init:function(){init();},
		controls:function(evt){controls(evt);}
	}	
})();

/*
** @description this is for debugging in the browser
*/
if(
	window.navigator.userAgent.indexOf("Firefox") != -1 || 
	window.navigator.userAgent.indexOf("Chrome") != -1 ||
	window.navigator.userAgent.indexOf("OS X") != -1
)
{
	game.init();
}