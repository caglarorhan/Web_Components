class ConfirmAnchor extends HTMLAnchorElement{
    constructor(){
        super();

    }
    connectedCallback(){
        this.addEventListener("click", (event)=>{
            if(!confirm("Are you sure you want to leave?")){
                event.preventDefault();
            }
        })
    }
}

customElements.define('new-anchor', ConfirmAnchor, {extends: 'a'});
