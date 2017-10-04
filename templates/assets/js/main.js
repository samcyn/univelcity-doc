var app = {
	navbarHandler: function(){
		var top = $('.blue_box').offset().top - parseFloat($('.blue_box').css('margin-top').replace(/auto/, 0));
		$(window).scroll(function (event) {
		    // what the y position of the scroll is
		    var y = $(this).scrollTop();

		    // toggle between these two.
		    if (y >= top) {
		      // if so, add the fixed class
		      $('.blue_box').addClass('stuck');
		    } else {
		      // otherwise remove it
		      $('.blue_box').removeClass('stuck');
		    }
		});
	},
	customSelect: function(){
        if($('.selectpicker')){
          $('.selectpicker').select2({
                placeholder: "Select a state"
          });
        }
        else{return;}
	},
	calendarHandler: function(){
        var $modal = $('#event-modal');
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var calendar = $('#calendar').fullCalendar({
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '19:00:00',          
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: [{
                title: 'Bring Files!',
                start: new Date(y, m, 2),
                className: 'bg-purple'
            }, {
                title: 'See John',
                start: '2017-07-25 10:00:00',
                start: '2017-07-26 11:00:00',
                className: 'bg-red'
            }],
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function (date, allDay) { // this function is called when something is dropped
                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');
                var $categoryClass = $(this).attr('data-class');
                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);
                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;
                if ($categoryClass)
                    copiedEventObject['className'] = [$categoryClass];
                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },

            selectable: true,
            eventClick: function (calEvent, jsEvent, view) {
                var form = $("<form></form>");
                form.append("<label>Change event name</label>");
                form.append("<div class='md-form'><input class='input-alternate form-control' type='text' value='" + calEvent.title + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success'><i class='fa fa-check'></i> Save</button></span></div>");
                $modal.modal({
                    backdrop: 'static'
                });
                $modal.find('.delete-event').show().end().find('.save-event').hide().end().find('.modal-body').empty().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                    calendar.fullCalendar('removeEvents', function (ev) {
                        return (ev._id == calEvent._id);
                    });
                    $modal.modal('hide');
                });
                $modal.find('form').on('submit', function () {
                    calEvent.title = form.find("input[type=text]").val();
                    calendar.fullCalendar('updateEvent', calEvent);
                    $modal.modal('hide');
                    return false;
                });
            },
            select: function (start, end, allDay) {
                $modal.modal({
                    backdrop: 'static'
                });
                form = $("<form></form>");
                form.append("<div class='row'></div>");
                form.find(".row").append("<div class='col-md-6'><label class='control-label'>Event Name</label><div class='md-form'><input class='input-alternate form-control' placeholder='Insert Event Name' type='text' name='title'/></div></div>").append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category'></select></div></div>").find("select[name='category']").append("<option value='bg-red'>Work</option>")
                    .append("<option value='bg-green'>Sport</option>").append("<option value='bg-purple'>Meeting</option>").append("<option value='bg-blue'>Lunch</option>").append("<option value='bg-yellow'>Children</option>");
                $modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
                    form.submit();
                });
                $modal.find('form').on('submit', function () {
                    title = form.find("input[name='title']").val();
                    $categoryClass = form.find("select[name='category'] option:checked").val();
                    if (title !== null && title.length != 0) {
                        calendar.fullCalendar('renderEvent', {
                            title: title,
                            start: start,
                            end: end,
                            allDay: false,
                            className: $categoryClass
                        }, true);  
                    }
                    else{
                        alert('You have to give a title to your event');
                    }
                    $modal.modal('hide');
                    return false;
                });
                calendar.fullCalendar('unselect');
            }

        });
    },
	scheduleHandler: function(){
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();
	
		var calendar = $('#calendar').fullCalendar({
			eventColor: '#FECB3F',
			eventTextColor: '#FFFFFF',
			editable: true,
		    header: {
		    	left: 'prev,next today',
		    	center: 'title',
		    	right: 'month,agendaWeek,agendaDay'
		    },
			events: [
		        {
		            title  : 'forLoop',
		            start  : '2017-07-01'
		        },
		        {
		            title  : '.Net',
		            start  : '2017-07-05',
		            end    : '2017-07-07'
		        },
		        {
		            title  : 'event3',
		            start  : '2017-05-09T12:30:00',
		            allDay : false 
		        }
		    ],
		    //editable: true,
		    //droppable: true,
		    // eventClick: function(calEvent, jsEvent, view) {

		    //     alert('Event: ' + calEvent.title);
		    //     //$(this).css('border-color', 'red');
			// 	//window.location = (calEvent.title).toLowerCase() + '.html';
			// 	window.location = 'meet_up.html'
		    // },
			loading: function(isloading, view){
				console.log(isloading);
			},
			eventRender: function(event, element, view) {
				if (event.allDay === 'true') {
					event.allDay = true;
				} else {
					event.allDay = false;
				}
			},
			selectable: true,
			selectHelper: true,
			select: function(start, end, allDay) {
				var title = prompt('Event Title:');

				if (title) {
					var start = $.fullCalendar.formatDate(start, "Y-MM-DD HH:mm:ss");
					var end = $.fullCalendar.formatDate(end, "Y-MM-DD HH:mm:ss");
					$.ajax({
						url: 'add_events.php',
						data: 'title='+ title+'&start='+ start +'&end='+ end,
						type: "POST",
						success: function(json) {
						    alert('Added Successfully');
						}
					});
					calendar.fullCalendar('renderEvent',
					{
						title: title,
						start: start,
						end: end,
						allDay: allDay
					},
					true
					);
				}
				calendar.fullCalendar('unselect');
			},

			editable: true,
			eventDrop: function(event, delta) {
				var start = $.fullCalendar.formatDate(event.start, "Y-MM-DD HH:mm:ss");
				var end = $.fullCalendar.formatDate(event.end, "Y-MM-DD HH:mm:ss");
				$.ajax({
					url: 'update_events.php',
					data: 'title='+ event.title+'&start='+ start +'&end='+ end +'&id='+ event.id ,
					type: "POST",
					success: function(json) {
						alert("Updated Successfully");
					}
				});
			},
			eventClick: function(event) {
				var decision = confirm("Do you really want to do that?"); 
				if (decision) {
					$('#calendar').fullCalendar('removeEvents', event.title);
					// $.ajax({
					// 	type: "POST",
					// 	url: "delete_event.php",
					// 	data: "&id=" + event.id,
					// 	success: function(json) {
					// 		$('#calendar').fullCalendar('removeEvents', event.id);
					// 		alert("Updated Successfully");
					// 	}
					// });
				}
			},
			eventResize: function(event) {
				var start = $.fullCalendar.formatDate(event.start, "yyyy-MM-dd HH:mm:ss");
				var end = $.fullCalendar.formatDate(event.end, "yyyy-MM-dd HH:mm:ss");
				$.ajax({
					url: 'update_events.php',
					data: 'title='+ event.title+'&start='+ start +'&end='+ end +'&id='+ event.id ,
					type: "POST",
					success: function(json) {
					alert("Updated Successfully");
					}
				});
			}

    	});

	},
	calendarHandler2: function(){
        var $modal = $('#myContent');
        /*  Initialize the calendar  */
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        var form = '';
        var calendar = $('#calendar').fullCalendar({
            slotDuration: '00:15:00', /* If we want to split day time each 15minutes */
            minTime: '08:00:00',
            maxTime: '19:00:00', 
            loading: function(isloading, view){
				console.log(isloading);
			},         
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            events: [{
                title: 'Bring Files!',
                start: new Date(y, m, 2),
                className: 'bg-purple'
            }, {
                title: 'See John',
                start: '2017-07-25 10:00:00',
                start: '2017-07-26 11:00:00',
                className: 'bg-red'
            }],
            editable: true,
            selectable: true,
            eventClick: function (calEvent, jsEvent, view) {
                // var self = $(this);
				
                // var form = $("<form></form>");
                // form.append("<label>Change event name</label>");
                // form.append("<div class='md-form'><input class='input-alternate form-control' type='text' value='" + calEvent.title + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success'><i class='fa fa-check'></i> Save</button></span></div>");
                
                // // $modal.find('.form').remove().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                // //     calendar.fullCalendar('removeEvents', function (ev) {
                // //         return (ev._id == calEvent._id);
                // //     });
                // //     $modal.modal('hide');
                // // });
                // $modal.find('form').remove().end().prepend(form)
                
                // $modal.find("form").on('submit', function (e) {
                //     e.preventDefault();
                //     calEvent.title = form.find("input[type=text]").val();
                //     calendar.fullCalendar('updateEvent', calEvent);
                //     //$modal.modal('hide');
                    
                //     return false;
                // });
               
				// self.webuiPopover({
                //     url:'#myContent',
                //     dismissible:true,
                //     cache: false,
                //     // arrow:true,
                // });
				
            },
            // select: function (start, end, allDay) {
                
            //     var self = $(this);
            //     console.log(self);

            //     form = $("<form></form>");
            //     form.append("<div class='row'></div>");
            //     form.find(".row").append("<div class='col-md-6'><label class='control-label'>Event Name</label><div class='md-form'><input class='input-alternate form-control' placeholder='Insert Event Name' type='text' name='title'/></div></div>").append("<div class='col-md-6'><div class='form-group'><label class='control-label'>Category</label><select class='form-control' name='category'></select></div></div>").find("select[name='category']").append("<option value='bg-red'>Work</option>")
            //         .append("<option value='bg-green'>Sport</option>").append("<option value='bg-purple'>Meeting</option>").append("<option value='bg-blue'>Lunch</option>").append("<option value='bg-yellow'>Children</option>");
            //     // $modal.find('.delete-event').hide().end().find('.save-event').show().end().find('.modal-body').empty().prepend(form).end().find('.save-event').unbind('click').click(function () {
            //     //     form.submit();
            //     // });
            //     $modal.find('form').remove().end().prepend(form)
            //     $modal.find('form').on('submit', function () {
            //         title = form.find("input[name='title']").val();
            //         $categoryClass = form.find("select[name='category'] option:checked").val();
            //         if (title !== null && title.length != 0) {
            //             calendar.fullCalendar('renderEvent', {
            //                 title: title,
            //                 start: start,
            //                 end: end,
            //                 allDay: false,
            //                 className: $categoryClass
            //             }, true);  
            //         }
            //         else{
            //             alert('You have to give a title to your event');
            //         }
            //         // $modal.modal('hide');
            //         return false;
            //     });
            //     self.webuiPopover({
            //         url:'#myContent',
            //         dismissible:true,
            //         cache: false,
            //         // arrow:true,
            //     });
            //     calendar.fullCalendar('unselect');
            // },
            select: function(date, jsEvent, view) {

                 var self = $(this);
				// console.log(self);
                // var form = $("<form></form>");
                // form.append("<label>Change event name</label>");
                // form.append("<div class='md-form'><input class='input-alternate form-control' type='text' value='" + "" + "' /><span class='input-group-btn'><button type='submit' class='btn btn-success'><i class='fa fa-check'></i> Save</button></span></div>");

                alert('Clicked on: ' + date.format());

                alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

                alert('Current view: ' + view.name);

                // change the day's background color just for fun
                $(this).css('background-color', 'red');
                
                
                // $modal.find('.form').remove().prepend(form).end().find('.delete-event').unbind('click').click(function () {
                //     calendar.fullCalendar('removeEvents', function (ev) {
                //         return (ev._id == calEvent._id);
                //     });
                //     $modal.modal('hide');
                // });
                $modal.find('form').remove().end().prepend(form);
                
                // $modal.find("form").on('submit', function (e) {
                //     e.preventDefault();
                //     calEvent.title = form.find("input[type=text]").val();
                //     calendar.fullCalendar('updateEvent', calEvent);
                //     //$modal.modal('hide');
                    
                //     return false;
                // });
               
				self.webuiPopover({
                    url:'#myContent',
                    dismissible:true,
                    cache: false,
                    // arrow:true,
                });
				

            }

        });
    },
}