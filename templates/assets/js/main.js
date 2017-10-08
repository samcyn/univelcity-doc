var app = {
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
    }
}