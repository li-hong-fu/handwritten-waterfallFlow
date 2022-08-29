/**
 * 瀑布流实现方式
 */

export default {
    /**
     * 
     * @param {*} vm this
     * @param {*} parent 瀑布流组件
     * @param {*} arg { margin：父元素margin，vgap：块之间水平间隙，hgap：块之间竖立间隙，cols：设置列数 }
     */
    waterFall(vm, parent, arg) {
        // 没有子元素停止继续执行,防止报错
        if (parent.children.length <= 0) {
            console.warn('没有子元素');
            return;
        }

        vm.$nextTick(() => {
            setTimeout(() => {
                const margin = arg.margin || 0;
                const divVgap = arg.vgap || 20;
                const divHgap = arg.hgap || 20;
                const screenWidth = parent.clientWidth; // 父元素宽
                const childrenWidth = parent.children[0].clientWidth; // 子元素宽

                // 1、未设置子元素宽前需给定子元素最大宽，并按容器比例算出列数
                const boxWidth = childrenWidth > 280 ? 280 : childrenWidth;
                const columns = Math.trunc(screenWidth / boxWidth) || 4;

                // 2、计算父容器宽（容器总宽 - (间隙 * 列数) + 外边框距离）最后要在上一层设置padding（需与这里的margin像素一致）
                // 确定子元素宽度
                // 并通过所有子元素创建一个数组
                const pageWidth = screenWidth - divVgap * columns + margin;
                const itemWidth = parseInt(pageWidth / columns);
                const list = Array.from(parent.children);

                let arr = [];

                list.forEach((item, index) => {
                    // 3、所有子元素设置宽,并获取所有元素的高
                    item.style.width = itemWidth + 'px';
                    const height = item.clientHeight || item.offsetHeight;

                    if (index < columns) {
                        // 4、设置第一行布局
                        item.setAttribute('style', `top:0;left:${(itemWidth) * index + divVgap * index}px;width:${itemWidth}px`);
                        arr.push(height); // 行高push到数组
                    } else {
                        // 5、其他行，找到数组中最小高度和它的索引
                        let minHeight = arr[0];
                        let i = 0;
                        for (let j = 0; j < arr.length; j++) {
                            if (minHeight > arr[j]) {
                                minHeight = arr[j];
                                i = j;
                            }
                        }

                        // 6、设置下一行的第一个盒子位置；top值就是最小列高度
                        item.setAttribute('style', `top:${arr[i] + divHgap}px;left:${(itemWidth) * i + divVgap * i}px;width:${itemWidth}px`);

                        // 7、最小列的高度
                        // 最小列的高度 = 当前自己的高度 + 拼接的高度 + 竖直间隔
                        arr[i] = arr[i] + height + divHgap;
                    }
                });

            }, 100);
        });
    }
};