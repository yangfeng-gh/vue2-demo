'use strict'

/*
 * validators.js v1.0.0
 * Author: yvan
 * Date: 2017-09-20
 */

const REGEXP_RULE = {
	//  email:/^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	// 匹配email
	email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	// 匹配url
	url: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i,
	// 日期格式验证1990-06-06，1990/06/06
	dateISO: /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/,
	// 各种数字串，123.000,00，123，-123，-123,000.00
	number: /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/,
	// 纯数字
	digits: /^\d+$/,
	// 匹配ipv4
	ip: /^(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)\.(25[0-5]|2[0-4]\d|[01]?\d\d?)$/i,
	// 匹配手机号码，可能往后第二位还会变化，简单的方法就是不验证第二位：/^1[0-9]{10}$/
	mobile: /^1[3|4|5|7|8][0-9]{9}$/,
	// 匹配国内电话号码,/^[0][1-9]{2,3}-[0-9]{5,10}$/
	telephone: /^(0\d{2}-\d{8}(-\d{1,4})?)$|^(0\d{3}-\d{7,8}(-\d{1,4})?)$/,
	// 匹配中文
	zhstr: /^[u4e00-u9fa5]$/,
	// 匹配首位空格，可以用来删除行首行尾的空白字符(包括空格、制表符、换页符等等)
	spacestr: /^s*|s*$/,
	// 匹配帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)
	accountstr: /^[a-zA-Z][a-zA-Z0-9_]{4,15}$/,
	// 匹配中国邮政编码
	postcard: /^[1-9]\d{5}$/,
	// 匹配身份证：d{15}|d{18}
	identitycode: /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
	// 时间，24小时制
	time: /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/,
	// 时间，十二小时制
	time12h: /^((0?[1-9]|1[012])(:[0-5]\d){1,2}(\?[AP]M))$/i,
	// 验证用户名
	username: /^[a-z0-9_\-\u4e00-\u9fa5]{3,15}$/i,
	// 验证密码
	passwd: /^[\x21-\x7E]{8,20}$/i,
	// 中英文字符数字
	zhennumstr: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
	// 中英文字符数字,/、*
	zhennumstr1: /^[\u4e00-\u9fa5_a-zA-Z]+$/,
	//0~20个字，中文、英文、数字、“-”、“（”、“）”
	mainname: /^[\u4e00-\u9fa5_a-zA-Z0-9\-\(\)]{0,20}$/,
	//0~200个字，中文、英文、数字、特殊字符(特殊字符不包括“|”和“&”)；
	defaulttext: /^[^\|\&]{0,200}$/,
	//0~200个字，中文、英文、数字、特殊字符(特殊字符不包括“|”和“&”)；
	mulidefaulttext: /^[^\|\&]{0,500}$/,
	//默认值每行不能大于20个字，默认值不能超过50行；默认值不能包含字符“|”和“&”
	optionstext: /^\s*([^\|\&\r\n]{1,20}[\r\n]+){0,49}[^\|\&\r\n]{1,20}\s*$/,
	//0~20个字
	searchkey: /^.{0,20}$/,
	// 正整数
	realnum: /^[0-9]+$/,
	// seotitle {title}不得多于30个中文字符，允许为空
	seotitle: /^首页 \- \{[\u4e00-\u9fa5_a-zA-Z0-9]{0,23}\}$/,
	// seokeywords {keywords}每个关键字不得超过6个中文字符，关键字个数不得超过5个，允许为空。
	seokeywords: /^(\{[\u4e00-\u9fa5_a-zA-Z0-9]{0,6}\},){1,4}(\{[\u4e00-\u9fa5_a-zA-Z0-9]{0,6}\})?$/,
	// seodescription {description}不得多于152个中文字符，允许为空。
	seodescription: /^\{[\u4e00-\u9fa5_a-zA-Z0-9]{0,152}\}$/,
	// 保留小数点两位
	floatvalid: /^[0-9]{1,10}([.]\d{1,2})?$/
}

