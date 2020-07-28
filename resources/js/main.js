const   nameField = document.querySelector('.text.field'),
        dateButtons = document.querySelectorAll('.date.field .buttons button'),
        selectOptions = document.querySelectorAll('.select.field .options li'),
        colorSelectOptions = document.querySelectorAll('.color-select.field .options li');

function blurOtherFields(thisField) {
    if (thisField !== 'dateButtons') {
        dateButtons.forEach((dateButton) => {
            dateButton.classList.remove('selected');
            dateButton.parentNode.parentNode.querySelector('.pickers').classList.remove('visible');
        });
    }

    if (thisField !== 'selectField') {
        document.querySelector('.select.field .options').classList.remove('visible');
    }
}

nameField.querySelector('input').onfocus = function() {
    blurOtherFields('nameField');
};

dateButtons.forEach((dateButton) => {
    dateButton.onclick = function() {
        if (!this.classList.contains('selected')) {
            dateButtons.forEach((selectOption) => {
                selectOption.classList.remove('selected');
            });

            this.classList.add('selected');
            this.parentNode.parentNode.querySelector('.pickers').classList.add('visible');

            this.parentNode.parentNode.querySelectorAll('.pickers .picker').forEach((picker) => {
                picker.classList.remove('visible');
            });

            this.parentNode.parentNode.querySelector(`.pickers .picker#${this.id}`).classList.add('visible');
        } else {
            this.classList.remove('selected');
            this.parentNode.parentNode.querySelector('.pickers').classList.remove('visible');
        }
        
        blurOtherFields('dateButtons');
    }
});

document.querySelector('.select.field button').onclick = function() {
    this.parentNode.querySelector('.options').classList.add('visible');

    blurOtherFields('selectField');
}

selectOptions.forEach((selectOption) => {
    const selectButton = selectOption.parentNode.parentNode.querySelector('button');
    
    selectOption.onclick = function() {
        selectOptions.forEach((selectOption) => {
            selectOption.classList.remove('selected');
        });

        if (!this.classList.contains('default')) {
            selectButton.classList.remove('placeholder');
        } else {
            selectButton.classList.add('placeholder');
        }

        selectButton.innerText = this.innerText;
        this.classList.add('selected');
        this.parentNode.classList.remove('visible');
    }
});

colorSelectOptions.forEach((colorSelectOption) => {
    colorSelectOption.onclick = function() {
        colorSelectOptions.forEach((selectOption) => {
            selectOption.classList.remove('selected');
        });

        this.classList.add('selected');

        blurOtherFields('colorSelectOptions');
    }
});