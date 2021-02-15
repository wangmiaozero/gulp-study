/*
 * @Description: demo2--js
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-14 22:36:45
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-14 23:38:27
 */
console.log('demo2--js');
(function(){
    let arr = [11,22,333,44,55,66,77,88,99,1024];

    let newArr = arr.map((item,index)=>{
        return item+10;
    });
    console.log(newArr);
})();