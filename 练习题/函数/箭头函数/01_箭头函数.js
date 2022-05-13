function foo() {
    return () => {
        return () => {
            return () => {
                console.log('id:', this);
            };
        };
    };
}

var f = foo.call({id: 1});
//return出去的第一个是个箭头函数，箭头的this无法修改的
var t1 = f.call({id: 2})()(); // id: 1
var t2 = f().call({id: 3})(); // id: 1
var t3 = f()().call({id: 4});

const cat = {
    lives: 9,
    // jumps: function () {
    //     console.log(this.lives, this)
    // },
    jumps: () => {
        console.log(this.lives, this)
    }
}
cat.jumps()