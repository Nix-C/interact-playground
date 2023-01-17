console.log("enter ps-browser.js")
class PsBrowser extends HTMLElement{
    constructor(){
        super();
        // Create a shadow root


        const shadow = this.attachShadow({mode: 'open'});

        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'wrapper');   

        // Create frame
        const frame = document.createElement('div');
        frame.setAttribute('class', 'frame');  

        // Create Controls 
        const controls = document.createElement('div');
        controls.setAttribute('class', 'controls');

        // Create shadowBody
        const shadowBody = document.createElement('div');
        shadowBody.setAttribute('class', 'shadowBody');           
        
        // Create shadow 'header'
        const header = document.createElement('div');
        header.setAttribute('class', 'header');

        // Create shadow 'main'
        const main = document.createElement('div');
        main.setAttribute('class', 'main');
    
        // Create shadow 'footer'
        const footer = document.createElement('div');
        footer.setAttribute('class', 'footer'); 

        // create css 
        const style = document.createElement('style');

        style.textContent = `
            .wrapper{
                --frame-color: #6F77E8;
                --control-height: 25px;

            }

            .wrapper {
                height: 800px;
                width: 600px;

                border: var(--frame-color) solid 5px;
                border-radius: 10px;

                background-color: var(--frame-color);

                overflow: hidden;
            }
            .controls {
                width: 100%;
                height: 25px;
                margin: -1px;
                padding: 1px;

            }

            .frame {
                background: #555a5a;
                height: calc( 100% - var(--control-height));
                width: 100%;
                overflow: auto;

                scrollbar-color: #6F77E8 white;


            }

            .frame::-webkit-scrollbar {
                width: 12px;               /* width of the entire scrollbar */
            }
              
            .frame::-webkit-scrollbar-track {
                background: var(--frame-color);        /* color of the tracking area */
                
                background: repeating-linear-gradient(
                    45deg,
                    red,
                    red 2px,
                    white 2px,
                    white 10px
                );
            }
            .frame::-webkit-scrollbar-button {
                color: white;
                background-color: var(--frame-color);
            }
            .frame::-webkit-scrollbar-thumb {
                background-color: var(--frame-color);    /* color of the scroll thumb */
            }

            .shadowBody {
                height: 200%;
                width: 100%;
                background: linear-gradient(45deg, red, orange, yellow, green, blue, indigo, violet, red);
            }
        `;
        
        shadow.appendChild(style);
        shadow.appendChild(wrapper);
        wrapper.append(controls, frame);
        frame.appendChild(shadowBody)
        shadowBody.append(header, main, footer);

        const position = { x: 0, y: 0 }

        const id = this.getAttribute("id");
  
        interact("#"+id).resizable({
            onstart: function (event) {},
            onmove : function (event) {},
            onend  : function (event) {},
            
            top    : true,
            left   : true,
            bottom : true,
            right  : true 

        }).draggable({
            inertia: true,
            allowFrom: '.controls',    
            modifiers: [
                interact.modifiers.restrictRect({
                restriction: 'parent'
                })
            ],            
            listeners: {
                start (event) {
                console.log(event.type, event.target)
                },
                move (event) {
                position.x += event.dx
                position.y += event.dy
        
                event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`
                },
            }
        })

    }



}

customElements.define("ps-browser", PsBrowser);

