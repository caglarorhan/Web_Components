class SimpleSample extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        // because of the shadow, this element cannot render properly
        let newElm = document.createElement("div");
        newElm.innerHTML = "Hello World";
        this.appendChild(newElm); // added to the real DOM
        newElm.style.backgroundColor = "lightgreen";
        newElm.style.cursor = "pointer";
        newElm.addEventListener("click",()=>{this._sampleFunction('Hello world again')});
    }

    disconnectCallback(){

    }

    attributeChangedCallback(){

    }

    _sampleFunction(sampleMessage){ // _ sign means only usage inside the class
        console.log(sampleMessage, ' Time: '+ new Date().getTime()+'ms');
        //console.log(this); //component itself
        console.log(this.getAttribute('text'))
        return false;
    }
}

customElements.define('simple-sample', SimpleSample);
