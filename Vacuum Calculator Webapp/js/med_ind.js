$("#med_btn").click(function(){
	
	localStorage.vac = $("#med_btn").text();
	$(location).attr('href', "med_ind_sdt.html");
});

$("#ind_btn").click(function(){
	
	localStorage.vac = $("#ind_btn").text();
	$(location).attr('href', "med_ind_sdt.html");
	
});