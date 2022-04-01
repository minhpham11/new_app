$( document ).ready(function() {
    $('.add-form-comment-btn').click(function () {
        var html = $('.comment-form').html();
        $('#micropost-' + $(this).data('post-id')).append(html);
    });
    
    $('.comment-submit').click(function () {
        var form = $(this).closest('.comment-form');
        var formData = form.serialize();
        var url = form.attr('action');
        $.ajax({
            type: 'POST',
            url: url,
            data: formData,
            success: function (data) {
                $('.comment-form').remove();
                $('.comment-list').append(data);
            }
        });
    });
});
