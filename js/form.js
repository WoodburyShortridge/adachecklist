
function postInfoToGoogle() {
    var time = new Date($.now());
    var role = $('select[name=role]').val();
    var state = $('#state').val();
    var building = $('input[name=building]:checked').val();
    var $completed = $('<p>Thank you for taking the time to complete the survey. Your responses have been recorded.</p>')
    
    if (role === "Other") {
        role += ' (' + $('#role-other').val() + ')';
    }
    
    if (building === "Other") {
        building += ' (' + $('#building-other').val() + ')';
    }
	
    var data = {"entry.1" : time, "entry_2124155314" : role, "entry_108662099" : state, "entry_1435484509": building}
    
    var response = function () {
        $('#formframe').html($completed)
    }
    
    //form-key=1__fwCOM1Fm-L6zvrNGclJEhpLnTEarSk58MtPkWkArg
    
    $.post('https://docs.google.com/forms/d/1__fwCOM1Fm-L6zvrNGclJEhpLnTEarSk58MtPkWkArg/formResponse', data, response()); //End post
	
		var $formFrame = $('#formframe')//adjusting container size on final page
		
		$formFrame.height(30);
		window.scrollTo (0,165)
}
    