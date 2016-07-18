'use strict';

function printReceipt(inputs){
  let countedItems=buildItems(inputs);
}

function searchSameBarcode(input)
{
  let  allItems=loadAllItems();

  for(let i=0 ; i<allItems.length; i++)
  {
    if(input===allItems[i].barcode){
      return allItems[i];
    }
  }
}

function buildItems(inputs)
{
  let countedItems=[];
  for(let i=0 ; i<inputs.length ; i++)
  {
    let splitedInputs=inputs[i].split('-');
    let count=parseFloat(splitedInputs[1] || 1);
    countedItems=buildSplitedCount(splitedInputs[0],count,countedItems);
  }
  return countedItems;
}

function buildSplitedCount(input,count,countedItems){

  for(let i=0 ; i<countedItems.length ; i++){
    if(input===countedItems[i].item.barcode){
      countedItems[i].count+=count;

      return countedItems;
    }
  }
  let item=searchSameBarcode(input);

  countedItems.push({item:item,count:count});

  return countedItems;
}
