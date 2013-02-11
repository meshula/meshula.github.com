
		function coverIFrames(){
			var allIFrames = $(".iframeAppViewer");
			var i = 0;
			for(i=0; i<allIFrames.length; i++){
				var frame = allIFrames[i];
				var newDiv = document.createElement("div");
				newDiv.setAttribute("class", "tempCoverupDiv");
				frame.parentNode.insertBefore(newDiv, frame);
				$(newDiv).css({zIndex: lastZIndex});
			}
		}
		function uncoverIFrames(){
			var divsToDelete = $(".tempCoverupDiv");
			var i = 0;
			for(i=0; i<divsToDelete.length; i++){
				var delDiv = divsToDelete[i];
				delDiv.parentNode.removeChild(delDiv);
			}
		}
		var lastZIndex = 1;
		function bringToFront(div){
			//sendAllIFramesToBack();
			$(div).css({zIndex: lastZIndex});
			lastZIndex++;
		}
		function closeIFrame(parentDiv){
			$(parentDiv).hide('highlight');
			parentDiv.parentNode.removeChild(parentDiv);
		}
		function openIFrame(appName, appURL){
		    var count = 1;
			var templateText = document.getElementById('appTemplateDiv').innerHTML;
			templateText = templateText.replace(/APP_COUNT/g, count);
			templateText = templateText.replace(/APP_TITLE/g, appName);
			templateText = templateText.replace(/APP_URL/g, appURL);
			var newDiv = document.createElement("div");
			newDiv.innerHTML = templateText;
			var offsetX = (30+(count%5)*15) + "px";
			var offsetY = (100+((count/5)%4)*15) + "px";
			$(newDiv).css({display: "none", position: "absolute", top: offsetY, left: offsetX});
			newDiv.setAttribute("class", "appContainerDiv");
			newDiv.setAttribute("onmousedown", "bringToFront(this);");
			bringToFront(newDiv);
			document.body.appendChild(newDiv);
			$(newDiv).draggable({grid: [5, 5], start: function(event,ui){coverIFrames();}, stop: function(event,ui){uncoverIFrames();} });
			$(newDiv).resizable({grid: [5, 5], start: function(event,ui){coverIFrames();}, stop: function(event,ui){uncoverIFrames();} });
			$(newDiv).show('highlight');
			count++;
		}