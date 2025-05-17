async function get_cloud_logs(project_id,limit,offset) {
  const url = `https://clouddata.scratch.mit.edu/logs?projectid=${project_id}&limit=${limit}&offset=${offset}`;
  
  try {
    const fetch_respons = await fetch(url);
    const cloud_logs = await fetch_respons.json();
    
    if (cloud_logs.length == 0) {
      console.log("There seems to be no Cloud Data activity on this project…")
      return [];
    };
    
    for (const cloud of cloud_logs) {
      const output =
        `
----------------------------------------
User: ${cloud.user}
Data Name: ${cloud.name}
Action: ${cloud.verb}
Data Value: ${cloud.value}
Time: ${new Date(cloud.timestamp).toLocaleString()}
----------------------------------------
        `;
      console.log(output)
    };
  } catch (error) {
    console.log("Fetch Error : ",error);
    return [];
  };
};

let project_id = prompt("Input Project ID (If nothing is entered, it will automatically be the current Project Id.)");
if (!project_id) {
  const url = window.location.href;
  const projectId = url.match(/projects\/(\d+)/)?.[1];
  project_id = Number(projectId);
};

let limit = prompt("Input Limit (If nothing is entered, it will automatically be 0.)");
if (!limit) {
  limit = 100;
};
limit = Number(limit);

let offset = prompt("Input Offset (If nothing is enterd, it will automatically be 0).");
if (!offset) {
  offset = 0;
};
offset = Number(offset);

get_cloud_logs(project_id,limit,offset);
