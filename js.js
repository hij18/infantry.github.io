"use strict";


document.getElementById('test').addEventListener('click', function () {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', './collaborators.xml', true);
        
    xhr.onreadystatechange = function () {
        console.log(xhr.readyState);
                  
            if(xhr.readyState !== 4) {
                return; //Выход
                }

                if (xhr.status !== 200) {
                        console.log('Ошибка в процессе получения данных', xhr.status, xhr.statusText);
                    } else {
                        console.log('ok', xhr.responseText);
                        }
                };

                xhr.send();
            });

/*
window.onload = function () {
    let xhr = new XMLHttpRequest ();
    xhr.open ('GET', './collaborators.xml', true);
    xhr.send();
    
    xhr.onreadystatechange = function () {
       if (xhr.readyState !== 4) {
           return;
       };
        console.log(xhr.readyState);
        
    };
    
    if (xhr.status !== 200) {
        console.log(xhr.status);
        console.log(xhr);

    } else {
        
        let row = xhr.querySelector(row);
        
        console.log('Все ок');
    }
    
    
}
*/


//Объект, содержащий таблицу персонала
const stuffTable = {
    settings: {
        tableElement: document.getElementById('stuff'),
        rowInTable: 10,
        cellInTable: 10,
        rowOnPage: 10,
    },
 //Строит таблицу по заданым параметрам
    init () {
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
};



// Инициализируем таблицу при загрузке страницы.
window.onload = () => stuffTable.init();