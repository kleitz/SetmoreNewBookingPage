<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Setmore Booking page</title>
 
      <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAIWbhUy5liy6BOaw982UY8cAmyrNjLCDA"></script>
      <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
     
      <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
      
</head>

     <script>

         result = ${services};
         console.log("the result value is " + result);

     </script>

<body>

 <div id="map-canvas"></div>
       
 
 <div id='container'>
 
 
  <div id="company-details"> 
 
    <div id="company-name"></div>
    <div id="company-address"></div>
 
  </div>
 
 
  <div id ='serviceContainer'>
    
     <select id='selectService'> </select>
     <!--  <div id='serviceList' class ='serviceListClass'></div> -->
      
  </div>
    
    
  <div id='staffContainer'>
       
     <div id='loader'></div>
     <select id='selectStaff'>
       <option value = "all" > All staffs </option>
     </select>
        
    
  </div>
  
    
  <input type ='text' id='datePicker'></input>
        
         
  
</div>      
    
  <div id="availableSlots"><ul id ='slotsUl'> </ul> <div id = 'print'></div></div>        
     
  
      <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <script src = "https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.19.1/moment.min.js" type="text/javascript"></script>
      <script src="https://momentjs.com/downloads/moment-timezone.js"></script>
      <script src="https://momentjs.com/downloads/moment-timezone-with-data-2012-2022.js"></script>
      <script src="https://momentjs.com/downloads/moment-timezone-with-data.js"></script> 
      <link rel = "stylesheet" type="text/css" href = "/DesignFiles/design.css" /> 
      <script src="/JSFiles/BookingPage.js?id=2"></script>  
</body>
</html>