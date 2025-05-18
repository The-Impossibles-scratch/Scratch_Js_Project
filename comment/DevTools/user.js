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

async function get_parent_id(username) {
  try {
    const user_data_respons = await fetch(`https://api.scratch.mit.edu/users/${username}/`);
    const user_data_json = await user_data_respons.json();

    return user_data_json.id;
  } catch (error) {
    console.log("Fetch Error : ",error);
    return;
  };
};

var username = prompt("Input User Name (If nothing is entered, it will automatically be the current Username.)");
if (!username) {
  const url = window.location.herf;
  username = url.match(/users\/([^\/]+)\//)?.[1];
};

var txt = prompt(`Input Comment Content (If nothing is enterd, it will automatically be "Hello ${username}!" )`);
if (!txt) {
  txt = `Hello ${username}!`;
};

var replay = prompt("If you want to replay to a comment, Input 'Y' (If nothing is enterd, Your comment will not be replied.)");
if (!repaly) {
  comment(username,txt,"","");
} else if (replay == "Y") {
  var parent_id = get_parent_id(username);
  var commentee_id = prompt("Input Commentee Id");
  if (!commentee_id) {
    throw new Error("Input Commentee Id");
  };
  comment(username,txt,parent_id,commentee_id);
} else {
    throw new Error("Input Y or Nothing");
  };
};
