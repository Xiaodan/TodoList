var XD = XD || {};

XD = {

    /* People don't open stuff they don't want to. */
    mailto:{}
};


XD.mailto = {
    init: function() {      
        $( 'a.mailto' ).bind( {
            click : function() {
                if ( confirm( "Proceed to your default email application? (eg.Outlook, Mail)" ) ) {
                    window.location = "mailto:zhang349@illinois.edu";
                } 
                return false;                   
            }
        } )
    }
}
      

$( document ).ready( function() {
    XD.mailto.init();
} )  
