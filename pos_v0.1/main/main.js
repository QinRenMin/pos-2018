'use strict';

function printReceipt(inputs) {
  let number = getNumber(inputs);
  let count = getCount(inputs,number);
  let str =
    '***<没钱赚商店>收据***'+'\n'
    +outPut(inputs,count,number)
    +'----------------------'+'\n'
    +'总计：'+count[count.length-1]
    +'.00(元)'+'\n'
    +'**********************';
  console.log(str);

}
function getNumber(inputs) {
  let num =[0,0,0];
  inputs.map(item =>{switch (item.barcode) {
    case 'ITEM000000':num[0]++;break;
    case 'ITEM000001':num[1]++;break;
    case 'ITEM000004':num[2]++;break;
  }});

  return num;
}

function getCount(inputs,number) {
  let count =[];
  inputs.map(item =>{switch (item.barcode) {
    case 'ITEM000000':count[0] = number[0]*item.price;break;
    case 'ITEM000001':count[1] = number[1]*item.price;break;
    case 'ITEM000004':count[2] = number[2]*item.price;break;
  }});
  count.push(count.reduce((pre,cur) => pre+cur));
  return count;
}

function outPut(inputs,count,number) {
  let strs = [];
  inputs.map(item =>{switch (item.barcode) {
    case 'ITEM000000':strs[0] = '名称：'+item.name
      +'，数量：'+number[0]+item.unit
      +'，单价：'+item.price+'.00(元)，小计：'
      + count[0]+'.00(元)';break;
    case 'ITEM000001':strs[1] = '名称：'+item.name
      +'，数量：'+number[1]+item.unit
      +'，单价：'+item.price+'.00(元)，小计：'
      + count[1]+'.00(元)';break;
    case 'ITEM000004':strs[2] = '名称：'+item.name
      +'，数量：'+number[2]+item.unit
      +'，单价：'+item.price+'.00(元)，小计：'
      + count[2]+'.00(元)';break;
  }});

  return strs[0]+'\n'+strs[1]+'\n'+strs[2]+'\n';
}
