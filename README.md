# Web Component Notes

These are personal notes about the web components. Notes are unordered and unrelated with each other. These notes do not cover any web component subject completely.
Always refer to: https://developer.mozilla.org/en-US/docs/Web/Web_Components

To create a web component you need to create a js file and link this file to a html document.

In the created js file you need to create a class which extends HTMLElement class or built-in html elements like HTMLAnchorElement class or HTMLButtonElement class or HTMLInputElement class, etc. These are HTML APIs which you can extend. https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement


## Web Component Life Cycle

* Element creation: constructor()
* Element attached to DOM: connectedCallBack
* Element detached from DOM: disconnectedCallBack
* Observed attribute updated: attributeChangedCallBack

### Element Creation 

Creation of the custom element begins with class of extension and constructor method. At the creation moment component don't attached to the real DOM yet. It lives on the memory for now. Everything in here is just before rendering.

### Element Attached to DOM

Calling connectedCallBack method on the class of the element will attach your component to the DOM. Do things that must be after rendering.

### Element Detached from DOM

Calling disconnectedCallBack method on the class of the element will detach the component from DOM, basically delete the custom element from DOM.

### Observed Attribute Updated

Any attribute of the element changed or DOM updated, this method will be called.

## Shadow DOM

Shadow DOM is an API to create isolated DOM elements which is rendered separately from the real DOM tree. This isolation keeps functionality, styling and other attributes private and keep collisions from real DOM (light DOM).

When we add shadow DOM into our component other non-shadow parts in the component are not rendered.

#### Adding Shadow DOM into the component

Adding a shadow DOM creates a private DOM with its style and functionality. When creating a component inside the constructor:
 `this.attachShadow({mode:'open''})`
will add a shadow DOM so called `shadowRoot`. You can assign it to a variable `const shadow = this.attachShadow({mode: 'open'});` . After creating the shadow DOM, you can append elements -with `appendChild()`- to it. 

For details: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM

In theory `mode: 'close'` makes a shadowRoot inaccessible from outside the component -with javascript- but in practice it is possible, therefore, keeping it open is useful. (https://blog.revillweb.com/open-vs-closed-shadow-dom-9f3d7427d1af)

> Note: All shadow DOM and template elements are called document-fragment

## Templates and Slots

Template (`<template>`) is a document-fragment which is not rendered directly in the DOM but used with javascript.
When you set a slot (`<slot>`) on the template elements you can use it with components. You can use named slots in templates within other elements. If there is only <slot></slot> element the ingredient of component will be rendered directly in to this slot while template is rendering.

There are two ways to add template into stage. First you can write it into the html directly and use it from there inside the javascript of component. If there is a default value between <slot> tags then when component cannot present any ingredient to template the default value would be used. 

- Write a template into the HTML, give it an id attribute (`<template id="anyId></template>`)
- Write a slot element into this template `<template id="anyId"><slot></slot></template>`
- Inside the component's constructor reach this template (`theTemplate`)
> const theTemplate = document.querySelector('#theTemplate');
- Clone (deep clone with true boolean) this template with component ingredient in the slot
> this.shadowRoot.appendChild(theTemplate.content.cloneNode(true));

Second way is to create a slot inside the constructor method of the component and use 
 `shadowRoot.innerHTML="<slot></slot>"` is all in js file.

## Extending Built-in HTMLElements

Like creating a component just add some extra steps.

- You should extend existing HTML_ELEMENTAPINAME_Element  
> Example: `class ConfirmAnchor extends HTMLAnchorElement`
- Add third argument to define part 
> Example: `customElements.define('new-anchor', ConfirmAnchor, {extends: 'a'});`
- Add "is" property to the new component's tag with the defined name of component.
> Example: `<a is="new-anchor" href="https://www.google.com">Test</a>`
- Now you can override HTML elements properties and add new behaviours.
> Example: `    connectedCallback(){
this.addEventListener("click", (event)=>{
if(!confirm("Are you sure you want to leave?")){
event.preventDefault();
}
})
}`
> 
