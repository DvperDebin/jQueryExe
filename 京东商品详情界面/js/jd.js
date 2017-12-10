/*
 1. 鼠标移入显示,移出隐藏
    目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
 2. 鼠标移动切换二级导航菜单的切换显示和隐藏
 3. 输入搜索关键字, 列表显示匹配的结果
 4. 点击显示或者隐藏更多的分享图标
 5. 鼠标移入移出切换地址的显示隐藏
 6. 点击切换地址tab

 7. 鼠标移入移出切换显示迷你购物车
 8. 点击切换产品选项 (商品详情等显示出来)
 9. 当鼠标悬停在某个小图上,在上方显示对应的中图
 10. 点击向右/左, 移动当前展示商品的小图片
 11. 当鼠标在中图上移动时, 显示对应大图的附近部分区域
 */

$(function () {
    showHide();
    subMenu();
    search();
    share();
    address();
    minicart();
    products();
    mediumImg();
    movePic();
    showBig();

    function showHide() {
        //  1.目标: 手机京东, 客户服务, 网站导航, 我的京东, 去购物车结算, 全部商品
        // 要给父级li设置事件，因为li还包含div，这样我们鼠标移动到div上也不会触发mouseleave
        $('[name = show_hide]').on('mouseenter', function () {
            var curLiId = $(this).attr('id');  // 读取触发事件li元素的id
            var id = '#' + curLiId + '_items';  // 获取被隐藏的div的id
            $(id).css('display', 'block')
        }).on('mouseleave', function () {
            var curLiId = $(this).attr('id');  // 读取触发事件li元素的id
            var id = '#' + curLiId + '_items';  // 获取被隐藏的div的id
            $(id).css('display', 'none');
        })
    }

    //  2. 鼠标移动切换二级导航菜单的切换显示和隐藏
    function subMenu() {
        // 获得包含二级菜单和一级菜单的div
        $('.cate_item').on('mouseenter', function () {
            //得到当前触发事件的div
            var $curDiv = $(this);
            // 设置这个触发事件div的子元素div的display为block
            $curDiv.children('div').css('display','block')
        }).on('mouseleave', function () {
            // 得到触发事件的div
            var $curDiv = $(this);
            // 设置这个触发事件div的子元素div的display为block
            $curDiv.children('div').css('display','none')
        })

    }

    //  3. 输入搜索关键字, 列表显示匹配的结果
    //当元素获得焦点时，触发 focus 事件。
    //当按钮被松开时，发生 keyup 事件。它发生在当前获得焦点的元素上。
    //当元素失去焦点时触发 blur 事件。

    function search() {
        $('#txtSearch').on('focus keyup',function () {
            // 获取隐藏的search div
            var $search = $('#search_helper');
            // 获取input的val
            var $val = $(this).val(); // 这个$(this) 可以换成$('#txtSearch'),因为当前只有一个输入框
            // 利用trim检测用户输入是否全部为空格
            if ($val.trim()){  // 如果不都是空格
                $search.show();
            }
        }).blur(function () {
            var $search = $('#search_helper');
            $search.hide();

        })
    }


    //  4. 点击显示或者隐藏更多的分享图标
    var flag = false;  // 设置一个开关
    function share() {
        var $arrow = $('#shareMore');
        $arrow.on('click',function () {
            if(flag){
                // 首先宽度要变为200
                $('#dd').css('width',155);
                // 我们发现控制左右arrow的是一个class叫backword
                $arrow.children().removeClass('backword');
                // 设置两个a的display为block
                $arrow.prevAll('a:lt(2)').css('display','none');
                flag = false;
            }else{   // 开关关闭时，就是默认两个分享图标没有出现，这时点击就会展开分享图标
                // 首先宽度要变为200
                $('#dd').css('width',200);
                // 我们发现控制左右arrow的是一个class叫backword
                $arrow.children().addClass('backword');
                // 设置两个a的display为block
                $arrow.prevAll('a:lt(2)').css('display','block');
                flag = true;  // 这时候要更新一下当前状态
            }
                //  最经典的 flag = !flag;  // 就是一直取反
        })
    }


    // 5鼠标移入移出切换地址的显示隐藏
    function address() {
        // 鼠标移入移除的显示/隐藏
        $('#store_select').on('mouseenter',function () {
            var $divs = $('#store_select').children('div:gt(0)');
            $divs.css('display','block');
            //点击叉隐藏
            $('#store_close').on('click',function () {
                $divs.css('display','none')
            })
            // 6.点击切换地址tab
            // 获取li
            var $li = $('#store_tabs > li');
            $li.on('click',function () {
                // 获得当前tab的下标
                var $index = $(this).index();
                // 给所有的li都删除class
                for(var i = 0; i < $li.length; i++){
                    $li[i].removeAttribute('class');
                }
                // 再给选中的li添加class hover
                $li[$index].setAttribute('class','hover');


            })

        }).on('mouseleave',function () {
            var $divs = $('#store_select').children('div:gt(0)');
            $divs.css('display','none');
        })
    }
    // 7. 鼠标移入移出切换显示迷你购物车

    function minicart() {
        $('#minicart').on('mouseenter',function () {
            $('#minicart').addClass('minicart');
            var $tinyDiv = $('#minicart').children('div');
            $tinyDiv.css('display','block');
        }).on('mouseleave',function () {
            $('#minicart').removeClass('minicart');
            var $tinyDiv = $('#minicart').children('div');
            $tinyDiv.css('display','none');
        })
    }

        // 8. 点击切换产品选项 (商品详情等显示出来)
    function products() {

        var $li = $('.main_tabs > li');
        // 设置一个变量记录上一次触发事件的index值，初始为0
        var preindex = 0;
        $li.click(function () {
            $(this).siblings().removeClass('current');
            $(this).addClass('current');
            var index = $(this).index();
            var $divs = $('#product_detail').children('div:gt(0)');
            // 初始的时候，index为0；先删除了 又加上了 所以没有关系
            $divs[preindex].style.display = 'none';
            $divs[index].style.display = 'block';
            // 更细上一次触发事件的index值
            preindex = index;
        })
    }
    
    // 9 划过小图标显示大图标
    function mediumImg() {
        // 给所有的li绑定事件
        $('#icon_list > li').on('mouseenter',function () {
            // 给所有的li下的img一个hoveredThumb class
            $(this).children('img').addClass('hoveredThumb');
            // 获取触发事件小图标的src
            var $srcS = $(this).children('img').attr('src');
            // 利用replace获取触发事件的小图标对应大图标的src
            var $srcM = $srcS.replace('.jpg','-m.jpg');
            // 把这个大图标的src放回去
            $('#mediumImg').attr('src', $srcM);
        }).on('mouseleave',function () {
            $(this).children('img').removeClass('hoveredThumb');
        })
    }

    // 10. 点击向右/左, 移动当前展示商品的小图片
    function movePic() {
        // 获取右边的箭头
        var $rightArrow = $('#preview > h1 > a:last');
        // 获取左边的箭头
        var $leftArrow = $('#preview > h1 > a:first');
        var $ul = $('#icon_list'); // 获取ul,其实就是图片的容器
        var $li = $('#icon_list > li'); //获取li
        var picNum = $li.length;  // li的个数就是图片的张数
        var showPicNum = 5;  // 显示图片的个数
        var invisPicNum = picNum - showPicNum; // 视窗右边被隐藏图片的个数
        var width = 62;  // 点击一次移动的宽度
        var index = 0;  // 视窗左侧被隐藏图片的个数
        // 首先就要判断来开启右侧的按钮
        if(invisPicNum > index){   // 判断右边的图片个数是否大于左边的隐藏个数
            $rightArrow.attr('class','forward');
        }
            
        // 给右边的箭头设置点击事件
        $rightArrow.on('click',function () {
            // 做一个边界判断，利用左边和右边隐藏的图片数量进行比较
            // 如果左边图片隐藏的数量 = 右边图片隐藏的数量，那么这时候就不用执行
            if(index !== invisPicNum){ // 否则就执行
                // 点击成功一次左边增加一张照片
                index = index + 1;
                // 图片移动其实就是容器的left值进行了改变，每点击一张，左边增加62px
                $ul.css('left',-(index * width));
                $leftArrow.attr('class','backward');
                if(index === invisPicNum){
                    $rightArrow.attr('class','forward_disabled');
                }
            }
        })
        $leftArrow.on('click',function () {
            // 上来先做一个判断，判断左边是否还有图片
            if(index != 0){   // 如果不等于0，说明左边还有图片，我们就可以进行操作
                index = index -1; // 向右移动，左边的隐藏图片数量就会减少
                $ul.css('left',-(index * width));
                $rightArrow.attr('class','forward');
                if(index === 0){  // 如果为0，那么就禁用这个按钮
                    $leftArrow.attr('class','backward_disabled');
                }
            }


        })
    }
    
    
        function showBig() {
            // 给透明遮罩设置事件
            $('#maskTop').on('mouseenter',function () {
                // 鼠标跑移入小黄块显示，移出小黄块消失
                $('#mask').show();
                // 鼠标滑过大图视窗显示
                $('#largeImgContainer').show();
                // 鼠标滑过大图显示
                $('#largeImg').show();
                //  // 这里要注意鼠标移动的的时候，小黄块也在动，所以还要一个mousemove事件
                $('#maskTop').on('mousemove',function () {
                    // 得到鼠标当前在触发事件元素上的位置
                    var $eve = event || window.event;
                    var left = $eve.offsetX;
                    var top = $eve.offsetY;
                    // 鼠标在黄块的左上角，但是实际应该是在黄块中间
                    var width = $('#mask').width();
                    var height = $('#mask').height();
                    // 利用left - 1/2 width 和 top - 1/2 height来重新定位鼠标的位置
                    left = left - width/2;
                    top = top - height/2;
                    // 得到遮罩的高度和宽度
                    var Width = $('#maskTop').width();
                    var Height = $('#maskTop').height();
                    // 得到小黄块的left和top的最大值
                    var maxLeft = Width - width;
                    var maxTop = Height - height;
                    //进行边界判断
                    if(left < 0){
                        left = 0
                    }else if( left > maxLeft){
                        left = maxLeft;
                    }
                    if(top < 0){
                        top = 0;
                    }else if(top > maxTop){
                        top = maxTop;
                    }
                    // 通过设置小黄块的left top 移动小黄块
                    $('#mask').css({
                        top : top,
                        left: left
                    })
                    // 最后做出放大镜效果效果
                    // 获取中图的src和大图的src
                    var $srcM = $('#mediumImg').attr('src');
                    var $srcL = $srcM.replace('m.jpg','l.jpg');
                    $('#largeImg').attr('src',$srcL);
                    // 注意大图视窗的宽高 是大图宽高的1/2
                    $('#largeImgContainer').css({
                        width :  $('#largeImg').width()/2,
                        height :  $('#largeImg').height()/2
                    })
                    // 根据比例 通过改变大图的left和top来变动
                    var lImgLeft = -($('#largeImgContainer').width()/Width) * left;
                    var lImgTop = -($('#largeImgContainer').height()/Height) * top;
                    $('#largeImg').css({
                        left: lImgLeft,
                        top : lImgTop
                    })

                })
            }).on('mouseleave',function () {
                $('#mask').hide();
                $('#largeImgContainer').hide();
            })
        }

})