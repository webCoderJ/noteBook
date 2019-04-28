class Heap {
    constructor() {
        this.data = [];
    }

    // 构建堆
    build() {
        for (let i = 0; i < this.data.length; i++) {
            this.insert(data[i]);
        }
    }

    insert(node) {
        this.data.push(node);
        // 更新节点
        let nIndex = this.data.length - 1;
        let nFatherIndex = Math.floor((nIndex - 1) / 2);
        while (nFatherIndex > 0) {
            if (this.data[nIndex] < this.data[nFatherIndex]) {
                let tmp = this.data[nIndex];
                this.data[nIndex] = this.data[nFatherIndex];
                this.data[nFatherIndex] = tmp;
            }
            nIndex = nFatherIndex;
            nFatherIndex = Math.floor((nIndex - 1) / 2);
        }
    }
}
