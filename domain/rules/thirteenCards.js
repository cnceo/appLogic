/*
* 单例模式
* 十三张的规则
* */
var consts = require('../../consts/consts'),
    dataApi = require('../../util/dataApi'),
    _ = require('underscore');

//数组相减，arr1中重复的不会被剪掉，不然直接使用_.without方法就可以了。
function arraysubtract(arr1,arr2){
    for (var i = arr1.length - 1; i >= 0; i--) {
        a = arr1[i];
        for (var j = arr2.length - 1; j >= 0; j--) {
            b = arr2[j];
            if (a == b) {
                arr1.splice(i, 1);
                arr2.splice(j, 1);
                break;
            }
        }
    }
    return arr1;
}

//判断给出点数的牌是否为顺子  points是三张牌的点数数组
function isShunzi_3(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [3];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        return true;
    }
    else{
        return false;
    }
}

//判断给出点数的牌是否为顺子  points是五张牌的点数数组
function isShunzi_5(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        return true;
    }
    else{
        return false;
    }
}

//判断给出点数的牌是否为顺子  points是八张牌的点数数组
function isShunzi_8(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [3,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));
        var uniqArray1 = _.uniq(orderArray1,true);
        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            return true;
        }
    }
    order = [5,3];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));
        var uniqArray1 = _.uniq(orderArray1,true);
        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            return true;
        }
    }

    return false;
}


//判断给出点数的牌是否为顺子  points是十张牌的点数数组
function isShunzi_10(points) {
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray, true);

    var order = [5,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1) {
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));
        var uniqArray1 = _.uniq(orderArray1,true);
        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            return true;
        }
    }

    return false;
}

//判断给出点数的牌是否为三顺子  points是十三张牌的点数数组
function isSanshunzi(points){
    var orderArray = _.sortBy(points);
    var uniqArray = _.uniq(orderArray,true);

    var order = [3,5,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1){//前三个是顺子
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));//剩下的10个
        var uniqArray1 = _.uniq(orderArray1,true);

        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            orderArray1 = arraysubtract(orderArray1,_.first(uniqArray1,order[1]));//剩下的5个
            if(orderArray1[order[2] - 1] - orderArray1[0] == order[2] - 1){
                return true;
            }
        }
    }

    order = [5,3,5];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1){//前五个是顺子
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));//剩下的8个
        var uniqArray1 = _.uniq(orderArray1,true);

        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            orderArray1 = arraysubtract(orderArray1,_.first(uniqArray1,order[1]));//剩下的5个
            if(orderArray1[order[2] - 1] - orderArray1[0] == order[2] - 1){
                return true;
            }
        }
    }

    order = [5,5,3];
    if (uniqArray[order[0] - 1] - uniqArray[0] == order[0] - 1){//前五个是顺子
        var orderArray1 = arraysubtract(orderArray.slice(0),_.first(uniqArray,order[0]));//剩下的8个
        var uniqArray1 = _.uniq(orderArray1,true);

        if(uniqArray1[order[1] - 1] - uniqArray1[0] == order[1] - 1){
            orderArray1 = arraysubtract(orderArray1,_.first(uniqArray1,order[1]));//剩下的3个
            if(orderArray1[order[2] - 1] - orderArray1[0] == order[2] - 1){
                return true;
            }
        }
    }

    return false;

   /* 这是心路历程，有问题，但是保留
   if(uniqArray.length < 5){//小于5，则不可能找到5个的顺子了。
        return false;
    }
    else {
        if (uniqArray[4] - uniqArray[0] == 4) {//第一個是是个五顺子
            var orderArray = arraysubtract(orderArray,_.first(uniqArray,5));//_.without(orderArray,uniqArray[0],uniqArray[1],uniqArray[2],uniqArray[3],uniqArray[4]);//剩下的8个
            var uniqArray = _.uniq(orderArray,true);

            if(uniqArray.length < 5) {
                return false;
            }
            else{
                if (uniqArray[4] - uniqArray[0] == 4) {//第二个是五顺子
                    var orderArray = arraysubtract(orderArray,_.first(uniqArray,5));//剩下的3个
                    if(orderArray[2] - orderArray[0] == 2){//是顺子
                        return true;//553
                    }
                    else{
                        return false;
                    }
                }
                else if (uniqArray[2] - uniqArray[0] == 2) {//是个三顺子
                    var orderArray = arraysubtract(orderArray,_.first(uniqArray,3));//剩下的5个
                    if(orderArray[4] - orderArray[0] == 4){//是顺子
                        return true;//535
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
        }
        else if(uniqArray[2] - uniqArray[0] == 2){//第一个是个三顺子
            var orderArray = arraysubtract(orderArray,_.first(uniqArray,3));//剩下的10个
            var uniqArray = _.uniq(orderArray,true);

            if(uniqArray.length < 5) {
                return false;
            }
            else{
                if (uniqArray[4] - uniqArray[0] == 4) {//第一个是五顺子
                    var orderArray = arraysubtract(orderArray,_.first(uniqArray,5));//剩下的5个
                    if(orderArray[4] - orderArray[0] == 4){//是顺子
                        return true;//355
                    }
                    else{
                        return false;
                    }
                }
                else{
                    return false;
                }
            }
        }
        else{
            return false;
        }
    }*/
}

