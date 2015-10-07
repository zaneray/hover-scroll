(function ($) {
    $.fn.hoverScroll = function (options) {
        var $parent = options.parent,
            $arrowRight = $parent.children('.arrow-next'),
            $arrowLeft = $parent.children('.arrow-previous'),
            $container = $(this),
            productThumbWidth = $container.children().children().width(),
            childCount = $container.children().children().length,
            parentWidth = $parent.width(),
            scrollWidth = (childCount * productThumbWidth),
            scrollXWidth    = productThumbWidth * 7;

        // Set countainer inner width based on size of thumbnails and how many there are.
        $container.children().css('width', scrollWidth);
        // sets CSS class hide scroll bar if scroll bars not needed for touch and non-touch interfaces
        if (scrollWidth <= parentWidth) {
            $parent.addClass('no-scroller'); // Needs CSS set up to support this
        }

        // Simple hover scrolling effect for non-touch interfaces, relys on modernzr no-touch
        if ($('html').hasClass('no-touch')) {
            $arrowRight.hover(
                function () {
                    continuousScroll($container, "right", "linear", 4);

                },
                function () {
                    stopScroll($container);
                }
            );
            $arrowLeft.hover(
                function () {
                    continuousScroll($container, "left", "linear", 4);
                },
                function () {
                    stopScroll($container);
                }
            );

            $arrowRight.on('click', function(){
              var $scrollPosition = $container.scrollLeft(),
                  scrollLeft      = $scrollPosition + scrollXWidth;

              stopScroll($container);
              $container.animate({ scrollLeft: scrollLeft });
              
            });
            
            $arrowLeft.on('click', function(){
              var $scrollPosition = $container.scrollLeft(),
                  scrollRight      = $scrollPosition - scrollXWidth;

              stopScroll($container);
              $container.animate({ scrollLeft: scrollRight });
              
            });
        }
    }

    function continuousScroll($container, $direction, $easing, $speed) {
        var $elementWidth = $container.children().width(),
            $elementCount = $container.children().length,
            $fullScrollLength = $elementWidth * $elementCount,
            $scrollPosition = $container.scrollLeft();

        if ($direction == "right") {
            var $scrollDistance = $fullScrollLength - $scrollPosition,
                $scrollSpeed = $speed * $scrollDistance;
            $container.animate({ scrollLeft: $scrollPosition + $scrollDistance }, $scrollSpeed, $easing);
        }
        else {
            var $scrollDistance = $scrollPosition,
                $scrollSpeed = $speed * $scrollDistance;
            $container.animate({ scrollLeft: 0 }, $scrollSpeed, $easing);
        }
    }

    function stopScroll($container) {
        $container.stop();
    }
})(jQuery);
