$(document).ready(function() {
    var table = $('#example').DataTable({
        dom: "frtip",
        
        ajax: "https://alfill.github.io/parishlib/booklist-data.json",
        //ajax: "http://127.0.0.1:8887/booklist-data.json",

        scrollY:        520,
        deferRender:    true,
        
        //scrollCollapse: true,
        scroller:  true,
        //paging: false,
        //responsive: false,
        ordering: false,
        //fixedHeader: true,
        //info: true,
        //select:"single",
        columns: [{
                "className": 'details-control',
                "orderable": false,
                "data":      null,
                "defaultContent": '',
                width: "15px",
                height: "15px"
            },
            { "data": "title" },      
            { "data": "author" },    
            { "data": "publisher" }, 
            { "data": "year" }
        ],
        //"order": [[1, 'asc']],
        rowGroup: { dataSrc: "part" },

        language: {
            "processing": "Подождите...",
            "search": "Поиск:",
            "lengthMenu": "Показано _MENU_ записей",
            "info": "Отображено [_START_ - _END_] из _TOTAL_ записей",
            "infoEmpty": "Записи с 0 до 0 из 0 записей",
            "infoFiltered": "(отфильтровано из _MAX_ записей)",
            "infoPostFix": "",
            "loadingRecords": "Загрузка записей...",
            "zeroRecords": "Записи отсутствуют.",
            "emptyTable": "В таблице отсутствуют данные",
            "paginate": {
                "first": "Первая",
                "previous": "«--",
                "next": "--»",
                "last": "Последняя"
            },
            "aria": {
                "sortAscending": ": активировать для сортировки столбца по возрастанию",
                "sortDescending": ": активировать для сортировки столбца по убыванию"
            }
        }
    });

    // Add event listener for opening and closing details
    $('#example tbody').on('click', 'td.details-control', function() {
        var tr = $(this).closest('tr');
        var row = table.row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        } else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

    table.on("user-select", function(e, dt, type, cell, originalEvent) {
        if ($(cell.node()).hasClass("details-control")) {
            e.preventDefault();
        }
    });
});

function format(d) {
    // `d` is the original data object for the row
    let trans = " ", ser = " ", notes = " ", pag = " ", isb = " ", source = " ";
    if (d.translate != "") { trans = '<tr>' + '<td>Тип издания: </td>' + '<td>' + d.translate + '</td>' + '</tr>'; }
    if (d.series != "") { ser = '<tr>' + '<td>Серия: </td>' + '<td>' + d.series + '</td>' + '</tr>'; }
    if (d.annotation != "") { notes = '<tr>' + '<td>Аннотация: </td>' + '<td>' + d.annotation + '</td>' + '</tr>'; }
    if (d.pages != "") { pag = '<tr>' + '<td>Страниц: </td>' + '<td>' + d.pages + '</td>' + '</tr>'; }
    if (d.isbn != "") { isb = '<tr>' + '<td>ISBN: </td>' + '<td>' + d.isbn + '</td>' + '</tr>'; }
    if (d.sourceurl != "") { source = '<tr>' + '<td>Источник: </td>' + '<td>' + d.sourceurl + '</td>' + '</tr>'; }

    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +        
        trans + ser + notes + pag + isb + source + 
        '</table>';
    }