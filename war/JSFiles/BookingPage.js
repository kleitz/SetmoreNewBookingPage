
$(document).ready(function(){
	
	console.log("test");
	$('#loader').hide();
	window.onload = function(){
		alert("loaded");
		$('#datePicker').datepicker('setDate', new Date());
	};
	/*$('#datePicker').datepicker('setDate', new Date());*/
	
	$.ajax({
		type     : "GET",
		url      : "/bookingpage/companydetails",
		dataType : "json",
		success  : function(res){
			console.log(JSON.stringify(res));
			$.each(res, function(k,v){
				company_details = v.companyDetails;
			});
			
			region = company_details.region;
			postal_code = company_details.postal_code;
			locality = company_details.locality;
			timeZone = company_details.timeZone;
			street_address = company_details.street_address;
			company_name = company_details.companyName;
			country = company_details.country;
			currency = company_details.currency;
			
			address = street_address + "," + locality + "," + country;
			console.log(address);
			
			console.log("company name : " + company_name);
			
			
			$('#company-name').text(company_name);
			$('#company-name').show();
			
			
			
			$('#company-address').text(address);
			$('#company-address').show();
			
			
			
			
			geocoder = new google.maps.Geocoder();
		
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == google.maps.GeocoderStatus.OK)
			  {
			      
			      latitude = results[0].geometry.location.lat();
			      longtitude =  results[0].geometry.location.lng();
			      
			      
			      console.log("Latitude = " + latitude);
				  console.log("Longtitude = " + longtitude);
					
					
				  var mapOptions = {
							zoom: 12,
							center: new google.maps.LatLng(latitude,longtitude),
							mapTypeId: google.maps.MapTypeId.ROADMAP
							}
				  
							var map    = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);	
				  
							var marker = new google.maps.Marker({

								position: new google.maps.LatLng(latitude,longtitude),
							    map: map

						});
							
							
							
			     
			  }
			});
			
			
			


var serviceStaffPair=[];
	
   function serviceStaff(serviceName,serviceDuration,staffKeys){
		 this.serviceName     = serviceName;
		 this.serviceDuration = serviceDuration;
		 this.staffKeys       = staffKeys;
	 }
   
 var staffDetails=[];
   
   function staffKeyAndName(staffKey,staffName){
	   this.staffKey  = staffKey;
	   this.staffName = staffName;
   }
   
   
   
   		var serviceSelect = $('#selectService');
   		var serviceDiv = document.getElementById('serviceContainer');
   	   		console.log("service result :  "+ JSON.stringify(result));
   	   		
   	   		
   	   		
   		
 		 		$.each(result, function(key,value){

 		 			var service = value.services;
 		 				
 		 			$.each(service,function(k,v){	

 		 				    serviceName     = v.service_name;	
 		 					serviceDuration = v.duration;
 		 					serviceCost     = v.cost;
 		 					serviceKey		= v.key;
 		 					staffKeys 		= v.staff_keys;
 		 
 		 					serviceStaffPair.push(new serviceStaff(serviceName,serviceDuration,staffKeys));

 		 					//creating dropdown
 		 					 $('<option />', {value: serviceName, text: serviceName , class :'optionClassName'}).appendTo(serviceSelect);
 		 					 
 		 				});
 		 				
 		 		});
 		 		
 		 		serviceSelect.appendTo(serviceDiv);
 		 		
 		 		
 		 	
 		 		 var selectStaff = $('#selectStaff');
 	 		 	 var staffDiv  = document.getElementById('staffList');
 		 	
 	 		 	var selectService = document.getElementById("selectService"),
 	 		    selectedNode = selectService.options[selectService.selectedIndex];
 	 	
 		$('#selectService').change(function(event){
 			
 			// $('#selectStaff').removeAttr('disabled');
 	 		$('#loader').show();
 	 		
 	 		
 	 		$('#selectStaff').find('option[value!="all"]').remove();
 	 		//selectStaff.prepend('<option disabled selected value> Select staff </option>');
 	 		//selectStaff.prepend('<option value = "all" > All staff </option>');
 	 		
 			$this = $(event.target);
 			
 			service_name = ($this).val();
 			
 			console.log("service selected = " + service_name);
 			

 		service_staff_keys = [];
 		
						 $.ajax({
								
							    type        :  'GET',
								url         :  '/bookingpage/staff',
								dataType    :  'json',
								success     :  function(data){
									         
									
									         $('#loader').hide();
									         
									  // selectStaff.prepend('<option disabled selected value> Select staff </option>');
									         
									         console.log("staff result " + JSON.stringify(data));
												
									           staffResponse = JSON.stringify(data);
												
									           $.each(serviceStaffPair, function(Key,value){
													
									        	   if(value.serviceName == service_name ){	
														service_staff_keys = value.staffKeys;
														service_duration   = value.serviceDuration+"";
														}
													
													});
									           
									           console.log("service_staff_keys = " + service_staff_keys);
									           
									           
									           

				                                $.each(data, function(key,value){
													
													staffs = value.staffs;
												
													$.each(staffs, function(k,v){
														
														staffDetails.push(new staffKeyAndName(v.key,v.first_name));
														
														staff_key  = v.key;
														console.log("all the staff key " + staff_key);
														
														for(var i=0; i<service_staff_keys.length; i++){
															
															if(service_staff_keys[i] == staff_key){

																staffName = v.first_name;
																 staffkey = v.key;
									 		 					 $('<option />', {value: staffkey, text: staffName}).appendTo(selectStaff);
									 		 					 
							 $('#selectStaff').change(function(event){
									 		 	
									 			$target    = $(event.target);
									 			
									 			if($target.val() == "all"){
									 				staff_key = service_staff_keys;
									 			}else{
									 			staff_key  = $target.val();
									 			}
									 			console.log("the staff key selected for the target is " +staff_key);
									 		 		
									 			$('#datePicker').datepicker('setDate', new Date());
									 			console.log($('#datePicker').val());
									 			
									 			$('#datePicker').datepicker({
									 				 
									 				dateFormat : 'mm/dd/yy',
									 		 			          onSelect : function() {
									 		 						console.log("Inside datepicker");
									 		 						
									 		 						
									 		 					  slotsUl = $('#slotsUl');
											        			  
											        			  if($("#slotsUl li").hasClass("slotsLi")){
											        				  
											        				  slotsUl.empty();
											        				  
											        			  }
									 		 						
									 		 						
									 		 							$('#availableSlots').show();	
									 		 							displaySlots = $('#availableSlots');
									 		 							
									 		 							
								                                          selected_date = $("#datePicker").val()+"";
									 		 							 console.log("inside the datepicker, date = " , selected_date );
									 		 							 
									 		 							 
									 		 							 
									 		 							 
									 		 							 var inputValues = {
									 		 									
									 		 									'dateStr'    : selected_date,
									 		 									'resourceKey': staff_key,
									 		 									'duration'   : service_duration,
									 		 									'timezone'   : timeZone
									 		 									
									 		 							};
									 		 							console.log(JSON.stringify(inputValues));
									 		 							
									 		 			if($target.val() == "all"){			
									 		 							
									 		 							
									 		 //Making ajax call to get the time slots for all staffs 							
									 		 	
									 		 	$.ajax({
									 		 		url   :'/bookingpage/allstaffslots',   
									 		 		type  : 'POST',
										        	contentType :'application/json',
										        	data : JSON.stringify(inputValues),
										        	   
										        	   success : function(result){
										        		   console.log('inside the success call function of get all staff slots' + result);
										        		   
										        		   var slotResponse = JSON.parse(result);
										        		   console.log('slot response ' + slotResponse);
										        		   

										        		   let availableSlots = JSON.parse(slotResponse.msg);
										        		 console.log("available slots = " + availableSlots);
										        		   $.each(availableSlots , function(key,value){
										        			  console.log(value);
										        			  
										        			  eachStaffKey = key;
										        			  console.log(key);
										        			  
										        			  $.each(staffDetails, function(index,value){
										        				  $.each(value,function(k,v){
										        					  if(v.staffKey == eachStaffKey){
										        						  eachStaffName = v.staffName;
										        						  console.log(eachStaffName);
										        					  }
										        					  
										        				  });
										        			  });
										        			  
										        			  
										        			  //Looping through each staff slots
										        			  //console.log(eachStaffName + "'s available slots are = " );
										        			  $.each(value , function(ind,val){
										        				  console.log( moment.tz(val,timeZone).format("hh:mm a") );
										        			  })
										        			  
										        		//	  console.log( moment.tz(value,timeZone).format("hh:mm a") );
										        			  
										        			
										        			  
										        			  
										        			  
										        			  
										        			  slot = $("<li>").text( moment.tz(value,timeZone).format("hh:mm a"));
										        			  slot.addClass('slotsLi');
										        			  
										        			  slot.appendTo(slotsUl);

										        		   });
										        		   
										        		   
										        	   }, 
										        	   
										        	   error : function(xhr, status, error){
										        		   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
										        	   }
									 		 	
									 		 	});		
									 		 	
									 		 	
									 		 			}
									 		 			else{
									 		 	
									 		 	
									 		 	// Making AJAX call to get the time slots of the selected staff
									 		 	
									 			$.ajax({
									 		 		url   :'/bookingpage/slots',   
									 		 		type  : 'POST',
										        	contentType :'application/json',
										        	data : JSON.stringify(inputValues),
										        	   
										        	   success : function(result){
										        		   console.log('inside the success call function of get single staf slots' + result);
										        		   
										        		   var slotResponse = JSON.parse(result);
										        		   console.log('slot response ' + slotResponse);
										        		   

										        		   let availableSlots = JSON.parse(slotResponse.msg);
										        		 
										        		   $.each(availableSlots , function(index,value){
										        			  
										        			  console.log( moment.tz(value,timeZone).format("hh:mm a") );
										        			  
										        			
										        			  
										        			  
										        			  
										        			  
										        			  slot = $("<li>").text( moment.tz(value,timeZone).format("hh:mm a"));
										        			  slot.addClass('slotsLi');
										        			  
										        			  slot.appendTo(slotsUl);

										        		   });
										        		   
										        		   
										        	   }, 
										        	   
										        	   error : function(xhr, status, error){
										        		   console.log("inside error function " + error + "  and the status is " + status + "  and the xhr is " + xhr);
										        	   }
									 		 	
									 		 	});
									 		 	
									 		 			}
									 		 	
									  }						 
								});
									 		 					
						  });
															}									
														}
														
													});
													
												 });		
				                                
										},
								
								failure     :  function(data){
									           $('#loader').hide();
									           console.log('Failure function: ' + data);
									           
										}
							 
							});
						 
						 
 		});

 		
		},
		failure  : function(){
			
		}
	});
 			
});
