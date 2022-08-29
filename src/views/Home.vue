<template>
    <div class="home" ref="waterFall" id="waterFall">
        <div class="box" v-for="v in address" :key="v">
            <img :src="require('@/assets/img/' + v)" alt="" />
        </div>
    </div>
</template>

<script>
import waterFall from '../assets/js/waterFall';

export default {
    name: 'Home',
    components: {
        // HelloWorld
    },
    data() {
        return {
            address: []
        };
    },
    created() {
        this.init();
    },
    mounted() {
        this.getWaterFall();
    },
    methods: {
        init() {
            const images = require.context('@/assets/img', true); // 查询图片文件目录

            images.keys().forEach((fileName) => {
                let address = fileName.split('./')[1];
                this.address.push(address);
            });
        },
        getWaterFall() {
            let arg = {
                margin: 20, // 父元素的外边距
                vgap: 20, // 水平间隙
                hgap: 20 // 竖立间隙
            };

            waterFall.waterFall(this, this.$refs.waterFall, arg);

            window.onresize = () => {
                waterFall.waterFall(this, this.$refs.waterFall, arg);
            };
        }
    }
};
</script>

<style lang="less" scoped>
// JS实现方式
.home {
    // margin: 20px;
    width: 100%;
    position: relative;
    box-sizing: content-box;
    .box {
        position: absolute;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
