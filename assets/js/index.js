$(function () {
    $("[data-toggle='tooltip']").tooltip();
    $(".carousel").carousel({
        interval: 3000
    });
    $('#pqrs').on('show.bs.modal', function (e) {
        console.log('Comenzo a abrirse', e);
        $('#pqrsBtn').addClass('disabled');
        $('#pqrsBtn').addClass('btn-info');
    });
    $('#pqrs').on('shown.bs.modal', function (e) {
        console.log('Terminó de abrirse', e);
    });
    $('#pqrs').on('hide.bs.modal', function (e) {
        console.log('Comenzo a cerrarse', e);
    });
    $('#pqrs').on('hidden.bs.modal', function (e) {
        console.log('Terminó de cerrarse ', e);
        $('#pqrsBtn').removeClass('disabled')
        $('#pqrsBtn').removeClass('btn-info')
    });
});