const seotitle = text => {
	return REGEXP_RULE.seotitle.test(text)
}
const seokeywords = text => {
	return REGEXP_RULE.seokeywords.test(text)
}
const seodescription = text => {
	return REGEXP_RULE.seodescription.test(text)
}
const floatvalid = text => {
	return REGEXP_RULE.floatvalid.test(text)
}

const realnum = text => {
	return REGEXP_RULE.realnum.test(text)
}

const searchkey = text => {
	return REGEXP_RULE.searchkey.test(text)
}
const mainname = text => {
	return REGEXP_RULE.mainname.test(text)
}
const defaulttext = text => {
	return REGEXP_RULE.defaulttext.test(text)
}
const mulidefaulttext = text => {
	return REGEXP_RULE.mulidefaulttext.test(text)
}
const optionstext = text => {
	return REGEXP_RULE.optionstext.test(text)
}

/**
 * email验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const email = text => {
	return REGEXP_RULE.email.test(text)
}

/**
 * url验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const url = text => {
	return REGEXP_RULE.url.test(text)
}

/**
 * dateISO验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const dateISO = text => {
	return REGEXP_RULE.dateISO.test(text)
}

/**
 * 数字验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const number = text => {
	return REGEXP_RULE.number.test(text)
}

/**
 * 纯数字验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const digits = text => {
	return REGEXP_RULE.digits.test(text)
}

/**
 * ipv4验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const ip = text => {
	return REGEXP_RULE.ip.test(text)
}

/**
 * 手机号码验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const mobile = text => {
	return REGEXP_RULE.mobile.test(text)
}

/**
 * 座机号码验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const telephone = text => {
	return REGEXP_RULE.telephone.test(text)
}

/**
 * 中文验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const zhstr = text => {
	return REGEXP_RULE.zhstr.test(text)
}

/**
 * 首位空格验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const spacestr = text => {
	return REGEXP_RULE.spacestr.test(text)
}

/**
 * 帐号是否合法(字母开头，允许5-16字节，允许字母数字下划线)验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const accountstr = text => {
	return REGEXP_RULE.accountstr.test(text)
}

/**
 * 6位邮政编码验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const postcard = text => {
	return REGEXP_RULE.postcard.test(text)
}

/**
 * 身份证验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const identitycode = text => {
	return REGEXP_RULE.identitycode.test(text)
}

/**
 * time验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const time = text => {
	return REGEXP_RULE.time.test(text)
}

/**
 * time12h验证器
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const time12h = text => {
	return REGEXP_RULE.time12h.test(text)
}

/**
 * 输入的字符串是否能转成合法的日期
 * @param {String} text   需要验证的字符串
 * @return {Boolean} 验证结果
 * @public
 */
const datestr = text => {
	return !/Invalid|NaN/.test(new Date(text).toString())
}

const passwd = text => {
	return REGEXP_RULE.passwd.test(text)
}
const username = text => {
	return REGEXP_RULE.username.test(text)
}

const isEmpty = text => {
	if(text == null || text === '' || text.trim() === '') {
		return true
	}
	return false
}

const zhennumStr = text => {
	return REGEXP_RULE.zhennumstr.test(text)
}

const zhennumStr1 = text => {
	return REGEXP_RULE.zhennumstr1.test(text)
}

export {
	REGEXP_RULE,
	email,
	url,
	dateISO,
	number,
	digits,
	ip,
	mobile,
	telephone,
	zhstr,
	spacestr,
	accountstr,
	postcard,
	identitycode,
	time,
	time12h,
	datestr,
	username,
	passwd,
	isEmpty,
	zhennumStr,
	zhennumStr1,
	mainname,
	defaulttext,
	mulidefaulttext,
	optionstext,
	searchkey,
	realnum,
	seotitle,
	seokeywords,
	seodescription,
	floatvalid
}

export default REGEXP_RULE
