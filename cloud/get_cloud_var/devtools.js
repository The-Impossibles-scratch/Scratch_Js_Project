async function get_cloud_var(project_id,limit,offset,filter_by_name) {
  const url = `https://clouddata.scratch.mit.edu/logs?projectid=${project_id}&limit=${limit}&offset=${offset}`;
  
  try {
    const fetch_respons = fetch(url);
    const cloud_logs = fetch_respons.json();
    
    if (cloud_logs.length == 0) {
      console.log("There seems to be no Cloud Data activity on this project…");
      return [];
    };
    
    const filtered_cloud_logs = cloud_logs.filter(cloud => cloud.name == filter_by_name);
    
    if (filtered_cloud_logs.length == 0) {
      console.log("There seems to be no Cloud Data activity for the specified variable…");
      return [];
    };
    
    const latest_cloud_log = filtered_cloud_logs.reduce((prev,current) => {
      return (prev.timestamp > current.timestamp) ? prev : current;
    });
    
    const output = 
    `
----------------------------------------
User: ${latest_cloud_log.user}
Data Name: ${latest_cloud_log.data}
Action: ${latest_cloud_log.verb}
Data Value: ${latest_cloud_log.value}
Time: ${new Date(latest_cloud_log.timestamp).toLocaleString()}
----------------------------------------
    `;
    console.log(output);

  } catch (error) {
    console.log("Fetch Error : ", error);
    return [];
  };
};

var project_id = prompt("Input Project ID (If nothing is entered, it will automatically be the current Project Id.)");
if (!project_id) {
  const url = window.location.href;
  const projectId = url.match(/projects\/(\d+)/)?.[1];
  project_id = Number(projectId);
};

var filter_by_name = prompt("Input Cloud Var");
if (!filer_by_name) {
  throw new Error("Please Input Cloud Var");
};

var limit = prompt("Input Limit (If nothing is entered, it will automatically be 100.)");
if (!limit) {
  limit = 100
};
limit = Number(limit);

var offset = prompt("Input Offset (If nothing is enterd, it will automatically be 0).");
if (offset) {
  offset = 0;
};
offset = Number(offset);

get_cloud_var(project_id,filter_by_name,limit,offset);
