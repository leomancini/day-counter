function blurOtherFields(thisField) {
    if (thisField !== 'dateButtons') {
        document.querySelectorAll('.date.field .buttons button').forEach((dateButton) => {
            dateButton.classList.remove('selected');
            dateButton.parentNode.parentNode.querySelector('.pickers').classList.remove('visible');
        });
    }

    if (thisField !== 'selectField') {
        document.querySelector('.select.field .options').classList.remove('visible');
    }
}

function showForm(data) {
    const defaults = {
        repeat: [
            'Never Repeats',
            'Every Week',
            'Every Month',
            'Every Year',
            'Every Lunar Year'
        ],
        colors: [
            'Red',
            'Orange',
            'Green',
            'Blue',
            'Purple',
            'Pink'
        ]
    };

    const card = document.createElement('div');
    card.className = 'add card';

    // Name
    const nameField = document.createElement('div');
    nameField.className = 'text field';

    const nameFieldInput = document.createElement('input');
    nameFieldInput.className = 'name';
    nameFieldInput.setAttribute('placeholder', 'Name');

    if (data && data.name) {
        nameFieldInput.value = data.name;
    }
    
    nameField.appendChild(nameFieldInput);
    
    nameFieldInput.onclick = function() {
        this.classList.add('selected');
        blurOtherFields('nameField');
    };

    nameFieldInput.onblur = function() {
        this.classList.remove('selected');
    };

    card.appendChild(nameField);

    // Date
    const dateField = document.createElement('div');
    dateField.className = 'date field';

    const dateFieldButtons = document.createElement('div');
    dateFieldButtons.className = 'buttons';

    dateField.appendChild(dateFieldButtons);

    const dateFieldPickers = document.createElement('div');
    dateFieldPickers.className = 'pickers';

    dateField.appendChild(dateFieldPickers);

    [
        'Year',
        'Month',
        'Day'
    ].forEach((buttonLabel) => {
        const dateFieldButton = document.createElement('button');
        dateFieldButton.setAttribute('id', buttonLabel.toLowerCase());

        if (data && data.date && data.date[buttonLabel.toLowerCase()]) {
            dateFieldButton.innerText = data.date[buttonLabel.toLowerCase()];
        } else {
            dateFieldButton.innerText = buttonLabel;
            dateFieldButton.className = 'placeholder';
        }

        dateFieldButtons.appendChild(dateFieldButton);

        dateFieldButton.onclick = function() {
            if (!this.classList.contains('selected')) {
                dateFieldButtons.querySelectorAll('button').forEach((selectOption) => {
                    selectOption.classList.remove('selected');
                });

                this.classList.add('selected');
                dateFieldPickers.classList.add('visible');

                dateFieldPickers.querySelectorAll('.picker').forEach((picker) => {
                    picker.classList.remove('visible');
                });

                dateFieldPickers.querySelector(`.picker#${this.id}`).classList.add('visible');
            } else {
                this.classList.remove('selected');
                dateFieldPickers.classList.remove('visible');
            }
            
            blurOtherFields('dateButtons');
        }

        const dateFieldPicker = document.createElement('div');
        dateFieldPicker.className = 'picker';
        dateFieldPicker.setAttribute('id', buttonLabel.toLowerCase());
        dateFieldPicker.innerHTML = `INSERT_${buttonLabel}_PICKER`;

        dateFieldPickers.appendChild(dateFieldPicker);
    });
    
    card.appendChild(dateField);

    // Repeat
    const selectField = document.createElement('div');
    selectField.className = 'select field';

    const selectFieldButton = document.createElement('button');
    selectFieldButton.className = 'repeat';


    if (data && data.repeat) {
        selectFieldButton.innerText = data.repeat;
    } else {
        selectFieldButton.classList.add('placeholder');
        selectFieldButton.innerText = defaults.repeat[0];
    }

    selectField.appendChild(selectFieldButton);

    selectFieldButton.onclick = function() {
        selectField.querySelector('.options').classList.add('visible');

        blurOtherFields('selectField');
    }

    const selectFieldOptions = document.createElement('ul');
    selectFieldOptions.className = 'options';

    selectField.appendChild(selectFieldOptions);

    defaults.repeat.forEach((label, index) => {
        const option = document.createElement('li');
        option.setAttribute('id', label.toLowerCase());
        option.innerHTML = label;

        if (data && data.repeat) {
            if (data.repeat.toLowerCase() === label.toLowerCase()) {
                option.classList.add('selected');
            }
        } else {
            if (index === 0) {
                option.classList.add('selected');
            }
        }

        selectFieldOptions.appendChild(option);

        option.onclick = function() {
            selectFieldOptions.querySelectorAll('li').forEach((selectOption) => {
                selectOption.classList.remove('selected');
            });
    
            if (option.innerText.toLowerCase() === defaults.repeat[0].toLowerCase()) {
                selectFieldButton.classList.add('placeholder');
            } else {
                selectFieldButton.classList.remove('placeholder');
            }
    
            selectFieldButton.innerText = label;
            option.classList.add('selected');
            selectFieldOptions.classList.remove('visible');
        }
    });

    card.appendChild(selectField);

    // Color
    const colorSelectField = document.createElement('div');
    colorSelectField.className = 'color-select field';

    const colorSelectFieldOptions = document.createElement('ul');
    colorSelectFieldOptions.className = 'options';

    colorSelectField.appendChild(colorSelectFieldOptions);

    defaults.colors.forEach((label, index) => {
        const option = document.createElement('li');
        option.className = label.toLowerCase();
        option.innerHTML = label;

        if (data && data.color) {
            if (data.color.toLowerCase() === label.toLowerCase()) {
                option.classList.add('selected');
            }
        } else {
            if (index === 0) {
                option.classList.add('selected');
            }
        }

        colorSelectFieldOptions.appendChild(option);

        option.onclick = function() {
            colorSelectFieldOptions.querySelectorAll('li').forEach((selectOption) => {
                selectOption.classList.remove('selected');
            });

            this.classList.add('selected');

            blurOtherFields('colorSelectOptions');
        }
    });

    card.appendChild(colorSelectField);

    const doneButton = document.createElement('button');
    doneButton.className = 'done';
    doneButton.innerText = 'Done';

    card.appendChild(doneButton);

    return card;
}

document.querySelector('body').appendChild(
    showForm()
);

document.querySelector('body').appendChild(
    showForm({
        name: 'Asd',
        repeat: 'Every Week',
        color: 'Blue',
        date: {
            year: 2020,
            month: 12,
            day: 4
        }
    })
);