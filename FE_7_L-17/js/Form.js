function Form(options, tableListener) {
    let formElement = document.createElement('form'),
        editMode = null;

    formElement.setAttribute('name', options.name);
    formElement.setAttribute('id', options.id);
    options.style && formElement.classList.add(...options.style.split(' '));

    options.fields && options.fields.forEach(function (field) {
        let newField = new FormInput(field);
        newField && formElement.appendChild(newField);
    });

    formElement.addEventListener('submit', onSubmit.bind(formElement));
    formElement.resetBtn && formElement.resetBtn.addEventListener('click', resetForm.bind(formElement));


    var form = {
        getForm: getForm,
        edit: edit,
        form: formElement
    };

    initTableListener(form);


    return form;

    function getForm() {
        return document.getElementById(options.id);
    }

    function edit(obj, index) {
        editMode = index;
        let form = getForm();
        Object.keys(obj).forEach(key => {
            form[key] && (form[key].value = obj[key]);
        });
    }

    function initTableListener(form) {
        tableListener.setEditableForm(form);
    }

    function onSubmit(evt) {
        evt.preventDefault();
        let data = FormDataToJSON(this);

        if (tableListener) {
            (editMode !== null) ? tableListener.editStudent(data, editMode) : tableListener.addStudent(data);
        }

        editMode = null;
        resetForm.call(this);
    }

    function FormDataToJSON(FormElement) {
        var formData = new FormData(FormElement), ConvertedJSON = {};
        for (const [key, value]  of formData.entries()) {
            ConvertedJSON[key] = value;
        }

        return ConvertedJSON;
    }

    function resetForm(e) {
        this.reset();
    }
}

function FormInput(options) {
    let input = document.createElement("input");

    options.name && input.setAttribute('name', options.name);

    options.type && input.setAttribute('type', options.type);
    options.value && input.setAttribute('value', options.value);
    options.required && input.setAttribute('required', true);
    options.placeholder && input.setAttribute('placeholder', options.placeholder);
    options.css && input.classList.add(...options.css.split(' '));

    return (options.label && addLabelTo(input, options.label)) || input;

    ////////////////////////////////////////

    function addLabelTo(input, labelName) {
        if (!input) return false;
        let newLabel = document.createElement('label'),
            labelText = document.createTextNode(labelName),
            formControl = document.createElement('span');

        newLabel.appendChild(labelText);
        newLabel.setAttribute('for', input.name);

        formControl.appendChild(newLabel);
        formControl.appendChild(input);

        return formControl;
    }
}

