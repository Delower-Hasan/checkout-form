$(document).ready(function() {


    //DOM elements
    const DOMstrings = {
        stepsBtnClass: 'multisteps-form__progress-btn',
        stepsBtns: document.querySelectorAll(`.multisteps-form__progress-btn`),
        stepsBar: document.querySelector('.multisteps-form__progress'),
        stepsForm: document.querySelector('.multisteps-form__form'),
        stepsFormTextareas: document.querySelectorAll('.multisteps-form__textarea'),
        stepFormPanelClass: 'multisteps-form__panel',
        stepFormPanels: document.querySelectorAll('.multisteps-form__panel'),
        stepPrevBtnClass: 'js-btn-prev',
        stepNextBtnClass: 'js-btn-next'
    };

    //remove class from a set of items
    const removeClasses = (elemSet, className) => {

        elemSet.forEach(elem => {

            elem.classList.remove(className);

        });

    };

    //return exect parent node of the element
    const findParent = (elem, parentClass) => {

        let currentNode = elem;

        while (!(currentNode.classList.contains(parentClass))) {
            currentNode = currentNode.parentNode;
        }

        return currentNode;

    };

    //get active button step number
    const getActiveStep = elem => {
        return Array.from(DOMstrings.stepsBtns).indexOf(elem);
    };

    //set all steps before clicked (and clicked too) to active
    const setActiveStep = (activeStepNum) => {

        //remove active state from all the state
        removeClasses(DOMstrings.stepsBtns, 'js-active');

        //set picked items to active
        DOMstrings.stepsBtns.forEach((elem, index) => {

            if (index <= (activeStepNum)) {
                elem.classList.add('js-active');
            }

        });
    };

    //get active panel
    const getActivePanel = () => {

        let activePanel;

        DOMstrings.stepFormPanels.forEach(elem => {

            if (elem.classList.contains('js-active')) {

                activePanel = elem;

            }

        });

        return activePanel;

    };

    //open active panel (and close unactive panels)
    const setActivePanel = activePanelNum => {

        //remove active class from all the panels
        removeClasses(DOMstrings.stepFormPanels, 'js-active');

        //show active panel
        DOMstrings.stepFormPanels.forEach((elem, index) => {
            if (index === (activePanelNum)) {

                elem.classList.add('js-active');

                setFormHeight(elem);

            }
        })

    };

    //set form height equal to current panel height
    const formHeight = (activePanel) => {

        const activePanelHeight = activePanel.offsetHeight;


        DOMstrings.stepsForm.style.height = `${activePanelHeight+200}px`;

    };

    const setFormHeight = () => {
        const activePanel = getActivePanel();

        formHeight(activePanel);
    }

    //STEPS BAR CLICK FUNCTION
    DOMstrings.stepsBar.addEventListener('click', e => {

        //check if click target is a step button
        const eventTarget = e.target;

        if (!eventTarget.classList.contains(`${DOMstrings.stepsBtnClass}`)) {
            return;
        }

        //get active button step number
        const activeStep = getActiveStep(eventTarget);

        //set all steps before clicked (and clicked too) to active
        setActiveStep(activeStep);

        //open active panel
        setActivePanel(activeStep);
    });

    //PREV/NEXT BTNS CLICK
    DOMstrings.stepsForm.addEventListener('click', e => {

        const eventTarget = e.target;

        //check if we clicked on `PREV` or NEXT` buttons
        if (!((eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) || (eventTarget.classList.contains(`${DOMstrings.stepNextBtnClass}`)))) {
            return;
        }

        //find active panel
        const activePanel = findParent(eventTarget, `${DOMstrings.stepFormPanelClass}`);

        let activePanelNum = Array.from(DOMstrings.stepFormPanels).indexOf(activePanel);

        //set active step and active panel onclick
        if (eventTarget.classList.contains(`${DOMstrings.stepPrevBtnClass}`)) {
            activePanelNum--;

        } else {

            activePanelNum++;

        }

        setActiveStep(activePanelNum);
        setActivePanel(activePanelNum);

    });

    //SETTING PROPER FORM HEIGHT ONLOAD
    window.addEventListener('load', setFormHeight, false);

    //SETTING PROPER FORM HEIGHT ONRESIZE
    window.addEventListener('resize', setFormHeight, false);

    //changing animation via animation select !!!YOU DON'T NEED THIS CODE (if you want to change animation type, just change form panels data-attr)

    const setAnimationType = (newType) => {
        DOMstrings.stepFormPanels.forEach(elem => {
            elem.dataset.animation = newType;
        })
    };

    //selector onchange - changing animation
    const animationSelect = document.querySelector('.pick-animation__select');

    //   animationSelect.addEventListener('change', () => {
    //       // const newAnimationType = animationSelect.value;
    //       const newAnimationType = 'slideHorz';
    //       setAnimationType(newAnimationType);
    //   });




    //   Hide show
    $('#createAccount').on('change', function(e) {
        if ($('#createAccount').is(":checked")) {
            $('.createaccount').show(200);
        } else {
            $('.createaccount').hide(200);
        }
    })
    $('.standerd_payment_wrap').hide()

    // service type
    $('.common__btn span').on('click', function(e) {
        $('.common__btn span').removeClass('btn__certified');
        $('.common__btn span').html('Select');
        
        $(this).addClass('btn__certified');
        $(this).html('Selected');
        let serviceType = $(this).data("value")
        $('.pay__dets p').html(serviceType)
        if (serviceType == 'Certified Translation') {
            $('#pageCount').show()
            $('#wordCount').hide()
            $('.page_words_translate').html('pages')
            $('.ceritified_page').show()
            $('.standerd_word').hide()
            $('.standerd_payment_wrap').hide()
            $('.certified_payment_wrap').show()
           let certified_price =  $('.certified_payment').html()
            $('.grand_total').html(Number(certified_price).toFixed(2))
         
        } else {
            $('#pageCount').hide()
            $('#wordCount').show()
            $('.page_words_translate').html('words')
            $('.ceritified_page').hide()
            $('.standerd_word').show()
            $('.standerd_payment_wrap').show()
            $('.certified_payment_wrap').hide()
         

                    let standardPrice = $('.standerd_payment').html()
                    $('.grand_total').html(Number(standardPrice).toFixed(2))
        }
    })


    // Translated Language Selection

    $('.language-select').hide();
    $('#translateFrom').on('change',function(e){
        $('.from_translate').html($(this).val())
        $('.language-select').show(100);
    })
    $('#translateTo').on('change',function(e){
        $('.to_translate').html($(this).val())
        $('.language-select').show(100);
       
    })
  
    // Page/Word price count
    let per_page_word = 250 //words
    let page_price = 24.95 //price- usd
$('.days_estimate').hide()
    $('#pageCount input').on('change',function(){
        $('.pageCount_certified').html($(this).val())
        let words = $(this).val()*per_page_word
        let price = $(this).val()*page_price
        $('.wordCount_certified').html(words)
        $('.certified_payment').html(Number(price).toFixed(2))
        $('.grand_total').html(Number(price).toFixed(2))

      

        if($(this).val()>=1){
            $('.days_estimate').show(100)
        }else{
            $('.days_estimate').hide(100)
        }

        if($(this).val() <=4){
            $('.est_days').html('24 Hours')
        }else if($(this).val() <=8){
            $('.est_days').html('48 Hours')
        }else if($(this).val() <=12){
            $('.est_days').html('4-5 Days')
        }else if($(this).val() <=18){
            $('.est_days').html('5-6 Days')
        
        }else if($(this).val() <=25){
            $('.est_days').html('6-7Days')
        }else{
            $('.est_days').html('10 Days +')
        }

    })



    // word count section
      // Page/Word price count
let word_price =.1;
  $('.days_estimate').hide()
      $('#wordCount input').on('change',function(){
          $('.pageCount_certified').html($(this).val())
          let words = $(this).val()
          let price = $(this).val()*word_price
     

        $('.standerd_payment').html(Number(price).toFixed(2))
        $('.grand_total').html(Number(price).toFixed(2))
        $('.standerd_word').html(words)
         
  
        
  
          if($(this).val()>=1){
              $('.days_estimate').show(100)
          }else{
              $('.days_estimate').hide(100)
          }
  
          if($(this).val() <=4){
              $('.est_days').html('24 Hours')
          }else if($(this).val() <=8){
              $('.est_days').html('48 Hours')
          }else if($(this).val() <=12){
              $('.est_days').html('4-5 Days')
          }else if($(this).val() <=18){
              $('.est_days').html('5-6 Days')
          
          }else if($(this).val() <=25){
              $('.est_days').html('6-7Days')
          }else{
              $('.est_days').html('10 Days +')
          }
  
      })

 
});