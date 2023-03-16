<?php

use app\common\middleware\AllowOriginMiddleware;
use app\common\middleware\CheckSiteOpenMiddleware;
use app\common\middleware\InstallMiddleware;
use app\common\middleware\UserTokenMiddleware;
use app\common\middleware\VisitProductMiddleware;
use think\facade\Route;

//积分同步接口
Route::group('api/p2p/', function () {
    //无需登录
    Route::group(function () {
        //获取AccessToken
        Route::get('getAccessToken', 'Merchant/getAccessToken');
        //同步信息
        Route::post('synchronous', 'Merchant/integralSynchronous');
        //用户积分列表(临时放置)
        //Route::get('userScore', 'UserScore/userScore');
        //积分商品
        Route::get('scoreProduct','StoreScoreProduct/scoreProduct');
        //首页积分商品
        Route::get('homeScoreProduct','StoreScoreProduct/homeScoreProduct');
        //首页分类商品
        Route::get('categoryProduct','CategoryProduct/lst');
        //测试添加用户积分记录
        //Route::get('testAddScoreLog','Merchant/testAddScoreLog');
    });
    //前台需登录
    Route::group(function () {
        //用户积分列表
        Route::get('userScore', 'UserScore/userScore');
        //兑换明细
        Route::get('order','StoreScoreProductOrder/order');
        //兑换明细详情
        Route::get('detail/:order_id','StoreScoreProductOrder/scoreOrderDetail');
        //平台积分规则
        Route::get('scoreArticle','Article/scoreArticle');
        //用户兑换积分
        Route::post('exchange','Merchant/exchangeScore');
    })->middleware(UserTokenMiddleware::class, true);
})->prefix('p2p.api.')->middleware(AllowOriginMiddleware::class);


