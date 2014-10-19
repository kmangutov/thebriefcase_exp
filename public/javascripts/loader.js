


function facebookLoggedInCallback(response) 
{
	//FB.api("/me", {fields: "id,name,picture,cover",height: 500, width: 500}, 
	FB.api("/me/picture",{"height":"400","width":"400"},
	function(response)
	{
		console.log('response: ' + JSON.stringify(response));
		
			
		var src = response.data.url;
		//var cover_src = response.cover.source;
		//console.log("src:" + src);
		//console.log("cover_src: " + cover_src);
		$('#picture').attr("src", src);

		//console.log('response:' + JSON.stringify(response));
		//console.log('response.albums:' + JSON.stringify(response.albums));
		//var albums = response.albums.data;
		//console.log(JSON.stringify(albums));
	});


	//FB.api("/me/cover",
	//function(response)
	//{
	//	console.log(JSON.stringify(response));
	//});
}

function getGithubData(name) {
	//get information about a user's repos
	var data = $.get("https://api.github.com/users/"+name+"/repos");
	return data.responseJSON;
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
		"courses"
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
		map//JSON.stringify(map)
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
