var ports=3501;

var loaded_containers = [];
var state_map={};

var graph_map = {};
var canv_map = {};

var graph2_map = {};
var canv2_map = {};

var max_graph=20;

var newids=[];
var crids=[];

var previous_cpu={};

var image_map = {
	"Hello World":"lampros/node-web-app:vWrkbl",
	"Cpu Load":"lampros/primenumbers:vWrkbl",
	"Memory Load":"lampros/mem:vWrkbl",
}


function getStats(){
	$.get( "/docker_api", function( data ) {
	});
}

function postReq(urlpath, methd,params, callback){
var out = {};	

	$.get("/docker_api",
	{ url_path: urlpath,
      method:methd,
      extra:params
    }, function(data) {
    	if (data.status==="ERROR" && data.descr!==''){
    		bootstrap_alert.warning(data.descr, 'warning', 4000);	
    	}
		out = data;
	}).done(function() {
		callback(out);
  });
}

function startContainer(id){
	var params = {};
	ports++;
	params.PortBindings = {"8080/tcp": [{ "HostPort": ports }]};
	
	postReq('/containers/'+id+'/start','POST',params,
	function(resp){
		update_request();
	});
}

function stopContainer(id){
	var params = {};
	
	postReq('/containers/'+id+'/stop?t=5','POST',params,
	function(resp){
		update_request();
	});
}

function deleteContainer(id){
	var params = {};
	
	postReq('/containers/'+id+'?v=1','DELETE',params,
	function(resp){
		update_request();
	});
}


function createContainer(image){	
	var params = {};
	
	params.Image = image;
    params.ExposedPorts = {"8080/tcp":{}};
	
	postReq('/containers/create','POST',params,
	function(resp){
		update_request();
	});
}

function updateStats(id){
	var params = {};
	
	if(previous_cpu[id]===undefined){
		previous_cpu[id] = {"system":0,"cpu":0};		
	}
	
	postReq('/containers/'+id+'/stats?stream=0', 'GET',params,
	function(resp){
		console.log(resp);
		var mem_usage=resp.memory_stats.usage/1000000;
		
		var d_sys = resp.cpu_stats.system_cpu_usage-previous_cpu[id].system;
		var d_cpu = resp.cpu_stats.cpu_usage.total_usage-previous_cpu[id].cpu;
		
		var cpu_use = 100*d_cpu/d_sys;
		
		cpu_use = cpu_use>=0?cpu_use:0;
		
		previous_cpu[id] = {"system":resp.cpu_stats.system_cpu_usage,"cpu":resp.cpu_stats.cpu_usage.total_usage};
		updateCharts(id,cpu_use,mem_usage);
	});	
}

function resetCharts(id){
	if (graph_map[id].data.labels.length>2){	
		graph_map[id].data.labels=["",""];
		graph_map[id].data.datasets[0].data=[0,0];
	
		graph2_map[id].data.labels=["",""];
		graph2_map[id].data.datasets[0].data=[0,0];
		
		graph_map[id].update();
		graph2_map[id].update();
	}	
}

function updateCharts(id,value,value2){
	if (graph_map[id].data.labels.length<=max_graph){
		graph_map[id].data.labels.push("");
	}
	graph_map[id].data.datasets[0].data.push(value);
	if (graph_map[id].data.labels.length>max_graph){
		graph_map[id].data.datasets[0].data.splice(0,1);		
	}
		
	if (graph2_map[id].data.labels.length<=max_graph){
		graph2_map[id].data.labels.push("");
	}
	graph2_map[id].data.datasets[0].data.push(value2);
	if (graph2_map[id].data.labels.length>max_graph){
		graph2_map[id].data.datasets[0].data.splice(0,1);		
	}
	graph_map[id].update();
	graph2_map[id].update();
}


