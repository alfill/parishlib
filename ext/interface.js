$(document).ready(function() {
    var table = $('#example').DataTable({
        dom: "frtip",
        ajax: "https://alfill.github.io/parishlib/booklist-data.json",
        //ajax: "http://127.0.0.1:8887/booklist-data.json",

        scrollY:        540,
        deferRender:    true,
        
        //scrollCollapse: true,
        scroller:  true,
        //paging: false,
        //responsive: false,
        ordering: false,
        //lengthMenu: [[10, 25, 50, 100, -1], [10, 25, 50, 100, "∞"]],
        //pageLength: 25,
        //fixedHeader: true,
        //info: true,
        //select:"single",
        columns: [{
                "className": 'details-control',
                "orderable": false,
                "data":      null,
                "defaultContent": '',
                /*,
                               "render": function () {
                                   return '<i class="fa fa-plus-square" aria-hidden="true"></i>';
                               },  */
                width: "15px",
                height: "15px"
            },
           // { "data": "name" },      // title
           // { "data": "position" },     // author
           // { "data": "office" },  // publisher
           // { "data": "salary" }       //  year
            { "data": "title" },      // title
            { "data": "author" },     // author
            { "data": "publisher" },  // publisher
            { "data": "year" }       //  year
            //{ "data": "part" }        //
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
    var trans = '<tr>' + '<td>Издание/Перевод: </td>' + 
                '<td>' + d.translate + '</td>' +
                '</tr>';
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        
        trans + 

        '<tr>' +
          '<td>Серия: </td>' + '<td>' + d.classification + '</td>' +
        '</tr>' +
        '<tr>' +
          '<td>Аннотация: </td>' + '<td>' + d.annotation + '</td>' +
        '</tr>' +
        '</table>';
    }


    /*

        '<tr>' +
          '<td>Издание/Перевод: </td>' + '<td>' + d.translate + '</td>' +
        '</tr>' +


    */
