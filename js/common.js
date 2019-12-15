// via: https://blog.csdn.net/a258831020/article/details/46988887
String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
             }
          }
       }
   }
   return result;
};


var configs = [
    {
        size: 600,
        background: '/res/tp1.jpg',
        texts: [
            {
                content: '诚邀 {0} ',
                font: 'Noto Sans SC',
                size: 30,
                coord: {
                    x: 300,
                    y: 681
                },
                color: '#867160',
                align: 'center',
                variable: [
                    [
                        '魏华'
                    ]
                ]
            },
            {
                content: '李国强',
                font: 'Ma Shan Zheng',
                size: 50,
                coord: {
                    x: 270,
                    y: 600
                },
                color: '#000',
                align: 'right',
                variable: null
            },
            {
                content: '韩梅梅',
                font: 'Ma Shan Zheng',
                size: 50,
                coord: {
                    x: 332,
                    y: 600
                },
                color: '#000',
                align: 'left',
                variable: null
            },
            {
                content: '扫码查看位置与登记来访',
                font: 'Noto Sans SC',
                size: 15,
                coord: {
                    x: 300,
                    y: 1000
                },
                color: '#867160',
                align: 'center'
            },
            {
                content: '2022年5月3号 12:00',
                font: 'Noto Sans SC',
                size: 20,
                coord: {
                    x: 300,
                    y: 770
                },
                color: '#f25459',
                align: 'center'
            },
            {
                content: '黄金大酒店 9 楼贵宾厅',
                font: 'Noto Sans SC',
                size: 20,
                coord: {
                    x: 300,
                    y: 800
                },
                color: '#f25459',
                align: 'center'
            }
        ],
        qrCodes: [
            {
                content: 'http://marry.example.com/?n={0}&t={1}',
                color: {
                    foreground: '#000',
                    background: '#fff'
                },
                size: 100,
                coord: {
                    x: 250,
                    y: 870
                },
                variable: [
                    [
                        '魏华',
                        '19:00'
                    ]
                ]
            }
        ]
    }
]