//判断给出编号的牌是否为三顺子,注意A可以是1，也可以是14
function isSanshunziByPkIds(handCards){
    var points = [];
    var Acount = 0;//尖儿的个数
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5) {
            if (temp.value == 1) {
                Acount = Acount + 1;
            }
            else {
                points.push(temp.value);
            }
        }
    });
    if(Acount == 0){
        return isSanshunzi(points);
    }
    else if(Acount == 1){
        return isSanshunzi(points.slice(0).push(1)) || isSanshunzi(points.slice(0).push(14));
    }
    else if(Acount == 2){
        var temp = points.slice(0);
        temp.push(1);
        temp.push(1);
        var temp1 = points.slice(0);
        temp1.push(1);
        temp1.push(14);
        var temp2 = points.slice(0);
        temp2.push(14);
        temp2.push(14);
        return isSanshunzi(temp) || isSanshunzi(temp1) || isSanshunzi(temp2);
    }
    else if(Acount == 3){
        var temp = points.slice(0);
        temp.push(1);
        temp.push(1);
        temp.push(1);
        var temp1 = points.slice(0);
        temp1.push(1);
        temp1.push(1);
        temp1.push(14);
        var temp2 = points.slice(0);
        temp2.push(1);
        temp2.push(14);
        temp2.push(14);
        var temp3 = points.slice(0);
        temp3.push(14);
        temp3.push(14);
        temp3.push(14);
        return isSanshunzi(temp) || isSanshunzi(temp1) || isSanshunzi(temp2) || isSanshunzi(temp3);
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三同花
function isSantonghuaByPkIds(handCards){
    var types = [0,0,0,0];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            types[temp.cardType - 1] = types[temp.cardType - 1] + 1;
        }
    });
    if(types[0] > 0 && types[1] > 0 && types[2] > 0 && types[3] > 0){//有四种花色，肯定不对
        return false;
    }
    for(var i = 0 ; i < 4 ; i ++){
        if(types[i] > 0){
            if(types[i] != 3 && types[i] != 5 && types[i] != 8 && types[i] != 10 && types[i] != 13) {
                return false;
            }
        }
    }
    return true;
}

