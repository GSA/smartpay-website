//export function handleAccordionSearch(){

    export function expandAllAccordions(){
        const buttons = document.querySelectorAll('.usa-accordion__button');
        buttons.forEach((button)=>{
            button.setAttribute('aria-expanded','true');
        })
        var accordionContents = document.querySelectorAll('.usa-accordion__content');
        accordionContents.forEach((content)=>{
        content.removeAttribute('hidden');
        });

    }
    export function collapseAllAccordions(){
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
      
            const buttons = document.querySelectorAll('.usa-accordion__button');
            buttons.forEach((button)=>{
                button.setAttribute('aria-expanded','true');
            })
            var accordionContents = document.querySelectorAll('.usa-accordion__content');
            accordionContents.forEach((content)=>{
            content.removeAttribute('hidden');
            });
        }

    })

    window.addEventListener('beforeunload',function(event){
        this.alert("hello");
       
      // this.collapseAllAccordions();
      const buttons = document.querySelectorAll('.usa-accordion__button');
        buttons.forEach((button)=>{
            button.setAttribute('aria-expanded','false');
        })
        var accordionContents = document.querySelectorAll('.usa-accordion__content');
        accordionContents.forEach((content)=>{
        content.setAttribute('hidden','hidden');
        });
    });
//}