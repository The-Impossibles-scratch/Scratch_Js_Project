// maybe this is not working now.
(function() {
  console.log(`
--------------------------------------------------------
Credit to @World Languages
Url-Sc : https://scratch.mit.edu/users/World_Languages
Url-Gi : https://github.com/WorldLanguages
Based On animatedThumbnailsBookmarklet
--------------------------------------------------------
              `)
  function get_current_url() {
    var url = window.location.href;
    var projectid = url.match(/projects\/(\d+)/)?.[1];
    if (!projectid) { 
      console.log("Please Go to Your Project or Input Your Project Id");
      throw new Error();
    } else {
      return Number(projectid);
    };
  };
  
  function get_csrf_token() {
    var cookies_str = document.cookie;
    var cookies = cookies_str.split("; ").map(c => c.split("="));

    for (var [key , val] of cookies) {
      if (key == "scratchcsrftoken") {
        return val;
      };
    };
    return;
  };

  function upload_file(file) {
    var reader = new FileReader();
    reader.onload = async function(e) {
      try {
        var fetch_response = await fetch(`https://scratch.mit.edu/internalapi/project/thumbnail/${project_id}/set/`, {
          method: "POST",
          headers: {
            "X-csrftoken": csrf_token
          },
          body: e.target.result
        });
        if (!fetch_response.ok) {
          console.log("Upload failed:", fetch_response.status);
          return;
        } else {
          console.log("Upload successful!");
          return;
        };
      } catch (error) {
        console.log("Fetch Error : ", error);
        return;
      };
    };
    reader.readAsArrayBuffer(file);
  };

  var project_id = prompt("Input Project ID (If nothing is entered, it will automatically be the current Project Id.)");
  if (!project_id) {
    project_id = get_current_url();
  };
  
  var csrf_token = get_csrf_token();
  if (!csrf_token) {
    console.log("CSRF Token Not Found");
    return;
  };

  var file_input = document.createElement("Input");
  file_input.type = "file";
  file_input.accept = "image/*";
  file_input.onchange = () => {
    if (file_input.files.length > 0) {
      upload_file(file_input.files[0]);
    };
  };
  file_input.click();
})();
