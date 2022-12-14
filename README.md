# Web Component Notes

These are my personal notes about the web components. Notes are unordered and unrelated with each other. These notes do not cover any web component subject completely.
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

### Styling

#### Component Styling
We can style component from main dom (like a standard css inside the head).
> Example: `<style> elementTag{color:black}</style>` ;

The only part of the component that you cannot style from main DOM is template part of a component.

#### ShadowRoot Styling

Styling the shadow element is easy. Just add some style to the shadow element inside the innerHTML part of shadowDOM with `<style></style>` tags.

> Example: `this.shadowRoot.innerHTML = <style> p{color:red}</style>` ;


#### Slot Styling
If you want to style slot elements inside the shadow element, you can use the following syntax:
> Example: `this.shadowRoot.innerHTML = <style> ::slotted(PUT SELECTOR HERE){color:red}</style>`;

To style all slotted elements inside the shadow element:
> Example: `this.shadowRoot.innerHTML = <style> ::slotted(*){color:red}</style>` ;

Also, you cannot select nested elements inside the slotted, style only used on main slotted element.


#### Styling Component From Inside (:host)
If we want to isolate everything and style the component from inside the component, so we can use:
> Example: `:host{color:black}` ;

As `::slotted` usage you can use the same way as `:host(QUERY_STRING)`; 
The query string might be any css query string.


#### Styling Component Relatively
If you want to style your component depending on the place it is located, you can use the parent element like this:
> Example: `:host-context(QUERY_STRING){color:black}`

This way you can use the same component with different styles applied by their respective parent element.

> **Note:** CSS variables that described in the main DOM (style part) can be used in the component itself.
> 
> **Example:** inside style part of head: ` html{--main-color:black}` can be used in the component's style part `:host {color:var(--main-color)}`;

## Observing Attributes: attributeChangedCallBack()

Following up the attributes of a component can be done with attributeChangeCallBack method. But first we need to get the `observedAttributes`
We should do any stuff that needs to be done all here. Because this is the only place we are listening all updates, etc.

> **Example**:
> 
> attributeChangedCallBack(attributeName, attributeOldValue, attributeNewValue){
>  
> // do something
> 
> }

### observedAttributes() Static Method
We need to get all attribute names from observedAttributes()

>  static get observedAttributes(){return ['attributeName']} 

## Clean Up Works: disconnectedCallBack()

All event listeners must be removed after removing a component. This method triggered when a component is removed from DOM.
* To clean event listeners they should be assigned to a reference as a part of component itself. If you have to create an event listener inside `connectedCallback()` their reference must be defined in `constructor()` at the beginning of the component.

### Using Slots

You can use more than one slot in a component. Give different names to different slots inside the component. Now add any element the `slot="slotName"` attribute inside the HTMLElement tag. Ingredient of the element will be transferred to the slot.

> **Example:** `<newElement> <h1 slot="slotName_1"></h1><p slot="slotName_2"></p></newElement>`;

At the component js side:
> **Example:** ` <slot name="slotName_1"></slot><br/><slot name="slotName_2"></slot>`;

* If a slot is unnamed, all the other ingredients of component will be transferred into this (to the first unnamed one) unnamed slot.

### Reaching Slots and Listening Them

Slots are standard html tags. Therefore, slots are reachable with querySelector.
> **Example**: `const slots = this.ShadowRoot.querySelectorAll('slot');`;

> **Example**: `const slots = this.ShadowRoot.querySelector('slot[name="slotName_1"]');`;

Adding an eventListener to a slot is as simple as others. The specific event for slots is `slotchange`;

>**Example**: `theSlot.addEventListener('slotchange',()=>{});`;
* Slot has only the `slotchange` event listener!



### Manuel Assignments to Slots
To do that first wee need to create shadowDOM with `slotAssignment:"manuel"` option.

> **Example** `const shadowRoot = this.attachShadow({mode: 'open', slotAssignment: 'manual'});`

After creating the shadowDOM and component created in light DOM, you can assign any element or node into a slot as following:
> Example: `connectedCallback(){
> theSlot.assign(theHTMLNode)
> }

### Get All Assigned Node From a Slot
You can get all assigned node for a specific slot by `let nodes = slots[1].assignedNodes();`
With the same way, to get assigned elements:
`let nodes = slots[1].assignedElements({flatten: true});`;

> **IMPORTANT NOTE**: When you need to get the owner slot of the assigned element from that element with assignedSlot property of element. `theElement.assignedSlot`;

## Reaching the Component from Outside the Component

Doing so is basically like getting the component with `document.querySelectorAll(the-components-tag)`. After assigning it to a variable, you can reach all methods and properties of that component. 
