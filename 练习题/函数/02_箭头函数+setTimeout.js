function foo() {
    setTimeout(() => {
        console.log('id:', this.id);
    }, 100);
}

var id = 21;

foo.call({
    id: 42
});
// 箭头函数导致this总是指向函数定义生效时所在的对象。本例是{id:42}
// 如果是普通函数， 这里则是指向的全局的id为21