'use strict';

function printReceipt(inputs) {
  let str = '***<没钱赚商店>收据***'+'\n';
  let count=getCount(inputs);
  inputs.map((item,index) => {
    str +='名称：'+item.name
      +'，数量：'+item.count+item.unit
      +'，单价：'+item.price+'.00(元)，小计：'
      + count[index]+'.00(元)'+'\n';
  });
  str+='----------------------'+'\n';
  str+='总计：'+count[count.length-1]+'.00(元)'+'\n'+'**********************';
  console.log(str);


}
function getCount(inputs) {
  let allCount = inputs.map((item) =>  (item.price*item.count).toFixed(2));
  allCount = allCount.map(Number);
  let sum = allCount.reduce((pre,cur) => pre+cur);
  allCount.push(sum);
  return allCount;
}
