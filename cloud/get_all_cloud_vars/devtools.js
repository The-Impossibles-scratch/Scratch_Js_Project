async function get_all_cloud_vars(project_id,limit,offset) {
  const url = `https://clouddata.scratch.mit.edu/logs?projectid=${project_id}&limit=${limit}&offset=${offset}`;
  
  try {
    const fetch_respons = await fetch(url);
    const cloud_logs = await fetch_respons.json();
    
    if (cloud_logs.length == 0) {
      console.log("There seems to be no Cloud Data activity on this project…");
      return [];
    };
    
    const latest_cloud_logs = {};

    for (const cloud of cloud_logs) {
      if (!latest_cloud_logs[cloud.name] || latest_cloud_logs[cloud.name].timestamp < cloud.timestamp) {
        latest_cloud_logs[cloud.name] = cloud;
      };
    };
    
    for (const [name, log] of Object.entries(latest_cloud_logs)) {
      const output =
        `
----------------------------------------
User: ${log.user}
Data Name: ${log.name}
Action: ${log.verb}
Data Value: ${log.value}
Time: ${new Date(log.timestamp).toLocaleString()}
----------------------------------------
        `;
      console.log(output)
    };
  } catch (error) {
    console.log("Fetch Error : ",error);
    return [];
  };
};

var project_id = prompt("Input Project ID (If nothing is entered, it will automatically be the current Project Id.)");
if (!project_id) {
  const url = window.location.href;
  const projectId = url.match(/projects\/(\d+)/)?.[1];
  project_id = Number(projectId);
};

var limit = prompt("Input Limit (If nothing is entered, it will automatically be 1000.)");
if (!limit) {
  limit = 1000;
};
limit = Number(limit);

var offset = prompt("Input Offset (If nothing is enterd, it will automatically be 0).");
if (!offset) {
  offset = 0;
};
offset = Number(offset);

get_all_cloud_vars(project_id,limit,offset)
