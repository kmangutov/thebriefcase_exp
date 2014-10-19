
function facebookLoggedInCallback() 
{
	FB.api("/me", {fields: "id,name,picture,cover"}, 
	function(response)
	{
		var src = response.picture.data.url;
		var cover_src = response.cover.source;
		console.log("src:" + src);
		console.log("cover_src: " + cover_src);
		$('#picture').attr("src", cover_src);

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
		"courses"
	];

	IN.API.Profile("me").fields(fields).result(displayProfiles);
}
 
function displayProfiles(profiles)
{
	member = profiles.values[0];
  	map = enumerate_profile_properties(member);
	console.log(JSON.stringify(map));

	$.post(
		"/api/linkedin/add/",
		JSON.stringify(map)
	);
	//post("/api/linkedin/add", JSON.stringify(map));
}

function enumerate_profile_properties(member)
{
	var elem = document.getElementById("textarea");
	elem.innerHTML += "<table>";
	var myMap = {};
	for(property in member)
	{
		console.log("Name: " + property);
		console.log("Value: " + member[property]);

		myMap[property] = member[property];
		//myMap.set(property.toString(), member[property].toString());

		elem.innerHTML += "<tr><td>" + property + "</td> <td>" + member[property] + "</td></tr> <br>";
	}
	elem.innerHTML += "</table>"

	return myMap;

}


function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}
