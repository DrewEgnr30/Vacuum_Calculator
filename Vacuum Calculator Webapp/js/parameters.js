$(window).on('load', function(){
	
	console.log(localStorage.vac_type);
	var vac_type = localStorage.vac_type;
	
	if(vac_type.search("QVIS") > -1 || vac_type.search("QVMS") > -1){
		
		$("#back").attr("href","med_ind_sdt.html");
		
	}
	else if(vac_type.search("QV") > -1 && vac_type.search("S") == -1){
		
		$("#back").attr("href","pump_tm.html");
		
	}
	else if(vac_type.search("QSV") > -1){
		
		$("#back").attr("href","oil_inj.html");
		
	}
	else if(vac_type.search("QCV") > -1){
		
		$("#back").attr("href","index.html");
		
	}

});


$("#calculate").click(function(){
	
	var vac_type = localStorage.vac_type;
	var vac_level = parseFloat($("#vac_level").val());
	var needed_flow = parseInt($("#needed_flow").val());
	var QCVm_vac_levels = [0,6,12,18,21,24,25.5];
	var QCV_vac_levels = [0.4,6.3,12.2,18.1,21.1,24,27,27.7];
	var QSV_vac_levels = [18.1,21.1,24,27,27.7,28.4,29.3,29.8,29.9];
	var QCVm_top_flows = [755,750,742,720,696,649,614];
	var QCV_top_flows = [204,202,200,195,182,168,78,67];
	var QSV_top_flows = [2386,2642,2795,2927,2921,2822,2559,1812,629];
	var QV_top_flow = 190;
	var QVMS_top_flow = 66;
	var QVIS_top_flow = 190;
	var idx = 0;
	var jdx = 0;
	var QCV_idx = -1;
	var QCVm_idx = -1;
	var QCV_vac_level = -1;
	var QCVm_vac_level = -1;
	var QSV_idx = -1;
	var QSV_vac_level = -1;
	var cfm = 0;
	var vacuum = "";
	var kdx = 0;
	var vacuums = [];
	var inHgV = 0
	var inHgV_flag = 0;
	var last_vac = "";
	
	if(isNaN(vac_level) || isNaN(needed_flow)){
		
		alert("Please enter a flow and vacuum level.");
		return;
	}
	else if(vac_level > 29.9 || vac_level < 0){
		
		alert("Invalid vacuum level. Please enter a value between 0 and 29.9.");
		return;
	}
	else if(vac_type == "QCV"){
		
		$.each(QCV_vac_levels, function(index,value){
			
			if(vac_level > QCV_vac_levels[QCV_vac_levels.length -1]){
				
				
				return;
				
			}
			
			else if(value >= vac_level){
				
				idx = idx + 1;
				if(idx ==1){
					
					QCV_idx = index;
					QCV_vac_level = value;
					
				}
				
			}
			
		});
		$.each(QCVm_vac_levels, function(index,value){
			
			if(vac_level > QCVm_vac_levels[QCVm_vac_levels.length -1]){
				
				return;
				
			}
			
			else if(value >= vac_level){
				
				jdx = jdx + 1;
				if(jdx == 1){
				
					QCVm_idx = index;
					QCVm_vac_level = value;
					
				}
				
			}
			
		});
		
		if(QCV_vac_level == -1){
			
			alert("Vacuum level is too high.");
			return;
		}
		else if(needed_flow > QCV_top_flows[QCV_idx]){
			
			if(QCVm_vac_level == -1){
				
				alert("Vacuum level is too high");
				return;
			}
			else if(needed_flow > QCVm_top_flows[QCV_idx]){
				
				alert("Flow is too high for this unit.");
				return;
				
			}
			else{
				
				vac_level = QCVm_vac_level;
				
			}
			
		}
		else{
			
			vac_level = QCV_vac_level;
			
		}
		
		ajax_func_qcv_qsv();
	
		
		
		
		
	}
	else if(vac_type == "QSV"){
		
		$.each(QSV_vac_levels, function(index,value){
			
			if(vac_level > QSV_vac_levels[QSV_vac_levels.length -1]){
				
				
				return;
				
			}
			
			else if(value >= vac_level){
				
				idx = idx + 1;
				if(idx ==1){
					
					QSV_idx = index;
					QSV_vac_level = value;
					
				}
				
			}
			
		});
		
		if(QSV_vac_level == -1){
			
			alert("Vacuum level is too high.");
			return;
		}
		else if(needed_flow > QSV_top_flows[QSV_idx]){
			
			alert("Flow is too high for this unit.");
			return;
			
		}
		else{
			
			vac_level = QSV_vac_level;
			
		}
		
		ajax_func_qcv_qsv();
		
		
	}
	else if(vac_type == "QV"){
		
		if(needed_flow > QV_top_flow){
			
			alert("Flow is too high for this unit.");
			return;
		}
		
						
		ajax_func_other();	
		
		
	}
	else if(vac_type.search("QVMS") > -1){
		
		if(needed_flow > QVMS_top_flow){
			
			alert("Flow is too high for this unit.");
			return;
		}
		ajax_func_other();
		
	}
	else if(vac_type.search("QVIS") > -1){
		
		if(needed_flow > QVIS_top_flow){
			
			alert("Flow is too high for this unit.");
			return;
		}
		
		ajax_func_other();
		
	}

	
	

	function ajax_func_qcv_qsv(){
		
		$.ajax({
		type: "GET",
		url: "vacuums_final_qsv_qcv.xml",
		cache: false,
		dataType: "xml",
		success: function(xml){
			$(xml).find(vac_type).each(function(){
				$(this).find('vacuum').each(function(){
					$(this).find("model").each(function(){
						 vacuum = $(this).text();
					});
					$(this).find("vac_level").each(function(){
						$(this).find("inHgV").each(function(){
							inHgV = $(this).text();
							
							if(inHgV == vac_level){
								inHgV_flag = 1;
								
							}
							else{
								
								inHgV_flag = 0;
								
							}
						});
						$(this).find("flow").each(function(){
							cfm = $(this).text();

							
							if(inHgV_flag == 1 && cfm >= needed_flow){

								
								if(vacuum.substr(0,vacuum.search("-")) != last_vac){
									
									kdx = 0;
									
								}
								kdx = kdx + 1;
								if(kdx == 1){
								
									
									
								
									vacuums.push(vacuum);
									
								}
								
								last_vac = vacuum.substr(0,vacuum.search("-"));
								
							}
							
						});
					});
				});
			});
			console.log(vacuums);
			localStorage.setItem("vacuums", JSON.stringify(vacuums));
			$(location).attr("href", "results.html");
			
			}
		});
		
	}
	
	function ajax_func_other(){
		
		$.ajax({
		type: "GET",
		url: "vacuums_final_other.xml",
		cache: false,
		dataType: "xml",
		success: function(xml){
			$(xml).find(vac_type).each(function(){
				
				$(this).find("vacuum").each(function(){
					
					$(this).find("model").each(function(){
						
						vacuum = $(this).text();
						
					});
					
					$(this).find("flow").each(function(){
						
						cfm = $(this).text();
						
						if(cfm > needed_flow){
							
							if(vacuum.substr(0,vacuum.search("-")) != last_vac){
								
								kdx = 0;
								
							}
							kdx = kdx + 1;
							
							if(kdx ==1){
								
								vacuums.push(vacuum);
								
							}
							
							last_vac = vacuum.substr(0,vacuum.search("-"));
						}
						
					});
							
				});
			});

			console.log(vacuums);
			localStorage.setItem("vacuums", JSON.stringify(vacuums));
			$(location).attr("href", "results.html");
			}
		});	
		
	}
	
	
});