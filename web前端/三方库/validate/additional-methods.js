/**
 * 验证是否是手机号
 */
jQuery.validator.addMethod("phone", function(value, element) {
	//验证是否手机号
	var b = /^1[3|4|5|7|8]\d{9}$/.test(value);
	
    return this.optional(element) || b;
}, "请输入手机号");

/**
 * 验证是否是手机号或电子邮箱
 */
jQuery.validator.addMethod("phoneEmail", function(value, element) {
	//验证是否手机号
	var b = /^1[3|4|5|7|8]\d{9}$/.test(value);
	b = b || /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
	
    return this.optional(element) || b;
}, "请输入手机号或邮箱");