'use strict';

function printReceipt(inputs) {
  let allItems = loadAllItems();
  let newItems=getNumber(inputs,allItems);
  let count=getCount(newItems); //价格
  let str =
    '***<没钱赚商店>收据***'+'\n'
    +outPut(newItems,count)
    +'----------------------'+'\n'
    +'总计：'+count[count.length-1]
    +'.00(元)'+'\n'
    +'**********************';
  console.log(str);
}
function getNumber(inputs,allItems) {
  //添加count属性
  allItems.map((item) => item.count = 0);
  //计算inputs中对应所有商品个数
  inputs.map((item) => {
    allItems.map((x) => {
      if(item === x.barcode){
        x.count+=1;
      }
    })
  });
  //返回inputs中有的商品信息
  return allItems.filter((item) => item.count!==0);

}

//计算价格
function getCount(newItems) {
  let allCount = newItems.map((item) =>  (item.price*item.count).toFixed(2));
  allCount = allCount.map(Number);
  let sum = allCount.reduce((pre,cur) => pre+cur);
  allCount.push(sum);
  return allCount;
}
function outPut(newItems,count) {
  let str = '';
  newItems.map((item,index) => {
    str +='名称：'+item.name
      +'，数量：'+item.count+item.unit
      +'，单价：'+item.price+'.00(元)，小计：'
      + count[index]+'.00(元)'+'\n';
  });
  return str;
}
