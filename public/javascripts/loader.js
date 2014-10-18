
function onLinkedInAuth() {
	console.log("LinkedIn API framework initialized!");
	//reference: https://developer.linkedin.com/documents/javascript-api-tutorial
	var fields =
	["id",
	"first-name",
	"last-name",
	"maiden-name",
	"formatted-name",
	"phonetic-first-name",
	"phonetic-last-name",
	"formatted-phonetic-name",
	"headline",
	"location:(name)",
	"location:(country:code))",
	"industry",
	//"distance",
	//"relation-to-viewer:(distance)",
	//"relation-to-viewer(related-connections)",
	"current-share",
	//"num-connections",
	//"num-connections-capped",
	"summary",
	"specialties",
	"positions",
	"picture-url",
	"site-standard-profile-request",
	"api-standard-profile-request:(url)",
	"api-standard-profile-request:(headers)",
	"public-profile-url" ];
	IN.API.Profile("me").fields(fields)result(displayProfiles); //argument for result is callback function
}

function displayProfiles(profiles)
{
	member = profiles.values[0];
	//	 document.getElementById("profiles").innerHTML = 
	//"<p id=\"" + member.id + "\">Hello " +  member.firstName + " " + member.lastName + "</p>";
  	enumerate_profile_properties(member);

//  	document.getElementById("profiles").innerHTML = 
//  		member;
}

function enumerate_profile_properties(member)
{
	var property;
	for(property in member)
	{
		console.log("Name: " + property);
		console.log("Value: " + member[property]);

	}
}


function onLinkedInLoad() {
     IN.Event.on(IN, "auth", onLinkedInAuth);
}
