var app = new Vue({
    el: '#app',
    data: {
        size: 600,
        background: '/res/demo.jpg',
        texts: [
            {
                content: '李国强',
                font: 'Ma Shan Zheng',
                size: 50, 
                coord: { x: 270, y: 600 },
                color: '#000',
                align: 'right',
                variable: null
            },
            {
                content: '韩梅梅',
                font: 'Ma Shan Zheng',
                size: 50, 
                coord: { x: 332, y: 600 },
                color: '#000',
                align: 'left',
                variable: null
            },
            {
                content: '诚邀 {0} ',
                font: 'Noto Sans SC',
                size: 30, 
                coord: { x: 300, y: 681 },
                color: '#867160',
                align: 'center',
                variable: [
                    ['魏华']
                ]
            },
            {
                content: '扫码查看位置与登记来访',
                font: 'Noto Sans SC',
                size: 15, 
                coord: { x: 300, y: 1000 },
                color: '#867160',
                align: 'center',
            },
            {
                content: '2022年5月3号 12:00',
                font: 'Noto Sans SC',
                size: 20, 
                coord: { x: 300, y: 770 },
                color: '#f25459',
                align: 'center',
            },
            {
                content: '黄金大酒店 9 楼贵宾厅',
                font: 'Noto Sans SC',
                size: 20, 
                coord: { x: 300, y: 800 },
                color: '#f25459',
                align: 'center',
            }
        ],
        qrCodes: [
            {
                content: 'http://marry.example.com/?n={0}&t={1}',
                color: '#000',
                size: 100,
                coord: { x: 250, y: 870 },
                variable: [
                    ['魏华', '19:00']
                ],
                color: {
                    foreground:'#000', 
                    background:'#fff'
                }
            }
        ],
        currentText: 2,
        currentQr: 0,
    },
    watch: {
        text: {
            handler () {
                this.refresh()
            },
            deep: true
        },
        qrCode: {
            handler () {
                this.refresh()
            },
            deep: true
        },
        size (n, o) {
            let ratio = n / o;
            this.texts.forEach(t => {
                t.coord.x = parseInt(t.coord.x * ratio);
                t.coord.y = parseInt(t.coord.y * ratio);
            });

            this.qrCodes.forEach(q => {
                q.coord.x = parseInt(q.coord.x * ratio);
                q.coord.y = parseInt(q.coord.y * ratio);
            })
        }
    },
    computed: {
        cvs(){
            return this.$refs['cvs'];
        },
        ctx(){
            return this.$refs['cvs'].getContext('2d');
        },
        text() {
            return this.texts[this.currentText];
        },
        qrCode() {
            return this.qrCodes[this.currentQr];
        },
        qrResult() {
            return this.qrCode.content.format.apply(this.qrCode.content, (this.qrCode.variable || [['']])[0].map(encodeURIComponent))
        },
        textVar: {
            get() {
                return (this.text.variable || []).map(v => v.join(',')).join('\n') + '\n';
            },
            set(val) {
                this.text.variable = val.trim().split('\n').map(v => v.split(','));
            }
        },
        qrVar: {
            get() {
                return (this.qrCode.variable || []).map(v => v.join(',')).join('\n') + '\n';
            },
            set(val) {
                this.qrCode.variable = val.trim().split('\n').map(v => v.split(','));
            }
        }
    },
    methods: {
        addText() {
            this.texts.push({
                content: 'text node ' + this.texts.length,
                font: 'Noto Sans SC',
                size: 20, 
                coord: { x: 0, y: 0 },
                color: '#000',
                align: 'left',
                variable: null
            });
            this.currentText = this.texts.length - 1
        },
        addQr() {
            this.qrCodes.push({
                content: 'Qr ' + this.qrCodes.length,
                color: '#000',
                size: 100,
                coord: { x: 0, y: 0 },
                variable: null,
                color: {
                    foreground:'#000', 
                    background:'#fff'
                }
            })
            this.currentQr = this.qrCodes.length - 1
        },
        downloadAll() {
            var variableCount = Math.max.apply(Math, this.texts.map(t => (t.variable || []).length))
            var download = (index) => {
                this.draw(index, (i) => {
                    if (i < 0) return alert('All Downloaded');
                    this.downloadFile(`${index}.png`, this.cvs.toDataURL('image/png'));
                    setTimeout(() => {
                        download(index - 1)
                    }, 1000);
                })
            }
            download(variableCount - 1)
        },
        exportConfig() {
            var config = {
                size: this.size,
                background: this.background,
                texts: this.texts.map(t => Object.assign({}, t)),
                qrCodes: this.qrCodes.map(q => Object.assign({}, q))
            }
            var cvs = document.createElement('canvas');
            var cxt = cvs.getContext('2d');
            var image = new Image;
            image.src = this.background;
            image.onload = () => {
                cvs.width = image.width;
                cvs.height = image.height;
                cxt.drawImage(image, 0, 0, image.width, image.height);
                config.background = cvs.toDataURL();
                var blob = new Blob([JSON.stringify(config, null, 4)]);
                this.downloadFile('config.json', URL.createObjectURL(blob))
            }
        },
        changeImg() {
            if(this.$refs['img'].files.length == 0) return
            this.background = window.URL.createObjectURL(this.$refs['img'].files[0]);
            this.refresh();
            this.$refs['img'].value = '';
        },
        changeConfig() {
            if(this.$refs['cfg'].files.length == 0) return
            var reader = new FileReader();
            reader.onload = (event) => {
                let config = JSON.parse(event.target.result);
                this.background = config.background;
                this.size = config.size;
                this.texts = config.texts;
                this.qrCodes = config.qrCodes;
                this.currentText = 0;
                this.currentQr = 0;
                this.refresh();
            };
            reader.readAsText(this.$refs['cfg'].files[0]);
            this.$refs['cfg'].value = '';
        },
        removeText(i) {
            if(i == this.currentText) this.currentText = 0;
            this.texts.splice(i, 1);
        },
        removeQr(i) {
            if(i == this.currentQr) this.currentQr = 0;
            this.qrCodes.splice(i, 1);
        },
        refresh() {
            this.draw(0);
        },
        draw(index, call) {
            this.drawImg(this.background,  () => {
                for (let i = 0; i < this.texts.length; i++) {
                    let text = Object.assign({}, this.texts[i]);
                    if (text.variable) {
                        text.content = text.content.format.apply(text.content, (text.variable[index] || []));
                    }
                    this.drawText(text);
                }
                if (this.qrCodes.length > 0) {
                    var drawQr = (i) => {
                        if (this.qrCodes.length <= i) return call && call(index);
                        let qrCode = Object.assign({}, this.qrCodes[i]);
                        if (qrCode.variable) {
                            qrCode.content = qrCode.content.format.apply(qrCode.content, (qrCode.variable[index] || []).map(encodeURIComponent));
                        }    
                        this.drawQr(qrCode, () => {
                            drawQr(i + 1);
                        });
                    }
                    drawQr(0);
                }
            }, 0, 0, this.size);
        },
        drawImg(img, call, x=0, y=0, size=400, resize=true){
            var image = new Image;
            image.src = img;
            image.onload =  () => {
                var radio = size / image.width;
                var width = size; //image.width;
                var height = image.height * radio;
                if (resize) {
                    this.cvs.width = width;
                    this.cvs.height = height;
                }
            
                this.ctx.drawImage(image, x, y, width, height);
                if (call) call();
            }
        },
        drawText({font='Noto Sans SC', content, size=20, coord={x:0,y:0}, color='#000', align='left'}) {
            this.ctx.font = `${size}px "${font}"`;
            this.ctx.fillStyle = color;
            this.ctx.textAlign = align;
            this.ctx.fillText(content, coord.x, coord.y);
        },
        drawQr({content, coord={x:0,y:0}, size=100, color={foreground:'#000', background:'#fff'}}, call) {
            var qr = document.createElement('div');
            var q = new QRCode(qr, {
                text: content,
                width: size,
                height: size,
                colorDark : color.foreground,
                colorLight : color.background,        
            });
            var image = new Image;
            image.src = qr.getElementsByTagName('canvas')[0].toDataURL("image/png");
            q.clear();
            image.onload = () => {
                this.ctx.drawImage(image, coord.x, coord.y, size, size);
                if(call) call()
            }
        },
        downloadFile(fileName, BlobUrl){
            var aLink = document.createElement('a');
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", false, false);
            aLink.download = fileName;
            aLink.href = BlobUrl;
            aLink.click();
        }
    },
    mounted: function () {
        this.refresh()
    }
});