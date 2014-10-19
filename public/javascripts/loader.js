


function facebookLoggedInCallback(response) 
{
	//FB.api("/me", {fields: "id,name,picture,cover",height: 500, width: 500}, 
	FB.api("/me/picture",{"height":"400","width":"400"},
	function(response)
	{
		console.log('response: ' + JSON.stringify(response));
		
			
		var src = response.data.url;
		$('#picture').attr("src", src);




		
		//this call is important.. post img src to backend
		map = {};
		map[uniqueNameKey] = myKey;
		map["src"] = src;

		$.post(
			"/api/facebook",
			map
		);


	});
}

function postGithub(data) {
	map = {};
	map[uniqueNameKey] = myKey;
	map["data"] = data;

	$.post(
		"/api/github",
		map
	);
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

var uniqueNameKey = "uniqueNameKey";
var myKey = "";

function linkedInSuccess(result) {
	myKey = result;
	$("#textarea").html(JSON.stringify(myKey));
}

function displayProfiles(profiles)
{
	member = profiles.values[0];
  	map = enumerate_profile_properties(member);
	console.log(JSON.stringify(map));

	$.post(
		"/api/linkedin",
		map,
		linkedInSuccess
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
