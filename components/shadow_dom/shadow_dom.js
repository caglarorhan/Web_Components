class ShadowSample extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'}); // we add a shadow DOM to our component

    }

    connectedCallback(){
        // Now, create another element and add it to the shadow DOM
        let newElm2 = document.createElement("div");
        this.shadowRoot.appendChild(newElm2);
        newElm2.innerHTML = "Hello world from shadow DOM";
        newElm2.style.backgroundColor = "pink";
        newElm2.style.cursor = "pointer";
        newElm2.addEventListener("click",()=>{this._sampleFunction('Hello world again')});
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

customElements.define('shadow-sample', ShadowSample);
