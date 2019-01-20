"use strict";

//Объект, содержащий таблицу персонала
const stuffTable = {
    settings: {
        tableElement: document.getElementById('tableBody'),
        tableHead: document.getElementById('tableHead'),
        rowInTable: 10,
        cellInTable: 10,
        rowOnPage: 10,
        //Место для хранения данных из XML
        table: null,
    },
        
 //Строит таблицу по заданым параметрам
    init () {
        this.takeDataFromXML ();
        this.renderTableHead ();
        this.renderTable ();
        
        document
        .getElementById('tableSize')
        .addEventListener('click', event => this.tableSizeEventHandlers(event));
    },
    
 //Строит таблицу по параметрам из settings.    
    renderTable () {
        //Создаем строки
        for (let row = 0; row < this.settings.rowOnPage; row++) {
            const tr = document.createElement('tr');
            this.settings.tableElement.appendChild(tr);
            //Создаем яцейки
            for (let cell = 0; cell < this.settings.cellInTable; cell++) {
                const td = document.createElement('td');
                tr.appendChild(td);
            }
        }
    },
    
    tableSizeEventHandlers() {
                
        if (event.target.tagName !== 'SPAN') {
            return;
        } 
        
        
        this.changeNumberOfRow(event.target.dataset.size);
        console.log(this.settings.rowOnPage);
        this.clearTable ();
        this.renderTable ();
    },
    
    changeNumberOfRow(size) {
        return this.settings.rowOnPage = +size; 
        
    },
    
    clearTable () {
        this.settings.tableElement.innerHTML = '';
    
    },
    
    //Создаем заголовки таблицы
    renderTableHead () {
        console.log(this.settings.table);
        let row = this.settings.table.getElementsByTagName('Row');
        console.log(row);
    },
    
    //
    takeDataFromXML () {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './collaborators.xml', true);
        xhr.send();
        xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
                  
            if(xhr.readyState !== 4) {
                return; //Выход
                }

                if (xhr.status !== 200) {
                        console.log('Ошибка в процессе получения данных', xhr.status, xhr.statusText);
                        return;
                    } 
                //Создаем функцию, чтобы данные успели передаться            
                let callTable = xhr.responseXML.getElementsByTagName('Table');
                getDataXML (callTable);
                };
        function getDataXML (data) {
                this.settings.table = data;
    };
    },
};



// Инициализируем таблицу при загрузке страницы.
window.onload = () => stuffTable.init();
