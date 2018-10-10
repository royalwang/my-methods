function bubbleSort(arr) {
    for (var i = 0; i < arr.length - 1; i++) {
        for (var k = 0; k < arr.length - i - 1; k++) {
            var a = arr[k]; /*单纯赋值*/
            var b = arr[k + 1];
            if (a > b) {
                a = a + b;
                b = a - b;
                a = a - b;
            }
        }
    }
    // for (var i = 0; i < arr.length - 1; i++) {
    //     for (var j = i + 1; j < arr.length; j++) {
    //         //获取第一个值和后一个值比较
    //         var cur = arr[i];
    //         if (cur > arr[j]) {
    //             // 因为需要交换值，所以会把后一个值替换，我们要先保存下来
    //             var index = arr[j];
    //             // 交换值
    //             arr[j] = cur;
    //             arr[i] = index;
    //         }
    //     }
    // }
    return arr;
}