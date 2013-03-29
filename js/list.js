/***************************************************
 *
 *
 * List.js Section. 
 *
 *
 ****************************************************/

/** 
 * The code below will initialize a new list.
 * A list has 1) list_name: title of the list (created from the input)
 *            2) notes_num: # of notes in the list
 *            3) notes: notes in the list 
 * @param list_name
 * @return a list Object
 */

function init_list( list_name ) {
	var list = new Object();

	list.list_name = list_name;
	list.notes_num = 0;
	list.notes = new Object();

	return list;
}

/**
 * The code below will save a new created list to the Local Storage.
 * Automatically clear the input space in the end.
 */

function save_list() {

	/* Get the input here. */
	var list_name = $( "#input" ).val();
	var list = init_list( list_name );

	/* Check if the list already exists first. */
	if ( list_name === "" ) {

		/* If so, just reset the input area and do nothing. */
		$( "#input" ).val( "" ); 

	} else if ( add_list_to_LS(list) ) { 

		/* A new list is added. */
		alert( "TODO-List with name \"" + list_name + "\" has been successfully saved!" );
		make_notes_list( list_name, 0 );

		/* Reset the input area afterwards. */
		$( "#input" ).val( "" ); 

	} else { 

		/* A list already exists. */ 
		alert( "TODO-List with name \"" + list_name + "\" already exists!" );
		
		/* Reset the input area afterwards. */
		$( "#input" ).val( "" ); 

	} 	
}


/**
 * The code below will remove an existed list frome the Local Storage.
 */

function delete_list( list_name ) {
	remove_list_from_LS( list_name );
}

/** 
 * The code below will display the prepended lists in the specific style with the slideDown effect.
 * @param list_name: the title of the list 
 * @param notes_num: # of notes in the list
 */

function make_notes_list( list_name, notes_num ) {
	$( "#ull" ).prepend( "<li class=\"list no_shown\">" + 
		"<span class = \"list_symbol\">" + 
		"<img type = \"image'\" src = \"images/notepad.png\" alt = \"Submit button\"/></span>" + 
		"<span id=\"click_to_note\" class=\"list_name\" onclick=\"click_to_note( this )\">" + list_name + "</span>" + 
		"<span class=\"list_length\">" + notes_num + "</span>" + 
		"<span class=\"list_delete tooltips\"><span>Click here to Delete a List!</span>" +
		"<img id=\"del\" src=\"images/delete.png\"/>" + 
		"</span></li>" );

	$( "#ull > li.no_shown" ).slideDown( 500 );
}

/** 
 * The code below will make it possible to navigate to the note page when clicking the list's name on 
 * both the websites of desktop and mobile device.  
 * @param name: the list_name clicked by the user 
 */

function click_to_note( name ) {
	curr_list = name.innerHTML;

	/* Make list_name at the top of the notes page. */
	$( "#note_list_name" ).text( curr_list );
	var list = JSON.parse( localStorage[ curr_list ] );
	var notes = list.notes;
	$( "#ull3 > li.note" ).remove();
	for( contents in notes ) {
	 	var note = notes[ contents ];
	 	make_note( note );
	}

	$( "#inner_list" ).fadeOut( 500 );

}

/* The variable below is a global variable of the current list. */
curr_list = "";

$( document ).ready( function() {

	/* First display all existed lists when refreshing the page or starting a new one. */
	list_All_Items();

	/* The function below will enable the "green button" to add a new list. */
	$( "#submit" ).live( "click", function() {
	    save_list();
	});

	/* The function below will enable the "red button" to remove an existing list. */
	$( "#del" ).live( "click", function() {

		var list_name = $( this ).closest( "li" ).children( ".list_name" ).text();

		/* Use fadeOut effect when removing the list. */
		$( this ).closest( "li" ).fadeOut( 500, function() {
			$( this ).closest( "li" ).remove();
		});

  		delete_list( list_name );

	});

	/* The function below will empty the input. */
	$( "#empty" ).live( "click", function() {

		var txt = $( "#input" ).val();
		if ( txt ) {

			/* Reset the input area afterwards. */
			$( "#input" ).val( "" ); 
		}
  		
	});

	

	/**
	 * We can't use function .live() here since the mobile device doesn't support the function
	 * when we click the new added list to navigate to the note page.
	 *
	 * $("#click_to_note").live("click", function() {
	 *		curr_list = this.innerHTML;
	 *		$( "#note_list_name" ).text( curr_list );
	 *		var list = JSON.parse( localStorage[ curr_list ] );
	 *		var notes = list.notes;
	 *		$( "#ull3 > li.note" ).remove();
	 *		for( contents in notes ) {
	 *			var note = notes[ contents ];
	 *			make_note( note );
	 *		}
	 *		$( "#inner_list" ).fadeOut( 500 );
	 *	}); 
	 */

});


