// I used ChatGPT a little bit to create it.
async function login(username,password) {
  await fetch("https://scratch.mit.edu/csrf_token/", {
    credentials: "include"
  });
  
  function get_cookies(cookie_name) {
    let cookies = null;
    let cookies_str = [];
    
    cookies_str = document.cookie;
    cookies = cookies_str.split("; ").map(c => c.split("="));
    for (const [key,val] of cookies) {
      if (key == cookie_name) {
        return val;
      }
    }
    return null;
  };

  const csrf_token = get_cookies("scratchcsrftoken")
  if (!csrf_token) {
    throw new Error("Not Found Scratchsrftoken")
  }

  const login = await fetch("https://scratch.mit.edu/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "X-CSRFToken": csrf_token,
      "Referer": "https://scratch.mit.edu"
    },
    body: new URLSearchParams({
      username: username,
      password: password
    }),
  });

  if (login.ok) {
    console.log("Succsessful to login");
    const session_id = get_cookies("scratchsessionsid");
    console.log(session_id);
  } else {
    console.log("Filed to login");
  };
}

login(prompt("Input Your Scratch Account's Name"), prompt("Input Your Scratch Account's Password"))    
