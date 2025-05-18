async function comment(user, txt, parent_id, commentee_id) {
  function get_csrf_token() {
    const cookies_str = document.cookie;
    const cookies = cookies_str.split("; ").map(c => c.split("="));
    
    for (const [key, val] of cookies) {
      if (key === "scratchcsrftoken") {
        return val;
      }
    }
    return null;
  }

  const csrf_token = get_csrf_token();
  if (!csrf_token) {
    console.log("CSRF token not found");
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
      credentials: "include"
    });

    const username_json = await get_username.json();
    username = username_json.user?.username;

    if (!username) {
      console.log("You must be logged in.");
      return;
    }
  } catch (error) {
    console.log("You must be logged in.");
    return;
  }

  const fetch_response = await fetch(`https://scratch.mit.edu/site-api/comments/user/${user}/add/`, {
    method: "POST",
    headers: {
      "X-CSRFToken": csrf_token,
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json",
      "User-Agent": navigator.userAgent,
      "Referer": "https://scratch.mit.edu/"
    },
    credentials: "include",
    body: JSON.stringify({
      content: txt,
      parent_id: parent_id,
      commentee_id: commentee_id
    })
  });

  if (fetch_response.status === 200) {
    console.log("Status: Success");
  } else {
    console.log("Status: Failed");
  }
}

async function get_parent_id(username) {
  try {
    const user_data_response = await fetch(`https://api.scratch.mit.edu/users/${username}/`);
    const user_data_json = await user_data_response.json();
    return user_data_json.id;
  } catch (error) {
    console.log("Fetch Error:", error);
    return null;
  }
}

(async () => {
  let username = prompt("Input User Name (If nothing is entered, it will automatically be the current username.)");
  if (!username) {
    const url = window.location.href;
    username = url.match(/users\/([^\/]+)\//)?.[1];
  }

  let txt = prompt(`Input Comment Content (If nothing is entered, it will automatically be "Hello @${username}!")`);
  if (!txt) {
    txt = `Hello @${username}!`;
  }

  const replay = prompt("If you want to reply to a comment, input 'Y' (If nothing is entered, your comment will not be a reply.)");

  if (!replay) {
    await comment(username, txt, "", "");
  } else if (replay === "Y") {
    const parent_id = await get_parent_id(username);
    const commentee_id_str = prompt("Input Commentee ID");

    if (!commentee_id_str) {
      throw new Error("You must input a Commentee ID.");
    };

    const commentee_id = Number(commenteed_id_str)
    
    await comment(username, txt, parent_id, commentee_id);
  } else {
    throw new Error("Please input 'Y' or leave it blank.");
  }
})();

