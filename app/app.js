$(document).ready(function(){
 
    // app html
    app_html="";
 
    app_html+="<div class='container'>";
 
        app_html+="<div class='page-header'>";
            app_html+="<h3 id='page-title'>Page Title</h3>";
        app_html+="</div>";
 
        // this is where the contents will be shown.
        app_html+="<div id='page-content'></div>";
 
    app_html+="</div>";
 
    $("#app").html(app_html);
 
    app_nav="<p class='text-center'>Loading...<p>";
 
    $("#nav").html(app_nav);
});
 

function changePageTitle(page_title){
 
    // change page title
    $('#page-title').text(page_title);
 
    // change title tag
    document.title=page_title;
}
 
// function to make form values to json format
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};