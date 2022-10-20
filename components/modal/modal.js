class Modal extends HTMLElement{
constructor(){
    super();
    this.attachShadow({mode:'open'});
    this.shadowRoot.innerHTML = `
        <style>
        #backdrop{
        position: fixed;
        top:0;
        left:0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0,0,0,0.1);
        z-index: 1000;
        }
        #modal{
        position: fixed;
        top:15vh;
        left:25%;
        width: 50%;
        height: 50vh;
        z-index: 1001;
        border-radius:1%;
        background-color: rgba(255,255,255,1);
        box-shadow: 0 0 3px 0 rgba(255,255,255,1);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        
        }
        
        #actions{
        border-top: 1px solid #ccc;
        padding: 1rem;
        display: flex;
        justify-content: flex-end;
        }
        
        #actions button{
        margin: 0 0.25rem;
        }

        </style>
        <div id="backdrop">
        </div>
        <div id="modal">
            <header>
            
            </header>
            <section id="main">
            Please choose...
            </section>
            <section id="actions">
            <button type="button">Cancel</button>
            <button type="button">Submit</button>
            
            </section>
            
        </div>
    `;
}
}


customElements.define('wc-modal', Modal)
