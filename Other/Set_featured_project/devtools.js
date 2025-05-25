(function() {
  function get_csrf_token() {
    var cookies_str = document.cookie;
    var cookies = cookies_str.split('; ').map(c => c.split('='));

    for (var [key, val] of cookies) {
      if (key == "scratchcsrftoken") return val;
    }
    return null;
  }

  async function get_user_name() {
    var fetch_respons = fetch('https://scratch.mit.edu/session/')
    
  
  async function set_featured_project(project_id, username, csrf_token, label) {
    if (!project_id) {
      console.log("Input Project ID");
      return null;
    }
    
    var fetch_response = fetch(`https://scratch.mit.edu/site-api/user/all/${username}`, {
      method: "PUT",
      headers: {
        "X-CSRFToken": csrf_token,
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        "User-Agent": navigator.userAgent,
        "Referer": "https://scratch.mit.edu/",
      },
      credentials: "include",
      body: JSON.stringify({
        featured_project: project_id,
        featured_project_label: label,
      })
    });
    if (fetch_repsonse.ok) {
      console.log("succsess");
    } else {
      console.log("Error : ",fetch_response.status);
    };
  };

  var label = prompt('Input label (If nothing is entered, it will automatically be My Favorite Things.)');
  if (!label) {
    label = 'My Favorite Things';
  };
