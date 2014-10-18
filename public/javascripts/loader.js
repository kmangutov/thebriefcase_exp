
function onLinkedInAuth() {
	console.log("LinkedIn API framework initialized!");
	//reference: https://developer.linkedin.com/documents/javascript-api-tutorial
	IN.API.Profile("me").result(displayProfiles); //argument for result is callback function
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
