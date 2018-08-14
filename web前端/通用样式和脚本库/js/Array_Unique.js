/**
 * 遍历数组arr，新建一个数组result，判断新数组里面是否存在arr中的元素，如果没有，则用push方法加入到新数组中
 */
function unique(arr) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        if (result.indexOf(arr[i]) == -1) {
            result.push(arr[i]);
        }
    }
    return result;
}


/**
 * [quchong 对象方法]
 * @param  {[type]} list [Array]
 * @return {[type]}      [description]
 */
function quchong(list) {
    var newArr = [];
    var obj = {};
    for (var i = 0; i < list.length; i++) {
        //如果obj对象中没有list中的一个元素，则加入到新数组newArr
        if (!obj[list[i]]) {
            newArr.push(list[i]);
            obj[list[i]] = list[i];
        }
    }
    return newArr;
}


/**
 * [removeRepeatArray 数组去重]
 * @param  {[type]} arr [description]
 * @return {[type]}     [new Set()  Set 中的值总是唯一的]
 */
function removeRepeatArray(arr) {
    return Array.from(new Set(arr));
}

/**
 * [deleteRepeatArray 一行代码实现数组去重]
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function deleteRepeatArray(arr) {
    var newArr = [...new Set(arr)];
    return newArr;
}


/**
 * [unique1 原型方法的数组去重]
 * @return {[type]} [description]
 */
Array.prototype.unique1 = function() {
    var res = [this[0]];
    for (var i = 1; i < this.length; i++) {
        var repeat = false;
        for (var j = 0; j < res.length; j++) {
            if (this[i] == res[j]) {
                repeat = true;
                break;
            }
        }
        if (!repeat) {
            res.push(this[i]);
        }
    }
    return res;
}