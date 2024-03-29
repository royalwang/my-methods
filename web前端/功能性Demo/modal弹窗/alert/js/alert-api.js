$(function(){	
	$('.alert-api-list').css('height',$(window).height());
   	$(window).scroll(function(){

   		if($(window).scrollTop() >= 130){
   			$('.alert-api-list').css({
   				'top' : $(window).scrollTop() - 130
   			})
   		}else{
   			$('.alert-api-list').css({
   				'top' : 0
   			})
   		}
   	})

   	$(document).delegate('.alert_list a','click',function(){
   		$('.alert_list a').removeClass('alert-api-hover');
   		$(this).addClass('alert-api-hover');
   	})

	SyntaxHighlighter.all();

	var M = {

	}

	// 按钮一1
	$(document).delegate(".alert-btn1",'click',function(){
		if(M.dialog1){
			return M.dialog1.show();
		}
		M.dialog1 = jqueryAlert({
			'content' : 'hello 程序员...',
			'closeTime' : 2000,
			'animateType'  : 'linear',
		})
	})
	// 按钮一2
	$(document).delegate(".alert-btn11",'click',function(){
		if(M.dialog11){
			return M.dialog11.show();
		}
		M.dialog11 = jqueryAlert({
			'icon'    : 'img/right.png',
			'content' : $(".alert-api-txt").html(),
			'closeTime' : 2000,
		})
	})
	// 按钮一3
	$(document).delegate(".alert-btn12",'click',function(){
		if(M.dialog12){
			return M.dialog12.show();
		}
		M.dialog12 = jqueryAlert({
			'icon'    : 'img/error.png',
			'content' : 'hello 程序员...',
			'closeTime' : 2000,
		})
	})
	// 按钮一4
	$(document).delegate(".alert-btn13",'click',function(){
		if(M.dialog13){
			return M.dialog13.show();
		}
		M.dialog13 = jqueryAlert({
			'icon'    : 'img/warning.png',
			'content' : 'hello 程序员...',
			'closeTime' : 2000,
		})
	})
	// 按钮二
	$(document).delegate(".alert-btn2",'click',function(){
		if(M.dialog2){
			return M.dialog2.show();
		}
		M.dialog2 = jqueryAlert({
			'content' : 'hello 程 序 员 ...',
			'modal'   : true,
			'buttons' :{
				'确定' : function(){
					M.dialog2.close();
				}
			}
		})
	})
	// 按钮三
	$(document).delegate(".alert-btn3",'click',function(){
		if(M.dialog3){
			return M.dialog3.show();
		}
		M.dialog3 = jqueryAlert({
			'title'   : 'alertjs提示',
			'content' : '欢迎使用alertjs弹层 ...',
			'modal'   : true,
			'buttons' :{
				'确定' : function(){
					M.dialog3.close();
				},
				'我不是' : function(){
					if(M.dialog31){
						return M.dialog31.show();
					}
					M.dialog31 = jqueryAlert({
						'content' : '我不是程序员...'
					})
				}
			}
		})
	})

	// 按钮四
	$(document).delegate(".alert-btn4",'click',function(){
		if(M.dialog4){
			return M.dialog4.show();
		}
		M.dialog4 = jqueryAlert({
			'title'   : 'alertjs提示',
			'content' : '欢迎使用alertjs弹层 ...',
			'modal'   : true,
			'animateType' : '',
			'buttons' :{
				'确定' : function(){
					M.dialog4.close();
				},
				'不使用' : function(){
					if(M.dialog41){
						return M.dialog41.show();
					}
					M.dialog41 = jqueryAlert({
						'content' : '祝您找到更好用的...'
					})
				}
			}
		})
	})

	var alertContent = '<div class="protocol">\
	   <h3 align="center">用户注册协议</h3>\
	   <p>\
	    </p><h4>一、总则</h4>\
	    1.1  保宝网的所有权和运营权归深圳市永兴元科技有限公司所有。 <br>\
	1.2  用户在注册之前，应当仔细阅读本协议，并同意遵守本协议后方可成为注册用户。一旦注册成功，则用户与保宝网之间自动形成协议关系，用户应当受本协议的约束。用户在使用特殊的服务或产品时，应当同意接受相关协议后方能使用。  <br>\
	1.3 本协议则可由保宝网随时更新，用户应当及时关注并同意本站不承担通知义务。本站的通知、公告、声明或其它类似内容是本协议的一部分。  \
	   <p></p>\
	   <p>\
	   </p><h4>二、服务内容</h4>\
	   2.1 保宝网的具体内容由本站根据实际情况提供。 <br>\
	2.2 本站仅提供相关的网络服务，除此之外与相关网络服务有关的设备(如个人电脑、手机、及其他与接入互联网或移动网有关的装置)及所需的费用(如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费)均应由用户自行负担。\
	   <p></p>\
	   <p>\
	    </p><h4>三、用户帐号</h4>\
	    3.1 经本站注册系统完成注册程序并通过身份认证的用户即成为正式用户，可以获得本站规定用户所应享有的一切权限；未经认证仅享有本站规定的部分会员权限。保宝网有权对会员的权限设计进行变更。 <br>\
	3.2 用户只能按照注册要求使用真实姓名，及身份证号注册。用户有义务保证密码和帐号的安全，用户利用该密码和帐号所进行的一切活动引起的任何损失或损害，由用户自行承担全部责任，本站不承担任何责任。如用户发现帐号遭到未授权的使用或发生其他任何安全问题，应立即修改帐号密码并妥善保管，如有必要，请通知本站。因黑客行为或用户的保管疏忽导致帐号非法使用，本站不承担任何责任。 \
	  </div>'

	// 按钮五
	$(document).delegate(".alert-btn5",'click',function(){
		if(M.dialog5){
			return M.dialog5.show();
		}
		M.dialog5 = jqueryAlert({
			'content' : alertContent ,
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : '400px',
			'animateType' : 'linear',
			'buttons' :{
				'不同意' : function(){
					M.dialog5.close();
				},
				'同意' : function(){
					if(M.dialog51){
						return M.dialog51.show();
					}
					M.dialog51 = jqueryAlert({
						'content' : '同意也不能注册哦...'
					})
				}
			}
		})
	})

	// 按钮六
	$(document).delegate(".alert-btn6",'click',function(){
		if(M.dialog6){
			return M.dialog6.show();
		}
		M.dialog6 = jqueryAlert({
			'style'   : 'pc',
			'title'   : '捕获页',
			'content' :  $("#alert-blockquote"),
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : 'auto',
			'animateType' : 'linear',
			'buttons' :{
				'关闭' : function(){
					M.dialog6.close();
				},
			}
		})
	})

	// 按钮七
	$(document).delegate(".alert-btn7",'click',function(){
		if(M.dialog7){
			return M.dialog7.show();
		}
		M.dialog7 = jqueryAlert({
			'style'   : 'pc',
			'title'   : 'iframe层',
			'content' :  alertContent,
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : '300',
			'height'  : '200',
			'animateType' : 'linear',
			'buttons' :{
				'关闭' : function(){
					M.dialog7.close();
				},
			}
		})
	})

	// 按钮八
	$(document).delegate(".alert-btn8",'click',function(){
		if(M.dialog8){
			return M.dialog8.show();
		}
		M.dialog8 = jqueryAlert({
			'style'   : 'pc',
			'title'   : 'iframe窗',
			'content' :  $(".alert-box"),
			'modal'   : true,
			'contentTextAlign' : 'left',
			'width'   : '90%',
			'height'  : '90%',
			'animateType': 'scale',
		})
	})


	// 按钮九
	$(document).delegate(".alert-btn9",'click',function(){
		if(M.dialog9){
			return M.dialog9.show();
		}
		M.dialog9 = jqueryAlert({
			'style'   : 'pc',
			'title'   : 'pc弹层',
			'content' :  'PC端普通弹层呦呦呦...',
			'modal'   : true,
			'contentTextAlign' : 'left',
			'animateType': 'scale',
			'bodyScroll' : 'true',
			'buttons' : {
				'关闭' : function(){
					M.dialog9.close();
				},
				'去首页' : function(){
					location.href="http://fy.035k.com";
				}
			}
		})
	})
})