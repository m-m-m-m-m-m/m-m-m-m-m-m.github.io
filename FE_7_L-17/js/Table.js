function Table(container, data, options) {
    let table = document.createElement("table"),
        students = [...data],
        dataRepresentation = options.tableHeader,
        form;

    table.setAttribute('id', options.id);
    table.classList.add(...options.style.split(' '));
    table.appendChild(initAndReturnHeader(dataRepresentation));
    table.appendChild(initAndReturnBody(students, dataRepresentation));

    (container || document.getElementById('container')).appendChild(table);
    setHeaderSortIcons();

    return {
        getTable: getTable,
        addStudent: addStudent,
        editStudent: editStudent,
        setEditableForm: setEditableForm
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////

    function setEditableForm(external_form) {
        form = external_form;
    }

    function addStudent(student) {
        students.push(student);
        updateTable(students);
    }

    function editStudent(student, index) {
        student.skills = student.skills.split(',');
        students[index] = student;
        updateTable(students);
    }

    function getTable() {
        return document.getElementById(options.id);
    }

    function updateTable(data) {
        let table = getTable();
        removeEventListeners(table.childNodes[1], 'click', rowClickHandler);
        table.removeChild(table.childNodes[1]);
        data && table.appendChild(initAndReturnBody(data, dataRepresentation));
        setHeaderSortIcons();
        return true;
    }

    function removeStudentByIndex(studentIndex) {
        let deleted = students.splice(studentIndex, 1);
        deleted && updateTable(students) && console.log(`removed student: ${deleted[0].name}`);
    }

    function editStudentByIndex(student, index) {
        let result = student && form && form.edit(student, index);
        result && (student[index] = result) && updateTable(students);
    }

    function headerFilterHandler(e) {
        let node = e.target,
            searchListener = true;

        while (searchListener) {
            searchListener = false;
            switch (node.tagName) {
                case 'TH':
                    tableSortBy(dataRepresentation[node.dataset.sortby], node.dataset.sortby);
                    break;
                case 'THEAD':
                    searchListener = false;
                    break;
                default:
                    node = node.parentElement;
                    searchListener = true;
                    break;
            }
        }
    }

    function tableSortBy(sortingField, index) {
        if (!sortingField) return;

        let sortValue = sortingField.sortBy,
            table = getTable(),
            currentSortBy,
            sortFunc;

        currentSortBy = table.dataset.sortBy;
        currentSortBy == index ? setCurrentSort(1, `-${index}`) : setCurrentSort(0, index);
        students.sort((a, b)=>sortFunc(sortValue(a), sortValue(b)));

        updateTable(students);

        function setCurrentSort(sortFnIndex, sortByVal) {
            sortFunc = options.sort[sortFnIndex];
            table.dataset.sortBy = sortByVal;
        }
    }


    function setHeaderSortIcons() {
        let headers = document.querySelectorAll('th i'),
            table = getTable(), currentSort;

        currentSort = table.dataset.sortBy;
        headers && headers.forEach((icon, index)=> {
            switch (true) {
                case `-${index}` === currentSort:
                    icon.className = 'glyphicon glyphicon-sort-by-alphabet-alt';
                    break;

                case index === Number(currentSort):
                    icon.className = 'glyphicon glyphicon-sort-by-alphabet';
                    break;

                default :
                    icon.className = 'glyphicon glyphicon-sort';
                    break;
            }
        });
    }

    function rowClickHandler(e) {
        let node = e.target,
            searchListener = true;

        while (searchListener) {
            searchListener = false;
            switch (node.tagName) {
                case 'TR':
                    alertStudent(node.dataset.index);
                    break;
                case 'I':
                    let dataset = node.dataset,
                        id = getRowId(node);

                    if (dataset.button && id) {
                        if (dataset.button === 'edit') {
                            editStudentByIndex(students[id], id);
                        } else {
                            removeStudentByIndex(id);
                        }
                    }
                    break;
                case 'TBODY':
                    searchListener = false;
                    break;
                default:
                    node = node.parentElement;
                    searchListener = true;
                    break;
            }
        }
    }

    function alertStudent(id) {
        alert(students[id].name);
    }

    function addEventListeners(element, event, eventHandler) {
        element.addEventListener(event, eventHandler);
    }

    function removeEventListeners(element, event, eventHandler) {
        element.removeEventListener(event, eventHandler);
    }

    function initAndReturnBody(data, dataRepresetation) {
        let tBody = document.createElement("tbody");
        addEventListeners(tBody, 'click', rowClickHandler);

        data.forEach((dataRow, row) => {
            let tableRow = document.createElement("tr");
            tableRow.dataset.index = row;
            dataRepresetation.forEach((column, index) => {
                let tableData = document.createElement("td");
                tableData.innerHTML = dataRepresetation[index].data(dataRow);
                tableRow.appendChild(tableData);
            });
            tBody.appendChild(tableRow);
        });

        return tBody;
    }


    function getRowId(node) {
        while (node.tagName !== 'TR' && node.tagName !== "TBODY") {
            node = node.parentElement;
        }
        return node.tagName === 'TR' && node.dataset.index ? node.dataset.index : false;
    }


    function initAndReturnHeader(headerData) {
        let tHead = document.createElement("thead"),
            headerRow = document.createElement('tr');

        headerData.forEach((headerTitle, headerIndex)  => {
            let th = document.createElement('th');
            th.innerHTML = headerTitle.title;
            headerTitle.sortBy && (th.dataset.sortby = headerIndex);
            headerRow.appendChild(th);
        });

        tHead.appendChild(headerRow);
        addEventListeners(tHead, 'click', headerFilterHandler);
        return tHead;
    }

}