/***************************************************
 *
 *
 * Note.js Section
 *
 *
 ****************************************************/

/** 
 * The code below will initialize a new note.
 * A list has 1) content: content of the note (created from input_note)
 *            2) deadline: deadline of the note, in the form of MM/DD/YYYY
 *            3) done: boolean value, shows whether the note is done or not
 * @param list_name
 * @return a note Object
 */

function init_note() {
	var note = new Object();

	note.contents = $( "#input_note" ).val();
	note.deadline = $( "#input_note_deadline" ).val();
	note.done = false;

	return note;
}


/**
 * The code below will save a new created note to the Local Storage.
 * Automatically clear the input space in the end.
 */

function save_note() {
	if ($( "#input_note" ).val() === "" ) {
		return;
	} 
	var note = init_note();
	var list_item = JSON.parse( localStorage[ curr_list ] );

	/** 
	 * If there already exists a note that has the same content under the list, we replace the 
	 * original note with the new one.
	 */
	if ( typeof( list_item.notes[ note.contents ] ) !== "undefined" ) {

		$( "#ull3 > li.note" ).each( function() {

			if ( $( this ).children( ".contents" ).text() === note.contents ) {
				$( this ).remove();
				alert( "The note " + note.contents + " has been updated!" );
			}	

		});
		list_item.notes[ note.contents ] = note;

		/* No need to add the # of notes here. The # of notes in the list should stay the same. */
	 	localStorage[ curr_list ] = JSON.stringify( list_item );
	 	var lists = JSON.parse( localStorage.lists );
	 	localStorage.lists = JSON.stringify( lists );
	 	make_note( note );

	} else {

		list_item.notes[ note.contents ] = note;
		alert( "The note " + note.contents + " has been added!" );

		/* Need to add the # of notes here. */
	 	list_item.notes_num++;
	 	localStorage[ curr_list ] = JSON.stringify( list_item );
	 	var lists = JSON.parse( localStorage.lists );

	 	/* Also update the # of notes here. */
	 	lists[ curr_list ]++;
	 	localStorage.lists = JSON.stringify( lists );
	 	make_note( note );	

	}
	
}

/**
 * The code below will remove an existed note from the Local Storage when clicking on the "red button".
 */

function delete_note( note_name ) {
	var list_item = JSON.parse( localStorage[ curr_list ] );
	delete list_item.notes[ note_name ];

	/* Update the # of notes in the list. */
	list_item.notes_num--;
	localStorage[ curr_list ] = JSON.stringify( list_item );

	/* Also remove with the notes_list. */
	var lists = JSON.parse( localStorage.lists );
	lists[ curr_list ]--;
	localStorage.lists = JSON.stringify( lists );
}

/**
 * The code below will remove all notes from the Local Storage when clicking on the "red button".
 */

function delete_done_notes() {
	var list_item = JSON.parse( localStorage[ curr_list ] );
	for( contents in list_item.notes ) {
		var note = list_item.notes[ contents ];
		if ( note.done === true ) {
			delete_note( note.contents );
		}
	}

	/* Do the "for-loop" here and use the checkbox image to check whether the note is Done/Undone. */
	$( "#ull3 > li.note" ).each( function() {
		if ( $( this ).children( "span.check_box" ).children().attr( "src" ) === "images/checked.png" ) {
			
			/* Use fadeOut effect to remove the note item. */
			$( this ).fadeOut( 500, function() {
				$( this ).remove();
			});

		}
			
	});
}

/** 
 * The code below will display the prepended notes in the specific style with the slideDown effect.
 * @param note: the title/contents of the note 
 */

function make_note( note ) {
	var img;
	if ( note.done === true ) {
		img = "images/checked.png";
	} else {
		img = "images/unchecked.png";
	}
		
	$( "#ull3" ).prepend( "<li class=\"note no_shown\">" + 
		"<span class=\"check_box\">" + 
		"<img id=\"note_check\" src=\"" + img + "\"/></span>" + 
		"<span class=\"contents\">" + note.contents + "</span>" + 
		"<span class=\"deadline\">" + note.deadline + "</span>" + 
		"<span class=\"note_delete tooltips\">" + "<span>Click here to Delete the Note!</span>" + 
		"<img id=\"note_del\" src=\"images/delete.png\"/>" + 
		"</span></li>" );

	$( "#ull3 > li.no_shown" ).slideDown( 500 );
}



