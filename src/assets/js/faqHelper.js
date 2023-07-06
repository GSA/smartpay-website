export function handleAccordionSearch(){

    function expandAllAccordions(){
        const buttons = document.querySelectorAll('.usa-accordion__button');
        buttons.forEach((button)=>{
            button.setAttribute('aria-expanded','true');
        })
        var accordionContents = document.querySelectorAll('.sd-accordion-js');
        accordionContents.forEach((content)=>{
            //alert(content.innerHTML)
            content.removeAttribute('hidden');
        });

    }
    function collapseAllAccordions(){
        const buttons = document.querySelectorAll('.usa-accordion__button');
        buttons.forEach((button)=>{
            button.setAttribute('aria-expanded','false');
        })
        var accordionContents = document.querySelectorAll('.usa-accordion__content');
        accordionContents.forEach((content)=>{
        content.setAttribute('hidden','hidden');
        });

    }
    window.addEventListener("keydown", function(e) {
        // when user press cmd+f or ctrl + f for search, make all accordion expanded for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            expandAllAccordions();
        }
    })

    window.addEventListener('beforeunload',function(e){
        // beforeunload no longer working?
        collapseAllAccordions();
    });
}
    // // below JS is to increase original heading level from the FAQ collection because addtional H1 tag Frequently Asked Qunestions is added. 
    export function increaseHeadingLevels(){
        const headings = document.querySelectorAll('h1, h2, h3, h4,h5');
        headings.forEach(heading =>{
            if(heading.innerHTML !="Frequently Asked Questions")
            {
                const currentTagName = heading.tagName;
                const currentLevel = parseInt(currentTagName.substring(1))
                const newLevel = currentLevel + 1; 
                const newTageName = `H${newLevel}`
                const newHeading = document.createElement(newTageName);
                newHeading.innerHTML = heading.innerHTML;
                Array.from(heading.attributes).forEach(attr=>{
                    newHeading.setAttribute(attr.name,attr.value);
                })
                heading.parentNode.replaceChild(newHeading,heading);
            }
        })
    }

// function to  generate dynamic id
let counter = 0;
export function generateUniqueId(type){
    return `${type}-${counter ++}`
}