function update_table(cont_list){
	for (var st in cont_list){
		state_map[cont_list[st].Id] = cont_list[st].State;
	}	
	
	
	newids = [];
	crids=[];
	for (var i=0; i<cont_list.length; i++){
		var c_cont=cont_list[i];
		newids.push(c_cont.Id);
		if (loaded_containers.indexOf(c_cont.Id)===-1){
			loaded_containers.push(c_cont.Id);
			addTable(c_cont.Id);
			crids.push(c_cont.Id);			
		}
	}
	
	for (var j=0; j<loaded_containers.length; j++){
			var cid = loaded_containers[j];			
			if (newids.indexOf(cid)===-1){
				
				loaded_containers.splice(loaded_containers.indexOf(cid),1);
				$("#"+cid).remove();
				delete graph_map[cid];
				delete canv_map[cid];		
			}
		}	 
	
	for (var k=0; k<crids.length; k++){
		createGraph1(crids[k]);	
	}
	
	
	for (var i=0; i<cont_list.length; i++){
		var c_cont=cont_list[i];
		$("#"+c_cont.Id).find("#state_lb")[0].innerHTML = c_cont.State;
		$("#"+c_cont.Id).find("#status_lb")[0].innerHTML = c_cont.Status;
		$("#"+c_cont.Id).find("#name_lb")[0].innerHTML = c_cont.Names[0];
		$("#"+c_cont.Id).find("#image_lb")[0].innerHTML = c_cont.Image;
		if (c_cont.Ports.length!==0){
			$("#"+c_cont.Id).find("#ip_lb")[0].innerHTML = c_cont.Ports[0].IP+':'+c_cont.Ports[0].PublicPort;
		}
	}
}

function update_request(){
	var prev_cont = loaded_containers.splice();
	postReq('/containers/json?all=1', 'GET', undefined,update_table);
}

function addTable(id){
	$("#main_table").append
	('<tr class="cont_row" id="'+id+'">'+
					'<td class="name_hold">'+
						'<div class="legend">Name:</div>' +
						'<div id="name_lb">Name</div>'+
						'<div class="legend">Image:</div>' +
						'<div id="image_lb">Image</div>'+
						'<div class="legend">IP:</div>' +
						'<div id="ip_lb"> </div>'+
					'</td>'+
					'<td class="lbl_hold">'+
						'<div id="state_lb"> State </div>'+
						'<div id="status_lb"> Status </div>'+
					'</td>'+
					'<td class="btn_hold">'+
						'<button type="button" class="btn btn-default cont_ctrl start_btn">Start</button>'+
					'</td>'+
					'<td class="btn_hold">'+
						'<button type="button" class="btn btn-default cont_ctrl stop_btn">Stop</button>'+
					'</td>'+
					'<td class="btn_hold">'+
						'<button type="button" class="btn btn-danger cont_ctrl  delete_btn">Delete</button>'+
					'</td>'+
					'<td>'+
						'<div class="cpu_div"><div class="legend">CPU Usage</div><canvas id="cpu_cnv" height="100" width="300"></canvas></div>'+
					'</td>'+
					'<td>'+
						'<div class="mem_div" ><div class="legend">Memory Usage (MB)</div><canvas id="mem_cnv" height="100" width="300"></canvas></div>'+
					'</td>'+
				'</tr>');
			update(id);
	
}

function createCanvas(id){
	
	canv_map[id] = document.getElementById(id).childNodes[4].childNodes[0].childNodes[1];
}

function createGraph1(id){
			canv_map[id] = $("#"+id).find("canvas")[0];			
			graph_map[id] = new Chart(canv_map[id], {
			    type: 'line',
			    data: {
			        labels: [""],
			        datasets: [{
			            label: '% Cpu Load',
			            data: [0,0],
			            backgroundColor: [
			                 'rgba(75, 192, 192, 0.2)'
			            ],
			            borderColor: [
			                'rgba(75, 192, 192, 1)'
			            ]				          
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
							     max: 100,
				                    min: 0,
				                    stepSize: 25,
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			});
			
			canv2_map[id] = $("#"+id).find("canvas")[1];			
			graph2_map[id] = new Chart(canv2_map[id], {
			    type: 'line',
			    data: {
			        labels: [""],
			        datasets: [{
			            label: '% Mem Load',
			            data: [0,0],
			            backgroundColor: [
			                'rgba(54, 162, 235, 0.2)'
			            ],
			            borderColor: [
			                'rgba(54, 162, 235, 1)'
			            ]		          
			        }]
			    },
			    options: {
			        scales: {
			            yAxes: [{
			                ticks: {
			                    beginAtZero:true
			                }
			            }]
			        }
			    }
			});				
		}
		