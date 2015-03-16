

$(function(){

	$(".rate").keyup(function(){
		var new_rate = parseFloat( $(this).val()-1 );
		$(".rate_compare").val( ( new_rate < 1.75 ? 1.75 : new_rate ) );
	});

	$(".calculator").accrue({
		mode: "compare",
		response_output_div: ".result-amount",
        response_compare: "%savings%",
		operation: "button",
		error_text: "$0",
		callback: function( elem, data ){
			if ( data.loan_1 === 0 ) {
				// they didn't enter one of the fields
			} else {

				// close the tool, show the results
				$(".tool").slideUp( "slow" );
				$(".results").slideDown( "slow" );
				
				// send savings amount to analytics as a goal completion
				ga('send', 'event', 'button', 'click', 'calculate', Math.ceil( data.loan_2.total_payments - data.loan_2.total_interest ) );

				// scroll to the top of the results div on calculate
				$("body, html").animate({ 
					scrollTop: $( ".tool" ).offset().top 
				}, 1000);

			}
		}
	});

	// reverse the show/hide if they click the back button
	$(".go-back").click(function(){
		$(".results").slideUp( "slow" );
		$(".tool").slideDown( "slow" );
	});

});