//判断给出编号的牌是否为六对半
function isLiuduibanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;

    values.forEach(function(value){
        if(value % 2 == 1){
            singeCount = singeCount + 1;
        }
    });

    if(singeCount == 1){//如果只有一个是单的
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为五对冲三
function isWuduichongsanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;
    var threeCount = 0;

    values.forEach(function(value){
        if(value == 3){
            threeCount = threeCount+ 1;
        }
        else{
            if(value % 2 == 1){
                singeCount = singeCount + 1;
            }
        }
    });

    if(threeCount == 1 && singeCount == 0){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为四套冲三
function isSitaochongsanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;
    var threeCount = 0;

    values.forEach(function(value){
        if(value == 3){
            threeCount = threeCount+ 1;
        }
        if(value == 1){
            singeCount = singeCount+ 1;
        }
    });

    if(threeCount == 4 && singeCount == 1){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为凑一色
function isChouyiseByPkIds(handCards){
    var types = [0,0,0,0];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            types[temp.cardType - 1] = types[temp.cardType - 1] + 1;
        }
    });
    var blackCount = types[0]+types[2];
    var redCount = types[1]+types[3];

    if(blackCount == 13 && redCount == 0 || (blackCount == 0 && redCount == 13)){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为全小
function isQuanxiaoByPkIds(handCards){
    var valuesBig = 0;
    var valuesSmall = 0;
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1 || temp.value >= 8){
                valuesBig = valuesBig + 1;
            }
            if(temp.value >= 2 && temp.value <= 8){
                valuesSmall = valuesSmall + 1;
            }
        }
    });

    if(valuesBig == 0 && valuesSmall == 13){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为全大
function isQuandaByPkIds(handCards){
    var valuesBig = 0;
    var valuesSmall = 0;
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1 || temp.value >= 8){
                valuesBig = valuesBig + 1;
            }
            if(temp.value >= 2 && temp.value <= 8){
                valuesSmall = valuesSmall + 1;
            }
        }
    });

    if(valuesBig == 13 && valuesSmall == 0){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三套炸弹
function isSantaozadanByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });
    var singeCount = 0;
    var fourCount = 0;

    values.forEach(function(value){
        if(value == 4){
            fourCount = fourCount+ 1;
        }
        if(value == 1){
            singeCount = singeCount+ 1;
        }
    });

    if(fourCount == 3 && singeCount == 1){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为三同花顺---没写完
function isSantonghuashunByPkIds(handCards){
    var typePoints = [];
    typePoints.push([]);
    typePoints.push([]);
    typePoints.push([]);
    typePoints.push([]);
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            typePoints[temp.cardType - 1].push(temp.value);
        }
    });

    var typeCount = 0;
    typePoints.forEach(function (typePoint) {
        if(typePoint.length > 0){
            typeCount = typeCount + 1;
        }
    })
    if(typeCount >3){//花色超过三种，肯定不是
        return false;
    }

    var noSanlian = true;
    for(var i = 0; i < typePoints.length ; i ++){
        var thisLength = typePoints[i].length;
        var bAcount = false;//因为是同花，所以A最多一个
        var indexA = -1;
        for(var j = 0 ; j < typePoints[i].length ; j ++){
            if(typePoints[i][j] == 1)
            {
                bAcount = true;
                indexA = j;
                break;
            }
        }
        if(thisLength > 0){
            if(noSanlian && thisLength == 3){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_3(typePoints[i]) || isShunzi_3(pointsClone)){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_3(typePoints[i])){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }

            }
            else if(thisLength == 5){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_5(typePoints[i]) || isShunzi_5(pointsClone)){
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_5(typePoints[i])){
                    }
                    else{
                        return false;
                    }
                }
            }
            else if(noSanlian && thisLength == 8){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_8(typePoints[i]) || isShunzi_8(pointsClone)){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_8(typePoints[i])){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
            }
            else if(thisLength == 10){
                if(bAcount){
                    var pointsClone = typePoints[i].slice(0);
                    pointsClone.splice(indexA,1,14);//将1替换成14
                    if(isShunzi_10(typePoints[i]) || isShunzi_10(pointsClone)){
                    }
                    else{
                        return false;
                    }
                }
                else{
                    if(isShunzi_10(typePoints[i])){
                    }
                    else{
                        return false;
                    }
                }
            }
            else if(noSanlian && thisLength == 13){
                if(bAcount){
                    if(isSanshunzi(typePoints[i])){
                        noSanlian = false;
                    }
                    else{
                        return false;
                    }
                }
                else{//13张都是同一种颜色时，如果没有A，那肯定不是顺子
                    return false;
                }
            }
            else{
                return false;
            }
        }
    }


    return  true;
}

//判断给出编号的牌是否为十二皇族
function isShierhuangzuByPkIds(handCards){
    var huangzuCount = 0;
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            if(temp.value == 1 || temp.value > 10){
                huangzuCount = huangzuCount + 1;
            }
        }
    });

    if(huangzuCount == 13){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为十三水
function isShisanshuiByPkIds(handCards){
    var values = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
        }
    });

    var singleCount = 0;

    values.forEach(function(value){
        if(value == 1){
            singleCount = singleCount+ 1;
        }
    });

    if(singleCount == 13){
        return true;
    }
    else{
        return false;
    }
}

//判断给出编号的牌是否为十三水
function isTonghuashisanshuiByPkIds(handCards){
    var values = [];
    var types = [];
    handCards.forEach(function(pkId){
        var temp = dataApi.PkConfig.findById(pkId);
        if(temp.cardType < 5){
            values[temp.value - 1] = (values[temp.value - 1] || 0) + 1;
            types[temp.cardType - 1] = (types[temp.cardType - 1] || 0) + 1;
        }
    });

    var singleCount = 0;
    var typeCount = 0;

    values.forEach(function(value){
        if(value == 1){
            singleCount = singleCount+ 1;
        }
    });
    types.forEach(function (type) {
        typeCount = typeCount + 1;
    });

    if(singleCount == 13 && typeCount == 1){
        return true;
    }
    else{
        return false;
    }
}

module.exports = {
    singleton: 5,
    isSpecialType: function(specialType,handCards) {
        switch (specialType) {
            case consts.SHISANSHUI_SPECIAL.SANSHUNZI:
                return isSanshunziByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SANTONGHUA:
                return isSantonghuaByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.LIUDUIBAN:
                return isLiuduibanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.WUDUICHONGSAN:
                return isWuduichongsanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SITAOCHONGSAN:
                return isSitaochongsanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.CHOUYISE:
                return isChouyiseByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.QUANXIAO:
                return isQuanxiaoByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.QUANDA:
                return isQuandaByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SANTAOZADAN:
                return isSantaozadanByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SANTONGHUASHUN:
                return isSantonghuashunByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SHIERHUANGZU:
                return isShierhuangzuByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.SHISANSHUI:
                return isShisanshuiByPkIds(handCards);
            case consts.SHISANSHUI_SPECIAL.TONGHUASHISANSHUI:
                return isTonghuashisanshuiByPkIds(handCards);
            default:
                return false;
        }
    }
}