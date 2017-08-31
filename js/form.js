
function postInfoToGoogle() {
    var time = new Date($.now());
    var role = $('select[name=role]').val();
    var country = $('select[name=country]').val();
    var state = $('select[name=state]').val();
    var building = $('input[name=building]:checked').val();
    var $completed = $('<div class="alert alert-success" role="alert">Thank you for taking the time to complete the survey. Your responses have been recorded.</div>')

  //  if (building === "Other") {
  //      building += ' (' + $('#building-other').val() + ')';
  //  }

    var data = {"entry.1" : time, "entry_2124155314" : role, "entry_1929681175" : country, "entry_1499179338" : state, "entry_1435484509": building}

    var response = function () {
        $('#formframe').html($completed)
    }

    //form-key=1__fwCOM1Fm-L6zvrNGclJEhpLnTEarSk58MtPkWkArg

    $.post('https://docs.google.com/forms/d/1__fwCOM1Fm-L6zvrNGclJEhpLnTEarSk58MtPkWkArg/formResponse', data, response()); //End post

		var $formFrame = $('#formframe')//adjusting container size on final page

		$formFrame.height(30);
		window.scrollTo (0,165)
}

$('select[name=country]').on('change', function() {
  var country = $('select[name=country]').val();
  if (country != 'United States') {
    $('#question3').hide();
  } else {
    $('#question3').show();
  }
})
