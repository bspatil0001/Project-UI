$(document).ready(function(){
                     $(window).bind('scroll', function() {
                     var navHeight = 200;
                           if ($(window).scrollTop() > navHeight) {
                              $('.navbar').addClass('navbar-back');
                              $('#myNavbar > ul > li > a').addClass('navbar-back-font');
                              $('.navbar-header').css('padding','0');
                              $('#myNavbar').css('padding','0');
                           }
                           else{
                               $('.navbar').removeClass('navbar-back');
                               $('#myNavbar > ul > li > a').removeClass('navbar-back-font');
                               $('.navbar-header').css('padding','18px 15px 15px');
                               $('#myNavbar').css('padding','18px 15px 15px');
                           }
                      });

                      $(".nav li a").bind('click',function(){
                              $(".nav li a").removeClass("menu_active");
                              $(this).addClass("menu_active");
                      });

                      $('.menu_load li a').click(function(){
                        var content=$(this).text();
                        content="."+content;
                        $(".our_work_img_container img").hide();
                        $(content).show();
                        if(content==".all"){
                          $(".our_work_img_container img").show();
                        }
                      });

                      var sections = $('section'),

                          nav = $('.main_menu'),
                          nav_height = nav.outerHeight();

                      $(document).on('scroll', function () {
                        var cur_pos = $(this).scrollTop();

                        sections.each(function() {
                          var top = $(this).offset().top - nav_height,
                              bottom = top + $(this).outerHeight();

                          if (cur_pos >= top && cur_pos <= bottom) {
                            nav.find('a').removeClass('menu_active');
                            sections.removeClass('menu_active');

                            nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('menu_active');
                          }
                        });
                      });

                      $(".service_menu_tabs a").click(function(){
                        $(".service_menu_tabs a").removeClass("service_menu_active");
                        $(this).addClass("service_menu_active");
                        console.log("hi");
                      });

                      $(".our_work_menu_tabs ul li").click(function(){
                        $(".our_work_menu_tabs ul li").removeClass("our_work_menu_active");
                        $(this).addClass("our_work_menu_active");
                      });

                      $('.why_us_click li').click(function(){
                        $('.why_us_click li').removeClass('active');
                        $('.why_us_info').hide();
                        $('.why_us_label').children('span').show()
                        //.children('span').show();
                        $(this).addClass('active');
                        $(this).children('.why_us_label').children('span').hide();
                        $(this).children('.why_us_info').show();
                      });
                      $('.why_us_info').hide();
                      $('.why_us_1').show();
                      var previous = $('.why_us_1').prev();
                      previous.children('span').hide();
                    });
