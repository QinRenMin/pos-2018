'use strict';
let allItems = loadAllItems();
let freeItem = loadPromotions();
function printReceipt(inputs) {

  inputs = inputs.map((item) => item.split('-')); //拆分成二维数组
  let newItems=getNumber(inputs,allItems);
// console.log(newItems);
//判断按照优惠后，应该计算的items;并且计算出相应的价格和优惠了多少
  let finalItems = getFinal(freeItem,newItems);
  let str =
    '***<没钱赚商店>收据***'+'\n'
    +outPut(finalItems)
    +'----------------------'+'\n'
    +'总计：'+getSum(finalItems)
    +'.00(元)'+'\n'
    +'节省：'+getFree(finalItems)+'(元)'+'\n'
    +'**********************';
  console.log(str);

}

function getNumber(inputs,allItems) {
  //添加count属性
  allItems.map((item) => item.count = 0);
  // console.log(inputs);
  //计算inputs中对应所有商品个数
  inputs.map((item) => {
    allItems.map((x) => {
      if(item.length === 1&&item[0] === x.barcode){
        x.count+=1;
      }
      if(item.length === 2&&item[0] === x.barcode){
        x.count+=parseInt(item[1]);
      }
    })
  });

  //返回inputs中有的商品信息
  return allItems.filter((item) => item.count!==0);

}
function getFinal(freeItem,newItems){
  allItems.map((item) => item.freePrice = 0);
  allItems.map((item) => item.sumPrice = 0);
  newItems.map((item) => {
    freeItem[0].barcodes.map((x) => {
      if(item.barcode === x && item.count > 2) {

        let freeCount = item.count-1;
        item.freePrice =  item.price;
        item.sumPrice = freeCount*item.price;
      }
    })
  });
  newItems.map((item) => {if(item.sumPrice === 0){item.sumPrice = item.price*item.count}})
  newItems.map((item) => {

    item.sumPrice = item.sumPrice.toString().split(".");

    if(item.sumPrice.length === 1){
      item.sumPrice=item.sumPrice.toString()+".00";
    }else {item.sumPrice=item.sumPrice.toString()+"0";}
  });

  newItems.map((item) => {

    item.price = item.price.toString().split(".");

    if(item.price.length === 1){
      item.price=item.price.toString()+".00";
    }else {item.price=item.price.join('.')+"0";}
  });
  // console.log(newItems);
  return newItems;
}
function getSum(finalItems) {
  let sum = 0;

  finalItems.map((item) => sum+=parseFloat(item.sumPrice));
  return sum;
}
function getFree(finalItems) {
  let sum = 0;
  finalItems.map((item) => sum+=item.freePrice);
  sum = sum.toString().split('.');
  if(sum.length=== 1){
    sum=sum.toString()+".00";
  }else {sum=sum.join('.')+"0";}
  return sum;
}
function outPut(finalItems) {
  let str = '';
  finalItems.map((item) => {
    str +='名称：'+item.name
      +'，数量：'+item.count+item.unit
      +'，单价：'+item.price+'(元)，小计：'
      + item.sumPrice+'(元)'+'\n';
  });
  return str;
}

function  buildItems (input) {
  let temp =[];
  input = input.map((item) => item.split('-')); //拆分成二维数组
  let end = getNumber(input,allItems);
  end.map((x) => {
    let t ={
      item:{
        barcode:'',
        name:'',
        unit:'',
        price:''
      },
      count:0
    };
    t.item.barcode=x.barcode;
    t.item.name = x.name;
    t.item.unit=x.unit;
    t.item.price = x.price;
    t.count = x.count;
    temp.push(t);
  });

  return temp;

}
