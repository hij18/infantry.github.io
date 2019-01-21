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
        //Номер первой строки
        currentNumOfRow: 0,
        //Номер последней строки 
        countNumOfRow: 0,
        //Колличесвто страниц таблицы с учетом строк на странице
        namberOfPage: null,
        currentPage: 1,
        
        
    },
        
 //Котролирует все. 
    init () {
        this.takeDataFromXML (function () {
                stuffTable.settings.table = this;
                stuffTable.renderTableHead ();
                stuffTable.renderTable ();
                stuffTable.changeNumberOfPage ();
        });

        
        document
        .getElementById('tableSize')
        .addEventListener('click', event => this.tableSizeEventHandlers(event));
        
        document
        .getElementById('prev')
        .addEventListener('click', event => this.prevNavigationEventHandlers(event));
        
        document
        .getElementById('next')
        .addEventListener('click', event => this.nextNavigationEventHandlers(event));
    },
    
 //Строит таблицу по параметрам из settings.    
    renderTable () {
        let allRow = this.settings.table[0].getElementsByTagName('Row');
        //Создаем строки
        for (let row = this.settings.currentNumOfRow+1; row <= this.settings.rowOnPage+this.settings.currentNumOfRow; row++) {
            let cellBody = allRow[row].getElementsByTagName('Cell');
            const tr = document.createElement('tr');
            this.settings.tableElement.appendChild(tr);
            this.settings.countNumOfRow = row;
            //Создаем яцейки
            for (let cell = 0; cell < cellBody.length; cell++) {
                let cellContent = cellBody[cell].textContent;
                let cellData = cellBody[cell].getElementsByTagName('Data');    
                const td = document.createElement('td');
                td.textContent = cellContent;
                /*
                if (cellData[0].getAttribute('ss:Type') === 'DateTime') {
                    td.setAttribute('type' ,'datetime');
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
        this.changeNumberOfPage ();
        this.clearTable ();
        this.renderTable ();
    },
    
    //Переключает страницы таблицы назад
    nextNavigationEventHandlers () {
        if (this.settings.currentNumOfRow === 500) {
            document.getElementById('next').disabled = true;
        }
        if (this.settings.currentPage === this.settings.namberOfPage) {
            return;
        }
        this.settings.currentNumOfRow = this.settings.countNumOfRow;
        this.settings.currentPage++;
        this.changeCurrentPage ();
        this.changeNumberOfPage ();
        this.clearTable ();
        this.renderTable ();

    }, 
    
    //Переключает страницы таблицы вперед
    prevNavigationEventHandlers () {
        if (this.settings.currentNumOfRow === 10) {
            document.getElementById('prev').disabled = true;
        }
        if (this.settings.currentPage === 1) {
            return;
        }
        this.settings.currentNumOfRow -= this.settings.rowOnPage;
        this.settings.currentPage--;
        this.changeCurrentPage ();
        this.changeNumberOfPage ();
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
    
    //Пересчитывает колличество страниц таблицы с персоналом
    changeNumberOfPage () {
        this.settings.namberOfPage = 500/this.settings.rowOnPage;
        document
        .getElementById('navAll')
        .textContent = this.settings.namberOfPage;
    },
    
    changeCurrentPage () {
        document
        .getElementById('navCurent')
        .textContent = this.settings.currentPage;
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
    
    //Получаем данные из файла
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
