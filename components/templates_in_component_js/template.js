class SlotSample extends HTMLElement{
    constructor(){
        super();
        const theShadow = this.attachShadow({mode:'open'}); // we add a shadow DOM to our component
        theShadow.innerHTML = `
                                <style>
                                p {
                                color: #000000; font-size: 12px; font-weight: bold;
                                background-color: pink;
                                border: 1px solid red;
                                }
                                </style>
                                <p><slot>Default value is here</slot></p>
                                Other text of template.

`;
    }

    connectedCallback(){
        // Now, create another element and add it to the shadow DOM
        let newElm3 = document.createElement("div");
        this.shadowRoot.appendChild(newElm3);
        newElm3.innerHTML = "Hello world from shadow DOM";
        newElm3.classList.add("Hello");
        newElm3.addEventListener("click",()=>{this._sampleFunction('Hello world again')});
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

customElements.define('template-sample', SlotSample);
