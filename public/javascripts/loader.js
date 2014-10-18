
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
		"public-profile-url"
	];

	IN.API.Profile("me").fields(fields).result(displayProfiles);
}
 
function displayProfiles(profiles)
{
	member = profiles.values[0];
  	enumerate_profile_properties(member);
}

function enumerate_profile_properties(member)
{
	var elem = document.getElementById("textarea");
	elem.innerHTML += "<table>";
	var myMap = new Map();
	var property;
	for(property in member)
	{
		console.log("Name: " + property);
		console.log("Value: " + member[property]);

		myMap.set(property.toString(), member[property].toString());

		elem.innerHTML += "<tr><td>" + property + "</td><td>" + member[property] + "</td></tr>";
	}
	elem.innerHTML += "</table>"

	return myMap;

}


function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}
