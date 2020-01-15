    //サイドメニュー
    $(function() {
        //画面の高さを取得して、変数wHに代入
        //var wH = $(window).height();

        wsize = $(window).height(); //今見えている画面の高さを取得し変数化
        $nav = $('#slide_menu'), $(window).scroll(function() {
            if ($(window).scrollTop() > wsize) {
                $nav.addClass("fixed");
            } else {
                $nav.removeClass("fixed");
            }
        });
    });


    /*machHeight*/
    $(function() {
        $('.skillItem').matchHeight();
    });


    /*フィルターの記述*/
    $(function() {
        var $setFilter = $('#filter'), //見出しdiv
            $setList = $('#filterlist'), //コンテンツdiv
            $setFilterAll = $('.allitem'); //見出しdiv>a.allitem

        var showFade = 1500,
            showShut = 1500,
            hideFade = 1000,
            hideShut = 1000;

        var $setFilterBtn = $setFilter.children('a'),
            $setFilterList = $setList.children('ul').children('li'),
            $filterAllItem = $setFilterAll.attr('class');

        $setFilterBtn.click(function() {
            if (!($(this).hasClass('active'))) {
                var filterClass = $(this).attr('class');
                $setFilterList.each(function() {
                    if ($(this).hasClass(filterClass)) {
                        $(this).css({
                            display: 'block'
                        });
                        $(this).find('*').stop().animate({
                            opacity: '1'
                        }, showFade);
                        $(this).stop().animate({
                            width: '31.33%'
                        }, showShut);
                    } else {
                        $(this).find('*').stop().animate({
                            opacity: '0'
                        }, hideFade);
                        $(this).stop().animate({
                            width: '0'
                        }, hideShut, function() {
                            $(this).css({
                                display: 'none'
                            });
                        });
                    }
                });
                $setFilterBtn.removeClass('active');
                $(this).addClass('active');
            }
        });

        $setFilterAll.click(function() {
            $setFilterList.each(function() {
                $(this).css({
                    display: 'block'
                });
                $(this).find('*').stop().animate({
                    opacity: '1'
                }, showFade);
                $(this).stop().animate({
                    width: '31.33%'
                }, showShut);
            });
        });
        $setFilterAll.click();
    });


    //ハンバーガー
    $(function() {
        // メニュー #menuToggleと ul#panelは同階層
        //#panel-btn=ancher  touchstart=タッチが開始された瞬間に発生
        //#panel-btn-icon=ハンバーガー
        $("#panel-btn").on('click touchstart', function() { //aをクリックした時
            $("#panel").slideToggle(200);
            $("#panel-btn-icon").toggleClass("close");
            return false;
        });
    });
    //aタブをクリックするとslideToggleでulを表示：非表示
    //同時にハンバーガーの三本線も表示：非表示
    $(function() {
        $("#panel li a").click(function() {
            $("#panel").slideToggle(500);
            $("#panel-btn-icon").toggleClass("close");
        });
    });

    $(document).ready(function() {
        /*-----panel-btn-----*/
        $("#panel-btn").click(function() {
            $("#top_panel").slideToggle(200);
            $("#panel-btn-icon").toggleClass("close");
            return false;
        });
        $("#top_panel li a").click(function() {
            $("#top_panel").slideToggle(500);
            $("#panel-btn-icon").toggleClass("close");
            return false;
        });

        $('ul#filter a').click(function() {
            $(this).css('outline', 'none');
            $('ul#filter .current').removeClass('current');
            $(this).parent().addClass('current');

            var filterVal = $(this).attr("rel").toLowerCase().replace(' ', '-');

            if (filterVal == 'all') {
                $('ul#portfolio li.hidden').fadeIn('slow').removeClass('hidden');
            } else {
                $('ul#portfolio li').each(function() {
                    if (!$(this).hasClass(filterVal)) {
                        $(this).fadeOut('normal').addClass('hidden');
                    } else {
                        $(this).fadeIn('slow').removeClass('hidden');
                    }
                });
            }

            return false;
        });
    });




    //ページ内スクロール
    $(function() {
        // スクロールのオフセット値
        var offsetY = -10;
        // スクロールにかかる時間
        var time = 500;

        // ページ内リンクのみを取得
        $('a[href^=#]').click(function() {
            // 移動先となる要素を取得
            var target = $(this.hash);
            if (!target.length) return;
            // 移動先となる値
            var targetY = target.offset().top + offsetY;
            // スクロールアニメーション
            $('html,body').animate({
                scrollTop: targetY
            }, time, 'swing');
            // ハッシュ書き換えとく
            window.history.pushState(null, null, this.hash);
            // デフォルトの処理はキャンセル
            return false;
        });
    });




    // JavaScript Document
    // Utility
    //ここからLesson  filter  isotope
    $(function() {
        var setList = $('.listCover'),
            setItem = $('.listItem'),
            setReplace = $('.selfRep'),
            listBaseWidth = 160,
            thumbOpacity = 0.6,
            expandHeight = 340,
            expandFadeTime = 300,
            expandEasing = 'linear',
            switchFadeTime = 1000,
            switchEasing = 'linear';

        setList.each(function() {
            var targetObj = $(this);

            var findItem = targetObj.find(setItem),
                findElm = targetObj.find(setReplace);

            // リストアイテムクリック
            findItem.click(function() {
                if ($(this).hasClass('active')) {
                    closeExpandActive = targetObj.find('.expandField');
                    closeExpandActive.stop().animate({
                        height: '0',
                        opacity: '0'
                    }, expandFadeTime, expandEasing, function() {
                        closeExpandActive.remove();
                    });
                    findItem.removeClass('active');
                } else {
                    var setExpand = $('.expandField'),
                        findExpand = targetObj.find(setExpand),
                        thisElm = $(this).find(setReplace).html();

                    // 展開ボックス制御
                    if (0 < findExpand.size()) {
                        findExpand.empty().html(thisElm);
                        $(this).after(findExpand).next().append('<span class="btnPrev"></span><span class="btnNext"></span><span class="btnClose"></span>');
                        var setReplaceInner = $('.selfRepInner'),
                            findInner = targetObj.find(setReplaceInner);
                        findInner.css({
                            opacity: '0'
                        }).stop().animate({
                            opacity: '1'
                        }, switchFadeTime, switchEasing);
                    } else {
                        $(this).after('<li class="expandField">' + thisElm + '</li>').next().css({
                            height: '0',
                            opacity: '0'
                        }).stop().animate({
                            height: expandHeight,
                            opacity: '1'
                        }, expandFadeTime, expandEasing).append('<span class="btnPrev"></span><span class="btnNext"></span><span class="btnClose"></span>');
                    }

                    //
                    var thisOffset = $(this).find('img').offset();
                    $('html,body').animate({
                        scrollTop: (thisOffset.top - 10)
                    }, 200, 'linear');

                    // 操作ボタン動作
                    function switchNext() {
                        var setActiveN = targetObj.find('.active');
                        setActiveN.each(function() {
                            var listLenghN = findItem.length,
                                listIndexN = findItem.index(this),
                                listCountN = listIndexN + 1,
                                findItemFirst = findItem.first();

                            if (listLenghN == listCountN) {
                                findItemFirst.click();
                            } else {
                                $(this).next().next().click();
                            }
                        });
                    }

                    function switchPrev() {
                        var setActiveP = targetObj.find('.active');
                        setActiveP.each(function() {
                            var listLenghP = findItem.length,
                                listIndexP = findItem.index(this),
                                listCountP = listIndexP + 1,
                                findItemLast = findItem.last();

                            if (1 == listCountP) {
                                findItemLast.click();
                            } else {
                                $(this).prev().click();
                            }
                        });
                    }

                    function switchHide() {
                        closeExpand = targetObj.find('.expandField');
                        closeExpand.stop().animate({
                            height: '0',
                            opacity: '0'
                        }, expandFadeTime, expandEasing, function() {
                            closeExpand.remove();
                        });
                        findItem.removeClass('active');
                    }

                    $(this).addClass('active').siblings().removeClass('active');

                    var btnPrev = targetObj.find('.btnPrev'),
                        btnNext = targetObj.find('.btnNext'),
                        btnClose = targetObj.find('.btnClose');
                    btnPrev.click(function() {
                        switchPrev();
                    });
                    btnNext.click(function() {
                        switchNext();
                    });
                    btnClose.click(function() {
                        switchHide();
                    });

                }
            });

            // サムネイルロールオーバー
            var agent = navigator.userAgent;
            if (!(agent.search(/iPhone/) != -1 || agent.search(/iPad/) != -1 || agent.search(/iPod/) != -1 || agent.search(/Android/) != -1)) {
                findItem.hover(function() {
                    $(this).stop().animate({
                        opacity: thumbOpacity
                    }, 200);
                }, function() {
                    $(this).stop().animate({
                        opacity: '1'
                    }, 200);
                });
            }

            // リキッド操作
            function listAdjust() {
                var ulWrap = targetObj.width(),
                    ulNum = Math.floor(ulWrap / listBaseWidth),
                    liFixed = Math.floor(ulWrap / ulNum);
                findItem.css({
                    width: (liFixed)
                });
            }
            $(window).resize(function() {
                listAdjust();
            }).resize();
            $(window).load(function() {
                setTimeout(function() {
                    listAdjust();
                }, 200);
            }); // for IE8
        });
    }); //閉じたぐ




    //パネルリンクボタンをクリック時にフィルタリング
    $(document).ready(function() {
        /*-----panel-btn-----*/
        $("#panel-btn").click(function() {
            $("#top_panel").slideToggle(200);
            $("#panel-btn-icon").toggleClass("close");
            return false;
        });
        $("#top_panel li a").click(function() {
            $("#top_panel").slideToggle(500);
            $("#panel-btn-icon").toggleClass("close");
            return false;
        });

        $('ul#filter a').click(function() {
            $(this).css('outline', 'none');
            $('ul#filter .current').removeClass('current');
            $(this).parent().addClass('current');

            //文字列の大文字 toLowerCase 置き換える replace
            var filterVal = $(this).attr("rel").toLowerCase().replace(' ', '-');

            //thisクリックされたものrelを小文字で
            if (filterVal == 'all') {
                $('ul#portfolio li.hidden').fadeIn('slow').removeClass('hidden');
            } else {
                $('ul#portfolio li').each(function() {
                    if (!$(this).hasClass(filterVal)) {
                        $(this).fadeOut('normal').addClass('hidden');
                    } else {
                        $(this).fadeIn('slow').removeClass('hidden');
                    }
                });
            }

            return false;
        });

    });



    //■page topボタン
    $(function() {
        var topBtn = $('#pageTop');
        topBtn.hide();

        //◇ボタンの表示設定
        $(window).scroll(function() {
            if ($(this).scrollTop() > 80) {
                //---- 画面を80pxスクロールしたら、ボタンを表示する
                topBtn.fadeIn();
            } else {
                //---- 画面が80pxより上なら、ボタンを表示しない
                topBtn.fadeOut();
            }
        });

        // ◇ボタンをクリックしたら、スクロールして上に戻る
        topBtn.click(function() {
            $('body,html').animate({
                scrollTop: 0
            }, 500);
            return false;
        });

    });

    //ページトップナビゲーション　
    var $win = $(window);

    $win.on('load resize', function() {
        var windowWidth = window.innerWidth;

        if (windowWidth > 768) {
            $('#pageTop a').css('display', 'none');
        } else {
            $('#pageTop a').css('display', 'block');
        }
    });

    //スマホ時、下スクロールでメニュー非表示、上スクロールで表示
    var menuHight = $("#globalHeader").height(); //50px
    var startPos = 0;

    $(window).scroll(function() {
        var currentPos = $(this).scrollTop();
        if (currentPos > startPos) {
            if ($(window).scrollTop() >= 200) {
                $("#globalHeader").css("top", "-" + menuHight + "px");
            }
        } else {
            $("#globalHeader").css("top", 0 + "px");
        }
        startPos = currentPos;
    });

    //全面画像
  //   $(function() {
  //     $.backstretch("../img/bg03.jpg");
  //     $.backstretch("../img/bg03_mini.png");
  // });
