// JS function used in FAQ page, it will expand all collapsed accordions when user perform browser search
export function handleAccordionSearch(){

    function expandAllAccordions(){
        const buttons = document.querySelectorAll('.sd-accordion-button-js');
        buttons.forEach((button)=>{
            button.setAttribute('aria-expanded','true');
        })
        var accordionContents = document.querySelectorAll('.sd-accordion-js');
        accordionContents.forEach((content)=>{
            content.removeAttribute('hidden');
        });

    }
    window.addEventListener("keydown", function(e) {
        // when user press cmd+f or ctrl + f for search, make all accordions expanded
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            expandAllAccordions();
        }
    })
}
 
