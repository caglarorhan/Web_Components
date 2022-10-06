class helloWorld extends HTMLElement{
    constructor(){
        super();

console.log('Hello world element exist!')
    }
}

customElements.define('hello-world', helloWorld)
