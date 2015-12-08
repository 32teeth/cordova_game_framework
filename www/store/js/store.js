/*
** @author Eugene Andruszczenko
** @version 0.1
** @date December 8th, 2015
** @description 
** store.js is
*/
var store = (function(){
	/*
	** @param css {string}
	** @description css
	*/
	var css;

	/*
	** @param container {object}
	** @description container
	*/
	css = "display:none; position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(255,255,255,0.75);overflow-y:scroll;overflow-x:hidden;";
	var container = document.createElement('div');
	container.setAttribute("style", css);

	/*
	** @param container {object}
	** @description container
	*/
	css = "width:100%;font-family:bit;padding:10px;";
	var header = document.createElement('h1');
	header.setAttribute("style", css);	
	header.innerHTML = "more apps"

	/*
	** @param button {object}
	** @description button
	*/
	var button = function(action)
	{
		css = "width:30px;height:30px;border:none;position:fixed;top:5px;cursor:pointer;";
		var btn = document.createElement('input');	
		btn.setAttribute("type", "image");
		switch(action)
		{
			case "open":
				css += "left:5px;";
				btn.setAttribute("onclick", "store.state();return false;");
				btn.setAttribute("src", "store/img/button-open.png");
			break;
			case "close":
				css += "right:5px;";
				btn.setAttribute("onclick", "store.state();return false;");
				btn.setAttribute("src", "store/img/button-close.png");
			break;
		}
		btn.setAttribute("style", css);			
		return btn;
	};

	/*
	** @param table {object}
	** @description table
	*/
	css = "width:100%;border:0;padding:0;margin:0;";
	var table;	
	var table = document.createElement('table');
	table.setAttribute("style", css);

	/*
	** @param row {method}
	** @description row
	*/
	var row = function(link)
	{
		css = "height:50px;background:rgba(255,255,255,0.5);border-radius:5px;cursor:pointer;";
		var tr = document.createElement('tr');
		tr.setAttribute("style", css);
		tr.setAttribute("href", link);
		tr.setAttribute("onclick", "window.open('" + link + "');return false;");
		return tr;
	}

	/*
	** @param cell {method}
	** @description cell
	*/
	var cell = function()
	{
		css = "padding:5px;";
		var td = document.createElement('td');
		td.setAttribute("style", css);
		return td;
	}	

	/*
	** @param icon {method}
	** @description icon
	*/
	var icon = function(src)
	{
		css = "height:50px;border-radius:5px;";
		var img = document.createElement('img');
		img.setAttribute("style", css);
		img.setAttribute("src", src);		
		return img;
	}		

	/*
	** @param apps {object}
	** @description apps
	*/
	var apps = {
		bat:{
			name:"super angry turbo ultra masked pixel",
			icon:"icon-bat.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-masked/id1035134607?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.masked"
			}
		},
		beacongoseek:{
			name:"beaconGoSeek",
			icon:"icon-beacongoseek.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/beacongoseek/id865407733?mt=8",
				android:""
			}
		},
		bounce:{
			name:"super angry turbo ultra bounce pixel",
			icon:"icon-bounce.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-bounce/id1036400219?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.bounce"
			}
		},
		cloud:{
			name:"super angry turbo ultra cloud pixel",
			icon:"icon-cloud.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-cloud/id1039172210?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.boom"
			}
		},
		dash:{
			name:"dashy - dashwhale manager",
			icon:"icon-dash.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/dashy-dashwhale-manager/id1033268631?mt=8",
				android:""
			}
		},
		explode:{
			name:"super angry turbo explode ultra ",
			icon:"icon-explode.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-exploding/id1034013341?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.explode"
			}
		},
		hopper:{
			name:"hopper - ltc rabbit manager",
			icon:"icon-hopper.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/hopper-ltc-rabbit-manager/id1029891452?mt=8",
				android:""
			}
		},
		jump:{
			name:"super angry turbo ultra jump pixel",
			icon:"icon-jump.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-jump/id1031413019?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.jump"
			}
		},
		lander:{
			name:"super angry turbo ultra lander pixel",
			icon:"icon-lander.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-lander/id1046563888?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.lander"
			}
		},
		myclothesline:{
			name:"my clothes line",
			icon:"icon-myclothesline.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/my-clothes-line/id999018766?ls=1&mt=8",
				android:""
			}
		},
		pinger:{
			name:"pinger +",
			icon:"icon-pinger.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/pinger+/id844309304?mt=8",
				android:""
			}
		},		
		runbat:{
			name:"super angry turbo ultra run pixel - bat like edition",
			icon:"icon-run-bat.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-run/id1035161723?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.batman"
			}
		},
		run:{
			name:"super angry turbo ultra run pixel",
			icon:"icon-run.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-run/id1031324216?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.pixelrun"
			}
		},
		ski:{
			name:"super angry turbo ultra ski pixel",
			icon:"icon-ski.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-ski/id1029119124?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.angryski"
			}
		},
		splash:{
			name:"super angry turbo ultra splash pixel",
			icon:"icon-splash.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-splash/id1043210374?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.drop"
			}
		},
		timber:{
			name:"super angry turbo ultra chop pixel",
			icon:"icon-timber.png",
			link:{
				apple:"itms-apps://itunes.apple.com/us/app/super-angry-turbo-ultra-chop/id1040577918?mt=8",
				android:"https://play.google.com/store/apps/details?id=com.fakesite.timber"
			}
		}	
	}

	for(var app in apps)
	{
		var link = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? "apple" : "android";
		var tr = row(apps[app].link[link]);
		var td = cell();
		var img = icon("store/img/" + apps[app].icon);
		td.appendChild(img);
		td.style.textAlign = "center";
		td.style.verticalAlign = "middle";
		td.style.padding = "10px 5px 5px 5px";
		tr.appendChild(td);

		td = cell();
		td.innerHTML = apps[app].name;
		td.style.padding = "5px 5px 5px 10px";
		tr.appendChild(td);

		table.appendChild(tr);
	}

	/*
	** @description build display
	*/
	document.body.appendChild(button("open"));

	container.appendChild(header);
	container.appendChild(table);
	container.appendChild(button("close"));
	document.body.appendChild(container);

	function state()
	{
		document.querySelectorAll("div")[0].style.display = document.querySelectorAll("div")[0].style.display == "block" ? "none" : "block";
	}

	return{
		state:function(){state();}
	}
})();