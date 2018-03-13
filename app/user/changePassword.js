$(document).ready(function(){

var pageContent = "";

pageContent += "  <form id='changePasswordForm' class='form-horizontal' action='#'>";
pageContent += "    <div class='form-group'>";
pageContent += "       <label class='control-label col-sm-2'>Old Password</label>";
pageContent += "       <div class='col-sm-10'>";
pageContent += "         <input type='password' class='form-control' id='opwd' name='opwd'>";
pageContent += "       </div>";
pageContent += "    </div>";
    
pageContent += "     <div class='form-group'>";
pageContent += "       <label class='control-label col-sm-2'>New Password:</label>";
pageContent += "       <div class='col-sm-10'>";
pageContent += "         <input type='password' class='form-control' id='npwd' name='npwd'>";
pageContent += "       </div>";
pageContent += "     </div>";

pageContent += "     <div class='form-group'>";
pageContent += "       <label class='control-label col-sm-2'>Confirm Password:</label>";
pageContent += "       <div class='col-sm-10'>";          
pageContent += "         <input type='password' class='form-control' id='cpwd' name='cpwd'>";
pageContent += "       </div>";
pageContent += "     </div>";

pageContent += "     <div class='form-group'>";        
pageContent += "       <div class='col-sm-offset-2 col-sm-10'>";
pageContent += "        <button type='submit' class='btn btn-success'>Submit</button>";
pageContent += "       </div>";
pageContent += "     </div>";
    
pageContent += "   </form>";

$("#page-content").html(pageContent);
changePageTitle("Change Password");
 
    
$(document).on('submit', '#changePasswordForm', function(){
var form_data=JSON.stringify($(this).serializeObject());
console.log(form_data);
$.ajax({
    url: "http://shingarplastic.com/api/user/changePassword.php",
    type : "POST",
    contentType : 'application/json',
    data : form_data,
    success : function(result) {
        console.log("Hell yea!!")
    },
    error: function(xhr, resp, text) {
        console.log(xhr, resp, text);
    }
});
 
return false;

});
});