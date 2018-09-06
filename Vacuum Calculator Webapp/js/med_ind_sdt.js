$(window).on('load',function(){
	
	
	var vac = localStorage.vac
	
	var simplex_btn = $('<div class="row top-buffer" id = "simplex_div" ><div class="col-xl-12 col-xs-12 text-center"><a href="#"><button type="button" class="btn btn-outline-primary btn-sz" id="simplex_btn">Simplex</button></a></div></div>');
	
	var duplex_btn = $('<div class="row top-buffer" id = "duplex_div" ><div class="col-xl-12 col-xs-12 text-center"><a href="#"><button type="button" class="btn btn-outline-primary btn-sz" id="duplex_btn">Duplex</button></a></div></div>');
	
	var triplex_btn = $('<div class="row top-buffer" id = "triplex_div" ><div class="col-xl-12 col-xs-12 text-center"><a href="#"><button type="button" class="btn btn-outline-primary btn-sz" id="triplex_btn">Triplex</button></a></div></div>');
	
	if(vac == "Medical"){
		
		$(".container-fluid").append(duplex_btn);
		$(".container-fluid").append(triplex_btn);
		
		
	}
	else if(vac == "Industrial"){
		
		$(".container-fluid").append(simplex_btn);
		$(".container-fluid").append(duplex_btn);
		$(".container-fluid").append(triplex_btn);
		
	}
	
	$("#simplex_btn").click(function(){
		
		
			
		localStorage.vac_type = "QVIS_sim";
		$(location).attr("href", "parameters.html");

		
	});

	$("#duplex_btn").click(function(){
		console.log("duplex");
		if(vac == "Medical"){
			
			localStorage.vac_type = "QVMS_dup"
			
		}
		else if(vac == "Industrial"){
			
			localStorage.vac_type = "QVIS_dup";
			
		}
		$(location).attr("href", "parameters.html");
		
	});

	$("#triplex_btn").click(function(){
		
		if(vac == "Medical"){
			
			localStorage.vac_type = "QVMS_tri"
			
		}
		else if(vac == "Industrial"){
			
			localStorage.vac_type = "QVIS_tri";
			
		}
		$(location).attr("href", "parameters.html");
		
	});
	
});


