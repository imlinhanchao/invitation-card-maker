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
        images: [{
            content: './res/tp1.jpg',
            size: {
                width: 600,
                height: 0
            },
            coord: {
                x: 0,
                y: 0
            },
            background: null,
            variable: false,
            resize: true
        }],
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
                variable: true
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
                variable: false
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
                variable: false
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
                align: 'center',
                variable: false
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
                align: 'center',
                variable: false
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
                variable: true
            }
        ],
        variables: [
            [ '魏华', '19:00' ]
        ]
    },
    {
        size: 600,
        images: [
            {
                content: "./res/tp2.jpg",
                size: {
                    width: 0,
                    height: 0
                },
                coord: {
                    x: 0,
                    y: 0
                },
                background: null,
                variable: false,
                resize: true
            }
        ],
        texts: [
            {
                content: "{0} ",
                font: "Ma Shan Zheng",
                size: "60",
                coord: {
                    x: "360",
                    y: "921"
                },
                color: "#223053",
                align: "center",
                variable: true
            },
            {
                content: "李国强",
                font: "Ma Shan Zheng",
                size: "45",
                coord: {
                    x: "316",
                    y: "800"
                },
                color: "#223053",
                align: "right",
                variable: false
            },
            {
                content: "韩梅梅",
                font: "Ma Shan Zheng",
                size: "45",
                coord: {
                    x: "405",
                    y: "800"
                },
                color: "#223053",
                align: "left",
                variable: false
            },
            {
                content: "扫码查看位置与登记来访",
                font: "Noto Sans SC",
                size: 15,
                coord: {
                    x: "360",
                    y: "1231"
                },
                color: "#867160",
                align: "center",
                variable: false
            },
            {
                content: "2022年5月3号 12:00",
                font: "Noto Sans SC",
                size: "30",
                coord: {
                    x: "360",
                    y: "1072"
                },
                color: "#202f52",
                align: "center"
            },
            {
                content: "黄金大酒店 9 楼贵宾厅",
                font: "Noto Sans SC",
                size: "30",
                coord: {
                    x: "360",
                    y: "1032"
                },
                color: "#202f52",
                align: "center",
                variable: false
            },
            {
                content: "&",
                font: "PT Serif Caption",
                size: "50",
                coord: {
                    x: "339",
                    y: "798"
                },
                color: "#223053",
                align: "left",
                variable: false
            }
        ],
        qrCodes: [
            {
                content: "http://marry.example.com/?n={0}&t={1}",
                color: {
                    foreground: "#202f52",
                    background: "#f7f2ec"
                },
                size: "100",
                coord: {
                    x: "310",
                    y: "1103"
                },
                variable: true
            }
        ],
        variables: [
            [ '魏华', '19:00' ]
        ]
    }
];

window.onload = function() {
    app.refresh();
}