/**
 * Created by Administrator on 2017/11/21 0021.
 */

$(function () {

    showhide();
    subMenu();
    search();
    shareIcon();
    address();
    addTab();
    miniCart();
    proInfo();
    icon();
    movePic();

    //  1.目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
    function showhide() {
        $('[name = show_hide]').on('mouseenter',function () {
            var $id = $(this).attr('id');
            var tarId = '#' + $id + '_items';
            $(tarId).show();
        }).on('mouseleave',function () {
            var $id = $(this).attr('id');
            var tarId = '#' + $id + '_items';
            $(tarId).hide();
        })

    }

    //  2. 鼠标移动切换二级导航菜单的切换显示和隐藏

    function subMenu() {
        $('.cate_item').on('mouseenter',function () {
            var $div = $(this).children('div');
            $div.show()
        }).on('mouseleave',function () {
            var $div = $(this).children('div');
            $div.hide();
        })
    }

    //  3. 输入搜索关键字, 列表显示匹配的结果
    //当元素获得焦点时，触发 focus 事件。
    //当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上。
    //当元素失去焦点时触发 blur 事件。
    
    function search() {
        $('#txtSearch').on('focus keyup',function () {
            // 检测输入的内容是否全部为空格
            var $searchContent = $(this).val().trim();
            if($searchContent){
                $('#search_helper').show();
            }
        }).on('blur',function () {
            $('#search_helper').hide();
        })
    }

    //  4. 点击显示或者隐藏更多的分享图标
    var flag = false;
    function shareIcon() {
        $('#shareMore').on('click', function () {
            if (flag) {
                $('#dd').width(155);
                $('.share_kaixin').hide();
                $('.share_douban').hide();
                $('#shareMore').children('b').removeClass('backword');
                flag = false;
            } else {
                $('#dd').width(200);
                $('.share_kaixin').show();
                $('.share_douban').show();
                $('#shareMore').children('b').addClass('backword');
                flag = true;
            }
        })

    }

    //   5鼠标移入移出切换地址的显示隐藏
    function address() {
        $('#store_select').on('mouseenter',function () {
            $('#store_content').show();
            $('#store_close').show();
            $('#store_close').on('click',function () {
                $('#store_content').hide();
                $('#store_close').hide()
            })
        }).on('mouseleave',function () {
            $('#store_content').hide();
            $('#store_close').hide();
        })
    }

    // 6.点击切换地址tab
    function addTab() {
        var $li = $('#store_tabs > li');
        var preindex = 0;
            $li.on('click',function () {
                var index = $(this).index();
                $li[preindex].removeAttribute('class');
                $li[index].setAttribute('class','hover');
                preindex = index;
        })
    }


    // 7. 鼠标移入移出切换显示迷你购物车
    function miniCart() {
        $('#minicart').on('mouseenter',function () {
            $('#minicart').addClass('minicart');
            $('#minicart').children('div').show();
        }).on('mouseleave',function () {
            $('#minicart').removeClass('minicart');
            $('#minicart').children('div').hide();
        })
    }

    // 8. 点击切换产品选项 (商品详情等显示出来)

    function proInfo() {
        var preindex = 0;
        $('#product_detail >.main_tabs > li').on('click',function () {
            var index = $(this).index();
            $('#product_detail >.main_tabs > li').eq(preindex).removeClass('current');
            $('#product_detail >.main_tabs > li').eq(index).addClass('current');
            $('#product_detail').children('div:not(#minicart)').eq(preindex).hide();
            $('#product_detail').children('div:not(#minicart)').eq(index).show();
            preindex = index;
        })
    }

    // 9 划过小图标显示大图标

    function icon() {
        var preIndex = 0;
        $('#icon_list > li').on('mouseenter',function () {
            var index = $(this).index();
            var $sSrc = $(this).children('img').attr('src');
            var $mSrc = $sSrc.replace('.jpg','-m.jpg');
            $('#icon_list > li').eq(preIndex).children('img').removeClass('hoveredThumb');
            $('#icon_list > li').eq(index).children('img').addClass('hoveredThumb');
            $('#mediumImg').attr('src',$mSrc);
            preIndex = index;
        })
    }

    // 10. 点击向右/左, 移动当前展示商品的小图片



























})
