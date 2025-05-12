const ws = new WebSocket("wss://clouddata.scratch.mit.edu");

ws.onopen = () => {
  const username = document.querySelector('.profile-name').textContent;
  
  const project_id = prompt("Input Project ID (If nothing is entered, it will automatically be the current Project Id.)");
  if (typeof project_id !== 'number' || isNaN(project_id)) {
    throw new Error("Input Project Id (Number Only)");
  };

  if (project_id == null) {
    const url = window.location.href;
    const projectId = url.match(/projects\/(\d+)/)?.[1];
    project_id = projectId
  };

  ws.send(JSON.stringify({
    "method":"handshake",
    "user":username,
    "project_id":project_id
  }) + "\n");

  const cloud_var = prompt("Input Cloud Var Name (If nothing is entered, it will automatically be 'My Cloud Var')");
  const cloud_value = prompt("Input Cloud Value (If nothing is entered, it will automatically be '0')");
  
  if (typeof cloud_value !== 'number' || isNaN(cloud_value)) {
    throw new Error("Input Cloud Value (Number Only)");
  };

  if (cloud_value == null) {
    cloud_value = "0";
  };

  if (cloud_var == null) {
    cloud_var = "My Cloud Var";
  };

  console.log("Start");
  
  ws.send(JSON.stringify({
    "method":"set",
    "user":username,
    "project_id":project_id,
    "name":"☁" + cloud_var,
    "value":cloud_value
  }) + "\n");

  console.log("FINISH");
  ws.close()
}

ws.onclose = () => {
  console.log("Closed")
}
