"use strict";

//Объект, содержащий таблицу персонала
const stuffTable = {
    settings: {
        tableElement: document.getElementById('tableBody'),
        tableHead: document.getElementById('tableHead'),
        tableHeadName: null,
        rowInTable: 10,
        cellInTable: 10,
        rowOnPage: 10,
        //Место для хранения данных из XML
        table: null,
        
    },
        
 //Строит таблицу по заданым параметрам
    init () {
        this.takeDataFromXML (function () {
                stuffTable.settings.table = this;
                stuffTable.renderTableHead ();
                stuffTable.renderTable ();
        });

        
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
        let row = this.settings.table[0].getElementsByTagName('Row');
        console.log(row);
        let cellHead = row[0].getElementsByTagName('Cell');
        const tr = document.createElement('tr');
        this.settings.tableElement.appendChild(tr);
        for (let cell = 0; cell < cellHead.length; cell++) {
            let cellContent = cellHead[cell].textContent;
            const td = document.createElement('td');
            td.textContent = cellContent;
            tr.appendChild(td);
        }
    },
    
    //
    takeDataFromXML (callback) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', './collaborators.xml', true);
        
        xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
                  
            if(xhr.readyState !== 4) {
                return; //Выход
                }
                if (xhr.status !== 200) {
                        console.log('Ошибка в процессе получения данных', xhr.status, xhr.statusText);
                        return;
                    } 
                callback.call (xhr.responseXML.getElementsByTagName('Table'));
                };
        xhr.send();
    },
};



// Инициализируем таблицу при загрузке страницы.
window.onload = () => stuffTable.init();