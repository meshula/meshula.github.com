
function photoJsonToImg(photo, size) {
    extension = "_z.jpg";
    switch (size) {
    case 'thumb': extension = "_t.jpg"; break;
    case 'small': extension = "_s.jpg"; break;
    case 'medium': extension = "_z.jpg"; break;
    }

	return "http://farm" + photo.farm + ".static.flickr.com/" + photo.server + "/" + 
	       photo.id + "_" + photo.secret + extension;
}

function FlickrPhotoSet(flickrset) {

    //SET API CALL BASED ON INPUT
    var apiCall = "http://api.flickr.com/services/rest/?";
    apiCall +=    "format=json&method=flickr.photosets.getPhotos&";
    apiCall +=    "photoset_id=" + flickrset + "&per_page=100&page=1&";
    apiCall +=    "api_key=821eea9ef1941bca28115fd91e1f9f2a&jsoncallback=?";

    //PRINT API CALL (DEBUG)    
    //$("<span>").html(apiCall+"<br>").appendTo("body");

    //SEND API CALL AND RETURN RESULTS TO A FUNCTION    
    $.getJSON(apiCall, function(data) {
		
		if (data.photoset.photo.length > 0) { 
		    var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + data.photoset.photo[0].id + "/";
			$("<img/>").attr("src", photoJsonToImg(data.photoset.photo[0], 'original'))
			           .addClass("photo")
			           .replaceAll(".photo")
			           .wrap(("<a href='" + a_href + "'></a>"));
		}
		
		//LOOP THROUGH DATA
		$.each(data.photoset.photo, function(i, photo) {
			
			//LINK TO IMAGE PAGE (REQUIRED BY FLICKR TOS)
			var a_href = "http://www.flickr.com/photos/" + data.photoset.owner + "/" + photo.id + "/";
			
			//PLACE IMAGE IN IMAGE TAG AND APPEND TO IMAGES DIV 
			$("<img/>").attr("src", photoJsonToImg(photo, 'small')).appendTo("#gallery-index")
				.click(function(){
							$("<img/>").attr("src", photoJsonToImg(photo, 'original'))
							           .addClass("photo")
							           .replaceAll(".photo")
								       .wrap(("<a href='" + a_href + "'></a>"));
				       });
			});

    });

}


