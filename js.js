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
        let allRow = this.settings.table[0].getElementsByTagName('Row');
        //Создаем строки
        for (let row = 1; row < this.settings.rowOnPage; row++) {
            let cellBody = allRow[row].getElementsByTagName('Cell');
            const tr = document.createElement('tr');
            this.settings.tableElement.appendChild(tr);
            //Создаем яцейки
            for (let cell = 0; cell < cellBody.length; cell++) {
                let cellContent = cellBody[cell].textContent;
                let cellData = cellBody[cell].getElementsByTagName('Data');    
                const td = document.createElement('td');
                td.textContent = cellContent;
                console.log(cellData[0].getAttribute());
                console.log(cellData[0].getAttribute('value'));
                console.log(cellData[0].getAttribute('ss:Type'));
                /*
                if (cellData[0].attributes[0].value === 'DataTime') {
                    td.type = 'datetime';
                }
                */
                tr.appendChild(td);

            }
        }
    },
    //Получет эвент по клику и меняет кол-во строк, выводимых на экран
    tableSizeEventHandlers() {
                
        if (event.target.tagName !== 'SPAN') {
            return;
        } 
        this.changeNumberOfRow(event.target.dataset.size);
        this.clearTable ();
        this.renderTable ();
    },
    //Меняет переменную rowOnPage в зависимости от клика пользователя
    changeNumberOfRow(size) {
        return this.settings.rowOnPage = +size; 
        
    },
    //Обнуляет таблицу
    clearTable () {
        this.settings.tableElement.innerHTML = '';
    
    },
    
    //Создаем заголовки таблицы
    renderTableHead () {
        let row = this.settings.table[0].getElementsByTagName('Row');
        let cellHead = row[0].getElementsByTagName('Cell');
        const tr = document.createElement('tr');
        this.settings.tableHead.appendChild(tr);
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