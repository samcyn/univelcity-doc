var app = {
    loaderController: function(){
        setTimeout(function(){
           $('.loader').fadeOut('slow');
        }, 5000);
       
    },
	hoverController: function(){
        $('.card-body').mouseenter(function(e){
            
            $('.immersive').find('.card-body').parents('li').removeClass('active');
            $(this).parents('li').addClass('active');

            var position = $(this).offset();
            var height = $(this).height();
            var width = $(this).width();
            var right = width + position.left + 'px';
            var overlay_height = $('.card__overlay').height() - 1;
            var factor = $(this).parents('li').index() + 1;
            
            var top = (overlay_height * factor) - overlay_height + factor - 1;
            
            $('.card__overlay').stop().animate({
                'right': right,
                'top': top
            });

        });
    },
    sidebarController: function(){
        
        var navbar_initialized = false;

        lbd = {
            misc:{
                navbar_menu_visible: 0
            },
            initRightMenu: function(){  
                if(!navbar_initialized){
                    //clone the navbar
                    var $navbar = $('nav').find('.navbar-collapse').first().clone(true);
                    
                    console.log($navbar);
                    
                    
                    //define an empty list to add items..
                    var ul_content = '';
                    

                    
                    
                
                    //add the content from the regular header to the right menu
                    $navbar.children('ul').each(function(){
                        ul_content +=   $(this).html();  
                    });
                    
                    ul_content = '<aside class="rightSideBar"><ul class="menus">' + ul_content + '</ul></aside>';
                    
                    // $navbar.html(ul_content);
                    
                    $('body').append(ul_content);
                    
                    
                    
                    var $toggle = $('.navbar-toggler');
                    
                    
                    
                    $toggle.click(function (){    
                        if(lbd.misc.navbar_menu_visible == 1) {
                            $('html').removeClass('nav-open'); 
                            lbd.misc.navbar_menu_visible = 0;
                            $('#bodyClick').remove();
                            setTimeout(function(){
                                $toggle.removeClass('toggled');
                            }, 400);
                        
                        } else {
                            setTimeout(function(){
                                $toggle.addClass('toggled');
                            }, 430);
                            
                            var div = '<div id="bodyClick"></div>';
                            $(div).appendTo("body").click(function() {
                                $('html').removeClass('nav-open');
                                lbd.misc.navbar_menu_visible = 0;
                                $('#bodyClick').remove();
                                setTimeout(function(){
                                    $toggle.removeClass('toggled');
                                }, 400);
                            });
                        
                            $('html').addClass('nav-open');
                            lbd.misc.navbar_menu_visible = 1;
                            
                        }
                    });
                    navbar_initialized = true;
                }

            }
        }

        // Init navigation toggle for small screens   
        if($(window).width() <= 991){
            lbd.initRightMenu();   
        }

        // activate collapse right menu when the windows is resized 
        $(window).resize(function(){
            if($(window).width() <= 991){
                lbd.initRightMenu();   
            }
        });

    },
    hoverOnSidebar: function(){
        $(document).on('mouseenter', '.nav-item ', function(e){
            $('.menus').find('li').removeClass('active');
            $(this).addClass('active');
        });
    }

}