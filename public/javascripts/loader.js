
function facebookLoggedInCallback(response) 
{
	FB.api("/me", {fields: "id,name,picture,cover,statuses,albums"}, 
	function(response)
	{
		var src = response.picture.data.url;
		//var cover_src = response.cover.source;
		console.log("src:" + src);
		//console.log("cover_src: " + cover_src);
		$('#picture').attr("src", src);

		var albums = response.albums.data;
	});
}



function onLinkedInAuth() {
	console.log("LinkedIn API framework initialized!");
	//reference: https://developer.linkedin.com/documents/javascript-api-tutorial
	var fields = [
		"first-name",
		"last-name",
		"headline",
		"location:(name)",
		"industry",
		"num-connections",
		"summary",
		"specialties",
		"positions",
		"picture-url",
		"public-profile-url",
		"skills",
		"courses"//,
		//"company:(name)",
		//"positions:(title)"
	];

	IN.API.Profile("me").fields(fields).result(displayProfiles);
}
 
function displayProfiles(profiles)
{
	member = profiles.values[0];
  	map = enumerate_profile_properties(member);
	console.log(JSON.stringify(map));

	$.post(
		"/api/linkedin",
		JSON.stringify(map)
	);
	//post("/api/linkedin/add", JSON.stringify(map));
}

function enumerate_profile_properties(member)
{
	var myMap = {};
	for(property in member)
	{
		myMap[property] = member[property];
	}
	return myMap;
}


function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}