$( document ).ready( function() {

	/* The function below will enable the "green button" to add a new note item. */	
	$( "#submit_note" ).live( "click", function() {

		/* First check the validation of the deadline entered. */
		if ( checkDate() === true ) {
			save_note(); 

			/* Reset both inputs. */
		    $( "#input_note" ).val( "" );
		    $( "#input_note_deadline" ).val( "" );

		    /* Automatically go back to top after adding the new note. */
		    $( "#back_to_list" )[0].scrollIntoView( true );

		} else {
			alert( "Please enter a future valid date! Or use the calendar on the right.");
			
			/* Reset the deadline inputs. */
		    $( "#input_note_deadline" ).val( "" );
		}
		
	    
	});

	/* The function below will enable the "red button" to remove an existing note item. */
	$( "#note_del" ).live( "click", function() {

		/* Find the note item to delete. */
		var note_name = $( this ).closest( "li" ).children( ".contents" ).text();

		/* Use fadeOut effect to remove the note item. */
		$( this ).closest( "li" ).fadeOut( 500, function() {
			$( this ).closest( "li" ).remove();
		});
  		
  		delete_note( note_name );

	});

	/* The function below will empty the input. */
	$( "#empty_note" ).live( "click", function() {
		var txt = $( "#input_note" ).val();
		if ( txt ) {

			/* Reset the input area. */
			$( "#input_note" ).val( "" ); 
		}
  		
	});

	/* The function below will check whether the list item is marked as done or not. */
	$( "#note_check" ).live( "click", function() {
		var note_name = $( this ).closest( "li" ).children( ".contents" ).text();
		var list_item = JSON.parse( localStorage[ curr_list ] );
		var note = list_item.notes[ note_name ];

		/* Clicking changes Mark to Unmark; Unmark to Mark. */
		if ( note.done === false ) {
			note.done = true;
			$( this ).closest( "li" ).children( "span.check_box" ).children().attr( "src", "images/checked.png" );
			
			/* $( this ).closest( "li" ).children( ".check_box" ).prepend( "<img id=\"note_check\"" src=\"images/checked.png\"/>" ); This line doesn't work here. */
		} else {
			note.done = false;
			$( this ).closest( "li" ).children( "span.check_box" ).children().attr( "src", "images/unchecked.png" );
			
			/* $( this ).closest( "li" ).children( ".check_box" ).prepend( "<img id=\"note_check\" src=\"images/unchecked_opt.png\"/>" ); This line doesn't work here. */
		}

		list_item.notes[ note_name ] = note;
		localStorage[ curr_list ] = JSON.stringify( list_item );

	});

	/* The function below will go back to the main list page when you click the "green arrow" button. */
	$( "#back_to_list" ).live( "click", function() {
		$( "#ull > li.list" ).remove();
		list_All_Items();
		$( "#inner_list" ).fadeIn( 500 );
	});

	/* The function below will set a calendar that is aside of the deadline input box. */
	$( "#input_note_deadline" ).datepicker( {

		minDate: 1,
		onSelect: function( theDate ) {
        	$("#dataEnd").datepicker( 'option', 'minDate', new Date( theDate ) );
    	},
	    showOn: "button",
	    buttonImage: "images/calendar.gif",
	    buttonImageOnly: true,
	 	dateFormat: "mm/dd/yy",

    });

	
	/** 
	 * IGNORE THIS METHOD BELOW. IT DOESN'T WORK WELL IN SAFARI OR MOBILE DEVICES.
	 *
	 * $( "#delete_all_done" ).live( "click", function() {
	 *		delete_done_notes();
	 *	}); 
	 */


	/** 
	 * The code below will change the sorting method according to the 
	 * choice of the drowdown table and will call the four sorting functions 
	 * to sort the list correspondingly.
	 * As a result, we will make notes sorted as the sorting method we 
	 * choose. 
	 * Additionally, there is a slideUp/Down effect when sorting the list.
	 */

	$( "#dropdown_select" ).change( function() {
		var val = $( this ).val();
		if ( val === "asc_alphabetic" ) {
			
			/* Sort list alphabetically in ascending order. */
			$( "#ull3 > li.note" ).slideUp( 500, function() {

				$( "#ull3 > li.note" ).sort( sort_method_asc_alphabetic ).prependTo( "#ull3" );
				$( "#ull3 > li.note" ).slideDown( 500 );

			});
			
		} else if ( val === "desc_alphabetic" ) {
			
			/* Sort list alphabetically in descending order. */
			$( "#ull3 > li.note" ).slideUp( 500, function() {

				$( "#ull3 > li.note" ).sort( sort_method_desc_alphabetic ).prependTo( "#ull3" );
				$( "#ull3 > li.note" ).slideDown( 500 );

			});

		} else if ( val === "asc_deadline" ) {
			
			/* Sort list by deadline in ascending order (urgent note first). */
			$( "#ull3 > li.note" ).slideUp( 500, function() {

				$( "#ull3 > li.note" ).sort( sort_method_asc_deadline ).prependTo( "#ull3" );
				$( "#ull3 > li.note" ).slideDown( 500 );

			});

		} else if (val === "desc_deadline" ) {
		
			/* Sort list by deadline in descending order (urgent note last/no-deadline items first). */
			$( "#ull3 > li.note" ).slideUp( 500, function() {

				$( "#ull3 > li.note" ).sort( sort_method_desc_deadline ).prependTo( "#ull3" );
				$( "#ull3 > li.note" ).slideDown( 500 );

			});

		} else {

			/* Do nothing here. */ 
			val = "";
		}
	});

	/* alert( Date.parse( "today" ) - Date.parse( "02/10/2013" ) ); returns 86400000 milliseconds (24 hours). */

});	

