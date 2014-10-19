

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
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

	post("/api/linkedin/", map);
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
