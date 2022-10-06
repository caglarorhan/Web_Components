class TemplateSample extends HTMLElement{
    constructor(){
        super();
        this.attachShadow({mode:'open'}); // we add a shadow DOM to our component
        const theTemplate = document.querySelector('#my-paragraph');
        this.shadowRoot.appendChild(theTemplate.content.cloneNode(true));

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

customElements.define('template-sample', TemplateSample);
