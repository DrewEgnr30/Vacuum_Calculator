
$(window).on('load', function(){
	
	var vacuums = JSON.parse(localStorage.getItem("vacuums"))
	var vac_type = localStorage.vac_type;
	var container = $("#start_over");
	var html =[];
	
	$.each(vacuums, function(index,value){
		
		console.log(index + "," + value);
		html.push('<div class="row"><div class="col-xl-12 col-xs-12 text-center"><h1 >Recommended Vacuum</h1></div></div><div class="row"><div class="col-xl-12 col-xs-12 text-center"><img id="img_vac' + index + '" ></div></div><div class="row"><div class="col-xl-12 col-xs-12 text-center"><h1 id="rec_vac' + index + '"></h1></div></div><div class="row top-buffer justify-content-md-center"><div class="col-xl-4 col-xs-12 text-center"><a class="brochure" href = "#" id="brochure' + index + '"><i class="fas fa-book" data-toggle="tooltip" title="Brochure"></i></a></div></div>');
		

		
	});
	
	container.before(html.join(""));
	
	$.each(vacuums, function(index,value){
		source = "photos/" + value + ".png";
		$("#rec_vac" + index).text(value);
		
		if(vac_type == "QCV"){
			
			$("#img_vac" + index).attr("src",source);
			$("#brochure"+index).attr("href","http://www.revbase.com/tt/sl.ashx?z=12b3cd59&DataID=2367660&ft=1");
		}
			
		else if(vac_type == "QSV"){
			
			$("#img_vac" + index).attr("src",source);
			$("#brochure"+index).attr("href","http://www.revbase.com/tt/sl.ashx?z=12b3cd59&DataID=2721430&ft=1");
			
			
		}
		else if(vac_type == "QV"){
			
			$("#img_vac" + index).attr("src",source);
			$("#brochure" + index).attr("href","http://www.revbase.com/tt/sl.ashx?z=12b3cd59&DataID=51182&ft=1");
			

		}
		else if(vac_type.search("QVIS") > -1){
			
			$("#img_vac" + index).attr("src","photos/QVIS.png");
			$("#brochure" + index).attr("href","http://www.revbase.com/tt/sl.ashx?z=12b3cd59&DataID=51182&ft=1");
			

		}
		else if(vac_type.search("QVMS") > -1){
			
			$("#img_vac" + index).attr("src","photos/QVMS.png");
			$("#brochure" + index).attr("href","http://www.revbase.com/tt/sl.ashx?z=12b3cd59&DataID=153857&ft=1");
			

		}
		
	});
	
});