/**
 * The function below calls isValidDate function and return a boolean value showing 
 * whether the date entered is in the valid form or not.
 * @return a boolean value: TRUE if the date is valid; FALSE otherwise.
 */

function checkDate() {
	var deadline = $( "#input_note_deadline" ).val();

	/* Notes without deadline are acceptable. */
	if ( deadline === "" ) {
		return true;
	}

	if ( isValidDate( deadline ) === false ) {
		return false;
	} else {
		return true;
	}
}


/**
 * The code below check the validate of the date entered. 
 * Source: 
 * http://stackoverflow.com/questions/276479/javascript-how-to-validate-dates-in-format-mm-dd-yyyy
 * http://www.javascripter.net/faq/convert2.htm#parseInt
 * @param date: the date input in the deadline input box
 * @return a boolean value: TRUE if the date is valid; FALSE otherwise.
 */

function isValidDate( date )
{
	var matches = /^(\d{2})[\-\/\\](\d{2})[\-\/\\](\d{4})$/.exec( date );
    /* var matches = /^(\d{2})[-\/](\d{2})[-\/](\d{4})$/.exec( date ); */
    /* /^(\d{2})[\-\/\\](\d{2})[\-\/\\](\d{4})$/.exec( date ); */
    if ( matches === null ) {
    	 return false;
    }
   
   	var m = matches[1] - 1;
    var d = matches[2];
    var y = matches[3];
    var composedDate = new Date( y, m, d );

    var dint = parseInt( d );
    var mint = parseInt( m );
    var yint = parseInt( y );

    if ( mint < 0 || mint > 11 || dint < 1 || dint > 31 ) {
    	return false;
    }

    if ( ( composedDate.getDate() === dint && composedDate.getMonth() === mint && +
    	composedDate.getFullYear() === yint ) === false ) {

    	/* First check if it obeys the basic rule(28/29/30/31 days for a month). */
    	return false;

    } else {

    	/* Get today's date. */
    	var date = parseInt( Date.parse( "today" ).getDate() );
    	var month = parseInt( Date.parse( "today" ).getMonth() );
    	var year = parseInt( Date.parse( "today" ).getFullYear() );
    
    	/* Then check by comparing to today's date. And only future dates are accepted. */
	    if ( yint < year || ( yint < year && mint < month ) || ( yint < year && mint < month && +
	    	dint < date ) || ( yint === year && m < month ) || ( yint ===  year && +
	    	mint === month && dint < date ) || ( yint ===  year && mint === month && dint === date ) ) {

	    	return false;

	    } else {
	    	return true;
	    }	
    }
   
}

/** 
 * The code below will sort notes alphabetically in ascending order. Next, we can use things like 
 * $( ".list li" ).sort( sort_method_asc_alphabetic ).appendTo( ".list" ).
 *
 * @param first_note: the first note Object 
 * @param second_note: the second note Object
 * @return TRUE if second_note comes earlier than first_note in Alphabet and put second_note before first_note;
		   FALSE otherwise.
*/

function sort_method_asc_alphabetic( first_note, second_note ) {
	return  $( first_note ).children( ".contents" ).text().toLowerCase() <  $( second_note ).children( ".contents" ).text().toLowerCase() ? -1 : 1;
}

