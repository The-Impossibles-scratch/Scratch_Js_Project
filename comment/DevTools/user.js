async function comment(user, txt, parent_id, commentee_id) {
  function get_csrf_token() {
    const cookies_str = document.cookie;
    const cookies = cookies_str.split("; ").map(c => c.split("="));
    
    for (const [key, val] of cookies) {
      if (key == "scratchcsrftoken") {
        return val;
      }
    }
    return null;
  }
  
  const csrf_token = get_csrf_token();
  if (!csrf_token) {
    console.log("csrf_token not found");
    return;
  }
  
  let username;
  try {
    const get_username = await fetch("https://scratch.mit.edu/session/", {
      method: "GET",
      headers: {
        "X-CSRFToken": csrf_token,
        "X-Requested-With": "XMLHttpRequest"
      },
      credentials: "include",
    });
    const username_json = await get_username.json();
    username = username_json.user?.username;
    if (!username) {
      console.log("You must be logged in.");
      return;
    };
  } catch (error) {
    console.log("You must be logged in.");
    return;
  };
  
  const fetch_response = await fetch(`https://scratch.mit.edu/site-api/comments/user/${user}/add/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrf_token,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
      "Referer": "https://scratch.mit.edu/"
    },
    credentials: "include",
    body: JSON.stringify({
      content: txt,
      parent_id: parent_id,
      commentee_id: commentee_id
    })
  });
  if (fetch_response.status == 200) {
    console.log("status : Succsess");
    return;
  } else {
    console.log("status : Failed");
    return;
  };
};

