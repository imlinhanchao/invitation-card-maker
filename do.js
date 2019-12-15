var cvs = document.getElementById('cvs');
var ctx = cvs.getContext('2d');
var radio = 1;

function drawImg(img, call, x=0, y=0, size=400, resize=true){
    var image = new Image;
    image.src = img;
    image.onload = function () {
        radio = size / image.width;
        var width = size; //image.width;
        var height = image.height * radio;
        if (resize) {
            cvs.width = width;
            cvs.height = height;
        }
    
        ctx.drawImage(image, x, y, width, height);
        if (call) call();
    }
}

function drawText(font, text, pixel, x, y, color, align='left') {
    ctx.font = `${pixel}px ${font}`;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    ctx.fillText(text, x * radio, y * radio);
}

function drawQR(content, x, y, size, call) {
    var qrElem = document.createElement('div');

    document.getElementById('qr').innerHTML = '';
    var q = new QRCode(qrElem, {
        text: content,
        width: size,
        height: size,
        colorDark : "red",
        colorLight : "#ffffff",
});
    var image = new Image;
    image.src = qrElem.getElementsByTagName('canvas')[0].toDataURL("image/png");
    q.clear();
    image.onload = function () {
        ctx.drawImage(image, x, y, size, size);
        if(call) call()
    }
}

function drawCard(name, call) {
    var size = 600;
    drawImg('./WechatIMG506.jpg', function () {
        var centerCos = size / 2 / radio;
        drawText('Ma Shan Zheng', '杨永青', 50, 230, 1090, '#000');
        drawText('winmantun250061d4d13a5ad20cd6', '陈诗婷', 50, 600, 1090, '#000');
        drawText('"Noto Sans SC"', `诚邀 ${name} `, 30, 300 / radio, 1250, '#867160', 'center');
        drawText('"Noto Sans SC"', '扫码查看位置与登记来访', 15, centerCos, 1830, '#867160', 'center');
        drawText('"Noto Sans SC"', '2020年1月3号 12:00', 20, centerCos, 1450, '#f25459', 'center');
        drawText('"Noto Sans SC"', '海丰县金华大酒店4楼贵宾厅', 20, centerCos, 1500, '#f25459', 'center');
        drawQR('http://marry.librejo.cn/yyq-cst?n=' + name, 250, 870, 100, call);
    }, 0, 0, size);
}

drawCard('林韩超')

function download(name) {
    var canvas = document.getElementById('cvs');
    var image = canvas.toDataURL("image/png")

    var save_link = document.createElement('a');
    save_link.href = image;
    save_link.download = name + '.png';
                        
    var clickevent = document.createEvent('MouseEvents');
    clickevent.initEvent('click', true, false);
    save_link.dispatchEvent(clickevent);
}

function downloadCard(name) {
    drawCard(name, () => {
        download(name);
    })
}

var index = 0;

function does() {
    drawCard(mans[index], () => {
        download(mans[index]);
        index++;
        if (index == mans.length) return;
        setTimeout(does, 2000);
    })
}

var mans = [
    "刘智冰",
    "刘舒玲",
    "黄秀锐",
    "李金梅",
    "车良耀",
    "阮光鸿",
    "黄春玲",
    "彭金莲",
    "谢秀婷",
    "丁彩燕",
    "黎佩烨",
    "张家栋",
    "陈宇婷",
    "陈关羽",
    "袁建东",
    "卢宵凯",
    "李俊辉",
    "廖　宁",
    "陈梓强",
    "凌　斌",
    "黄智德",
    "黄诗颖",
    "陈志鹏",
    "江泽荣",
    "江秋婵",
    "江　冰",
    "江　慧",
    "江桂珠",
    "林桂芳",
    "杨海滨",
    "林宇锋",
    "杨家立",
    "童亦锋",
    "陈柏盛",
    "刘欢松",
    "林湘立",
    "叶志成",
    "张思情",
    "余雅静",
    "许纯维",
    "郑嘉威",
    "罗汝鹏",
    "杨梓杰",
    "詹文山",
    "黄小香",
    "戴宙峰",
    "林秋灵",
    "戴国俊",
    "刘镇洲",
    "李　想",
    "罗伟鹏",
    "潘海峰",
    "钟彩培",
    "李佳铭",
]