/** 
 * The code below will sort notes alphabetically in descending order. Next, we can use things like 
 * $( ".list li" ).sort( sort_method_desc_alphabetic ).appendTo( ".list" ).

 * @param first_note: the first note Object 
 * @param second_note: the second note Object
 * @return TRUE if second_note comes later than first_note in Alphabet and put second_note before first_note;
		FALSE otherwise.
*/

function sort_method_desc_alphabetic( first_note, second_note ) {
	return  $( first_note ).children( ".contents" ).text().toLowerCase() <  $( second_note ).children( ".contents" ).text().toLowerCase() ? 1 : -1;
}

/**
 * The code below will sort notes' deadlines ascendingly. That is, the most urgent note comes first.
 * @param first_note: the first note Object 
 * @param second_note: the second note Object
 */

function sort_method_asc_deadline( first_note, second_note ) {
	if ( $( first_note ).children( ".deadline" ).text() === "" && $( second_note ).children( ".deadline" ).text() === "" ) {
		return 0;
	} else if ( $( first_note ).children( ".deadline" ).text() === "" ) {
		return 1;
	} else if ( $( second_note ).children( ".deadline" ).text() === "" ) {
		return -1;
	} else {
		return Date.parse( $( first_note ).children( ".deadline" ).text() ) - Date.parse( $( second_note ).children( ".deadline" ).text() );
	}

}

/** 
 * The code below will sort notes' deadlines descendingly. That is, the least urgent note/notes without deadlines come first. And the most
 * urgent note comes last.
 * @param first_note: the first note Object 
 * @param second_note: the second note Object
 */

function sort_method_desc_deadline( first_note, second_note ) {
	if ( $( first_note ).children( ".deadline" ).text() === "" && $( second_note ).children( ".deadline" ).text() === "" ) {
		return 0;
	} else if ( $( second_note ).children( ".deadline" ).text() === "" ) {
		return 1;
	} else if ( $( first_note ).children( ".deadline" ).text() === "" ) {
		return -1;
	} else {
		return Date.parse( $( second_note ).children( ".deadline" ).text() ) - Date.parse( $( first_note ).children( ".deadline" ).text() );
	}

}


/***************************************************
 *
 *
 * HTML5 Local Storage helper functions
 *
 *
 ****************************************************/

/** 
 * The code below will test if the browser supports the Local Storage.
 */

function test_support() {  
    if ( localStorage ) {
    	return "Local Storage: Supported";
    } else {
    	return "Local Storage: Unsupported";  
    }  
}  

/** 
 * The code below will add a list to the Local Storage. 
 * @param list: the list Object to be added
 */

function add_list_to_LS( list ) {

	/* First check whether the browser supports Local Storage or not. */
	if ( test_support() === "Local Storage: Unsupported" ) {
		return false;
	}

	var list_name = list.list_name;
	var notes_num = list.notes_num;

	/* Check if the list already exists first. If so, return FALSE. */
	if ( typeof( localStorage[ list_name ] ) !== "undefined" ) {
		return false; 
	}

	localStorage[ list_name ] = JSON.stringify( list );

	/* Also update the change to the notes_list associated with the specific list. */
	update_notes_list( list_name, notes_num ); 

	return true;
}

/** 
 * The code below will remove a list from the Local Storage. 
 * @param list_name: the specific list Object to be added
 */

function remove_list_from_LS( list_name ) {
	delete localStorage[ list_name ];

	/* Also remove with the notes_list. */
	var lists = JSON.parse( localStorage.lists );
	delete lists[ list_name ];
	localStorage.lists = JSON.stringify( lists );
}



/**
 * The code below will list all list items to display when refreshing the page 
 * or opening a new tab.
 */

function list_All_Items() {  
	if ( typeof( localStorage.lists ) === "undefined" ) {
		return;
	}
	var lists = JSON.parse( localStorage.lists );
	var notes_num;

	/* Loop the whole lists to get each list. */
    for ( list_name in lists )  
    {  
     	notes_num = lists[ list_name ];
     	make_notes_list( list_name, notes_num );
    }  
}  



/**
 * The code below will update notes_list in Local Stroage.
 */

function update_notes_list( list_name, notes_num ) {
	var notes_list;

	/* Check if the notes_list does not exist first. If so, initialize it. */
	if ( typeof( localStorage.lists ) === "undefined" ) {
		notes_list = new Object();
	} else {
		notes_list = $.parseJSON( localStorage.lists );
	}

	/* Save key:list_name & value: notes_num pair to Local Storage. */
	notes_list[ list_name ] = notes_num;
	localStorage.lists = JSON.stringify( notes_list );
}

